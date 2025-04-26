<?php
require 'conn.php';
if($_SERVER["REQUEST_METHOD"]== "POST"){
    $json = file_get_contents('php://input');
    $data = json_decode($json,true);
    $email = filter_var($data['email']);
    $password = filter_var($data['password']);
    if(!empty($email) && !empty($password)){
        // if already exist
        $check = "SELECT * FROM users WHERE email = '$email'";
        $result = mysqli_query(mysql: $conn, query: $check);
       
}
}
?>