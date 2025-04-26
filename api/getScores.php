<?php
require 'conn.php';
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $userId = $_GET['userId'];

    $sql = "SELECT quiz_id, score FROM results WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i",$userId);
    $stmt->execute();
    $result = $stmt->get_result();

    $results = [];
    while ($row = $result->fetch_assoc()) {
        $results[] = $row;
    }

    echo json_encode(["status" => "success", "results" => $results]);
}
?>