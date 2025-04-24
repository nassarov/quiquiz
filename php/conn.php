<?php
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'quiquiz';

$conn = new mysqli($host , $user,$password,$database);

if($conn->connect_error){
    die("Connection Failed: ". $conn->connect_error);
}else{
    // echo "Connected Successfully!";
}
?>