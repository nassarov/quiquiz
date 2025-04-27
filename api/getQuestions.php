<?php
require 'conn.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $quizId = $_GET['quiz_id'];
    $sql = "SELECT id, value FROM questions WHERE quiz_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $quizId);
    $stmt->execute();
    $result = $stmt->get_result();
    $questions = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $questions[] = $row;
        }
        echo json_encode(['status' => 'success', 'questions' => $questions]);
    } else {
        echo json_encode(['status' => 'success', 'questions' => []]);
    }
    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
$conn->close();
?>