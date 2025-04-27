<?php
require '../conn.php';
header('Content-Type: application/json');
$questionId = $_POST['questionId'];
$sql = "DELETE FROM questions WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $questionId);
$stmt->execute();

$stmt->close();
$conn->close();
?>
