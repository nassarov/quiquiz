<?php
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'quiquiz';

try{
$conn = mysqli_connect($host , $user,$password,$database);
}
catch(mysqli_sql_exception){
    echo "Failed To Connect !";
}
if($conn){
    // echo "Connected !!!";
}
?>