<?php
require 'conn.php';
header('Content-Type: application/json');

$sql = "SELECT quizzes.id, quizzes.title, COUNT(questions.id) AS num_questions
        FROM quizzes 
        LEFT JOIN questions  ON quizzes.id = questions.quiz_id
        GROUP BY quizzes.id";
$result = $conn->query($sql);

$quizzes = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $quizzes[] = $row;
    }
}

echo json_encode(['quizzes' => $quizzes]);
$conn->close();
?>