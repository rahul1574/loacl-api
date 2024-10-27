<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        $sql = "SELECT * FROM users";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3], PDO::PARAM_INT);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($users);
        break;
    case "POST":
        $data = json_decode(file_get_contents('php://input'));
        if (isset($data->name) && isset($data->email) && isset($data->price) && ($data->location)&& ($data->stock)&&($data->quantity) &&($data->address)) {
            $sql = "INSERT INTO users (name, email, price, created_at,location,stock,quantity,address) VALUES (:name, :email, :price, :created_at,:location,:stock,:quantity,:address)";
            $stmt = $conn->prepare($sql);
            $created_at = date('Y-m-d');
            $stmt->bindParam(':name', $data->name);
            $stmt->bindParam(':email', $data->email);
            $stmt->bindParam(':price', $data->price);
            $stmt->bindParam(':location', $data->location);
            $stmt->bindParam(':stock', $data->stock);
            $stmt->bindParam(':quantity', $data->quantity);
            $stmt->bindParam(':address', $data->address);
            $stmt->bindParam(':created_at', $created_at);
                
            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'User record created successfully'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create user record'];
            }
            echo json_encode($response);
        }//emailcheck for userlist
        //register 
        elseif (isset($data->firstname) && isset($data->lastname) && isset($data->email) && isset($data->password)) {
            $checkmail = "SELECT * FROM logs WHERE email = :email";
            $stmt = $conn->prepare($checkmail);
            $stmt->bindParam(':email', $data->email);
            $stmt->execute();

            if ($stmt->rowCount()) {
                $message = "Email already exists!";
                echo json_encode(['status' => 0, 'message' => $message]);
            } else {
                // Hash the password before storing
                $hashedPassword = password_hash($data->password, PASSWORD_DEFAULT);
                // Debug: Check the hashed password
                error_log("Hashed Password: " . $hashedPassword);

                $sql = "INSERT INTO logs (firstname, lastname, email, password) VALUES (:firstname, :lastname, :email, :password)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':firstname', $data->firstname);
                $stmt->bindParam(':lastname', $data->lastname);
                $stmt->bindParam(':email', $data->email);
                $stmt->bindParam(':password', $hashedPassword);

                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Log record created successfully'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to create log record'];
                }
                echo json_encode($response);
            }
        //Register2 a new user with hashed password
        }elseif (isset($data->firstnames) && isset($data->lastnames) && isset($data->emails) && isset($data->passwords)) {
            $checkmail = "SELECT * FROM costs WHERE emails = :emails";
            $stmt = $conn->prepare($checkmail);
            $stmt->bindParam(':emails', $data->emails);
            $stmt->execute();

            if ($stmt->rowCount()) {
                $message = "Email already exists!";
                echo json_encode(['status' => 0, 'message' => $message]);
            } else {
                // Hash the password before storing
                $hashedPassword = password_hash($data->passwords, PASSWORD_DEFAULT);
                // Debug: Check the hashed password
                error_log("Hashed Password: " . $hashedPassword);

                $sql = "INSERT INTO costs (firstnames, lastnames, emails, passwords) VALUES (:firstnames, :lastnames, :emails, :passwords)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':firstnames', $data->firstnames);
                $stmt->bindParam(':lastnames', $data->lastnames);
                $stmt->bindParam(':emails', $data->emails);
                $stmt->bindParam(':passwords', $hashedPassword);

                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Log record created successfully'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to create log record'];
                }
                echo json_encode($response);
            }
        // Login a user by verifying hashed password
        } elseif (isset($data->email) && isset($data->password)) {
            try {
                // Check if email exists
                $sql = "SELECT * FROM logs WHERE email = :email";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':email', $data->email);
                $stmt->execute();
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($user) {
                    // Debug: Check the stored hashed password
                    error_log("Stored Hashed Password: " . $user['password']);
                    error_log("Input Password: " . $data->password);

                    // Verify the hashed password
                    if (password_verify($data->password, $user['password'])) {
                        // Successful login
                        echo json_encode([
                            'status' => 1, 
                            'message' => 'Login successful', 
                            'user' => $user
                        ]);
                    } else {
                        // Password doesn't match
                        echo json_encode(['status' => 0, 'message' => 'Invalid password']);
                    }
                } else {
                    // Email not found
                    echo json_encode(['status' => 0, 'message' => 'Email not found']);
                }
            } catch (PDOException $e) {
                echo json_encode(['status' => 0, 'message' => 'Database error: ' . $e->getMessage()]);
            }
        // Login2 a user by verifying hashed password
        }elseif (isset($data->emails) && isset($data->passwords)) {
            try {
                // Check if the email exists
                $sql = "SELECT * FROM costs WHERE emails = :emails";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':emails', $data->emails);
                $stmt->execute();
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
                if ($user) {
                    // Verify the hashed password
                    if (password_verify($data->passwords, $user['passwords'])) {
                        // Successful login - return user details (except password)
                        unset($user['passwords']);  // Remove the password field from the response
                        echo json_encode([
                            'status' => 1, 
                            'message' => 'Login successful', 
                            'user' => $user
                        ]);
                    } else {
                        // Password doesn't match
                        echo json_encode(['status' => 0, 'message' => 'Invalid password']);
                    }
                } else {
                    // Email not found
                    echo json_encode(['status' => 0, 'message' => 'Email not found']);
                }
            } catch (PDOException $e) {
                echo json_encode(['status' => 0, 'message' => 'Database error: ' . $e->getMessage()]);
            }
        } else {
            echo json_encode(['status' => 0, 'message' => 'Invalid input']);
        }
        break;

    case "PUT":
        $data = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE users SET name = :name,price = :price, updated_at = :updated_at,location=:location,stock=:stock,address=:address WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':id', $data->id, PDO::PARAM_INT);
        $stmt->bindParam(':name', $data->name);
        $stmt->bindParam(':price', $data->price);
        $stmt->bindParam(':updated_at', $updated_at);
        $stmt->bindParam(':location', $data->location);
        $stmt->bindParam(':address', $data->address);
        $stmt->bindParam(':stock', $data->stock);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'User record updated successfully'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update user record'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $sql = "DELETE FROM users WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3], PDO::PARAM_INT);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'User record deleted successfully'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete user record'];
        }
        echo json_encode($response);
        break;

    default:
        echo json_encode(['status' => 0, 'message' => 'Invalid request method']);
        break;

}

?>