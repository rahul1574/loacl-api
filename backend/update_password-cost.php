<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type,Authorization");


include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();


$data = json_decode(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Check if email and password are provided
    if (!empty($data->email) && !empty($data->password)) {
        $email = $data->email; // No need for real_escape_string
        $password = $data->password;

        // Hash the new password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Update the password in the database
        $sql = "UPDATE costs SET passwords = :password WHERE emails = :email";
        $stmt = $conn->prepare($sql);
        
        // Bind parameters
        $stmt->bindParam(':password', $hashedPassword);
        $stmt->bindParam(':email', $email);

        if ($stmt->execute()) {
            $response=["status" => 1, "message" => "Password updated successfully"];
        } else {
            $response=["status" => 0, "message" => "Failed to update password"];
        }
        echo json_encode($response);
        // Close the statement
        $stmt->closeCursor(); // Close the statement cursor
    } else {
        // Missing required fields
        echo json_encode(["status" => "error", "message" => "Email and password are required"]);
    }
}

else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

?>