<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type,Authorization");


include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

// $method = $_SERVER['REQUEST_METHOD'];
$email = isset($_GET['email']) ? $_GET['email'] : '';
if ($email) {
    // Use prepared statements to safely query the database
    $sql = "SELECT * FROM users WHERE email = :email";
    $stmt = $conn->prepare($sql);
    
    // Bind the email parameter and execute the query
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->execute();
    
    // Fetch all matching rows
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the result as JSON
    if ($result) {
        echo json_encode($result);
    } else {
        echo json_encode([]); // Return empty array if no match found
    }
} else {
    echo json_encode(["error" => "Email not provided"]);
}
?>