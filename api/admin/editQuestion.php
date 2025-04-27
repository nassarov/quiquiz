<?php
require '../conn.php';
header('Content-Type: application/json');
$questionId = $_POST['questionId'];
$value = $_POST['value'];

$sql = "UPDATE questions SET value = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $value, $questionId);
$stmt->execute();

$stmt->close();
$conn->close();
?>
