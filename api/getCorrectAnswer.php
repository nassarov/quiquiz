<?php
require 'conn.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $questionId = $_GET['question_id'];
    $sql = "SELECT o.value AS correct_answer FROM correct_answers
            JOIN options o ON correct_answers.option_id = o.id WHERE correct_answers.question_id = ?";


    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $questionId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $correctAnswer = $row['correct_answer'];
        echo json_encode(['status' => 'success', 'correct_answer' => $correctAnswer]);
    }
    $stmt->close();
}
$conn->close();
?>