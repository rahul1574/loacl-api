<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type,Authorization");
header('Content-Type: application/json');

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();


$data = json_decode(file_get_contents('php://input'));
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Check if 'email' and 'otp' are provided
    if (isset($data->email) && isset($data->otp)) {
        $email = $data->email;
        $otp = $data->otp;
        // Prepare SQL query to check if the OTP and email match and retrieve the expiry time
        $query = $conn->prepare("SELECT otp_expiry FROM costs WHERE emails = :email AND otp = :otp");
        $query->bindParam(':email', $email);
        $query->bindParam(':otp', $otp);
        $query->execute();
        
        // Check if any row matches the query
        if ($query->rowCount() > 0) {
            $row = $query->fetch(PDO::FETCH_ASSOC);
            
            // Check if the OTP has expired
            $current_time = new DateTime();
            $otp_expiry_time = new DateTime($row['otp_expiry']);
            
            if ($current_time < $otp_expiry_time) {
                // OTP is valid and within expiry time
                $response=["status" => 1, "message" => "OTP verified!"];
            } else {
                // OTP has expired
                $response=["status" => 0, "message" => "OTP expired!"];
            }
            echo json_encode($response);
        } else {
            // OTP or email does not match
            echo json_encode(["status" => "error", "message" => "Invalid OTP or email!"]);
        }
    } else {
        // Missing email or OTP in the request
        echo json_encode(["status" => "error", "message" => "Email and OTP are required!"]);
    }
} else {
    // Invalid request method
    echo json_encode(["status" => "error", "message" => "Invalid request method!"]);
}
?>