<?php
require '../conn.php';
header('Content-Type: application/json');

$quizId = $_POST['quizId'];
$title = $_POST['title'];
$sql = "UPDATE quizzes SET title = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $title, $quizId);

$stmt->execute();
$stmt->close();
$conn->close();
?>
