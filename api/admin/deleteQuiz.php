<?php
require '../conn.php';
header('Content-Type: application/json');

$quizId = $_POST['quizId'];
$sql = "DELETE FROM quizzes WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $quizId);
$stmt->execute();
$stmt->close();
$conn->close();
?>
