<?php
require 'conn.php';

if($_SERVER["REQUEST_METHOD"]=="POST"){
    $json = file_get_contents('php://input');
    $data = json_decode($json,true);
    $email = filter_var($data['email'],FILTER_SANITIZE_EMAIL);
    $password = filter_var($data['password'],FILTER_SANITIZE_SPECIAL_CHARS);

     if(!empty($email) && !empty($password)){
        $sql = "SELECT * FROM users WHERE email = '$email'";
        $result = mysqli_query($conn,$sql);
        if(mysqli_num_rows($result)>0){
            $user = mysqli_fetch_assoc($result);
            if(password_verify($password, $user["password"])){
                echo json_encode(["status"=>"success","message"=>"Welcome Back $email", "user" => $user]);
            }
            else{
                echo json_encode(["status"=>"failed","message"=> "Wrong Credentials!"]);
            }
        }
        else{
            echo json_encode(["status"=>"failed","message"=>"You don't have such account. Click on register to create new one!"]);
        }
     }
}
?>