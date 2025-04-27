<?php
require '../conn.php';
header('Content-Type: application/json');
$quizId = $_POST['quizId'];
$value = $_POST['value'];

$sql = "INSERT INTO questions (quiz_id, value) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $quizId, $value);
$stmt->execute();


$stmt->close();
$conn->close();
?>
