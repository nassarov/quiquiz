<?php
require 'conn.php';

$sql = "SELECT id, title FROM quizzes"; // Select only necessary columns
$result = mysqli_query($conn,$sql);

$quizzes = [];
while($row = mysqli_fetch_assoc($result)){
    $quizzes[] = $row;
}
echo json_encode(["quizzes"=>$quizzes]);
?>