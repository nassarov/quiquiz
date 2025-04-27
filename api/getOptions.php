<?php
require 'conn.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $questionId = $_GET['question_id'];
    $sql = "SELECT id, value FROM options WHERE question_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $questionId);
    $stmt->execute();
    $result = $stmt->get_result();
    $options = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $options[] = $row;
        }
        echo json_encode(['status' => 'success','options' => $options]);
    }
    $stmt->close();
}
$conn->close();
?>