<?php
require '../conn.php';
header('Content-Type: application/json');

$title = $_POST['title'];
$sql = "INSERT INTO quizzes (title) VALUES (?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $title);

$stmt->execute();
$stmt->close();
$conn->close();
?>
