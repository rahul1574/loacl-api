<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// require $_SERVER['DOCUMENT_ROOT'] . 'vendor/PHPMailer/src/Exception.php';

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$data = json_decode(file_get_contents('php://input')); // Expecting JSON input

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Check if email is present in the JSON input

    if (isset($data->email)) {
        $email = $data->email;

        // Generate a 6-digit OTP and expiry time
        $otp = rand(100000, 999999);
        $otp_expiry = date("Y-m-d H:i:s", strtotime("+10 minutes"));

        // Check if the email exists in the logs table
        $checkmail = "SELECT * FROM costs WHERE emails = :email";
        $stmt = $conn->prepare($checkmail);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $message="user not found";
        if ($stmt->rowCount() > 0) {
            // Email exists, update OTP and OTP expiry
            $sql = "UPDATE costs SET otp = :otp, otp_expiry = :otp_expiry WHERE emails = :email";
            $updateStmt = $conn->prepare($sql);
            // Bind the values
            $updateStmt->bindParam(':otp', $otp);
            $updateStmt->bindParam(':otp_expiry', $otp_expiry);
            $updateStmt->bindParam(':email', $email);
            // Execute the update
            if ($updateStmt->execute()) {
                $response=['status' => 1, 'message' => 'User record updated successfully'];
            } else {
                $response=['status' => 0, 'message' => 'Failed to update user record'];
            }
            // echo json_encode($response);
            // Initialize PHPMailer
            $mail = new PHPMailer(true);

            try {
            // SMTP Configuration
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com'; // Replace with your SMTP host
            $mail->SMTPAuth = true;
            $mail->Username = 'webdeveloperaim@gmail.com'; // SMTP username
            $mail->Password = 'mqiaxnfcbtmhodlt'; // SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Email Settings
            $mail->setFrom('webdeveloperaim@gmail.com', 'web');
            $mail->addAddress($email);  // Send to the user's email

            $mail->isHTML(true);
            $mail->Subject = 'Your OTP for Password Recovery';
            $mail->Body = "Your OTP code is: <b>$otp</b>. It will expire in 10 minutes.";

            // Send the email
            $mail->send();
            $response=["status" => 1, "message" => "OTP sent successfully to your email!"];

            } catch (Exception $e) {
                $response=["status" => 0, "message" => "Failed to send OTP. Error: {$mail->ErrorInfo}"];
            }
            echo json_encode($response);
        }
        else{
        $response = ['status' => 0, 'message' =>$message];
        echo json_encode($response);
        }
    } 
    else {
    $response = ['status' => 0, 'message' => 'Email not found'];
    }
}
?>