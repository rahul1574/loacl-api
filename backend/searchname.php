<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type,Authorization");


include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();
header('Content-Type: application/json');

// Assume you have already established a database connection in $conn

// Fetch the location from GET parameters
$location = isset($_GET['name']) ? $_GET['name'] : '';

if ($location) {
    try {
        // Use prepared statements to safely query the database
        $sql = "SELECT * FROM users WHERE name = :name";
        $stmt = $conn->prepare($sql);

        // Bind the location parameter and execute the query
        $stmt->bindParam(':name', $location, PDO::PARAM_STR);
        $stmt->execute();

        // Fetch all matching rows
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Return the result as JSON
        if ($result) {
            echo json_encode($result);
        } else {
            // Return an empty array if no match found
            echo json_encode([]);
        }
    } catch (PDOException $e) {
        // Handle any database errors
        echo json_encode(["error" => "Database query error: " . $e->getMessage()]);
    }
} else {
    // Return an error if location is not provided
    echo json_encode(["error" => "Location not provided"]);
}

?>