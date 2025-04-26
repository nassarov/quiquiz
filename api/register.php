<?php
require 'conn.php';
if($_SERVER["REQUEST_METHOD"]== "POST"){
    $json = file_get_contents('php://input');
    $data = json_decode($json,true);
    $email = filter_var($data['email'],FILTER_SANITIZE_EMAIL);
    $password = filter_var($data['password'],FILTER_SANITIZE_SPECIAL_CHARS);
    if(!empty($email) && !empty($password)){
        // if already exist
        $check = "SELECT * FROM users WHERE email = '$email'";
        $result = mysqli_query(mysql: $conn, query: $check);
        if(mysqli_num_rows($result) > 0){
            echo json_encode(["status"=>"error","message"=>"Email already exist!"]);
        }
        else{
            $sql = "INSERT INTO users(email,password) VALUES ('$email','" . password_hash($password, PASSWORD_DEFAULT) . "')";
            try{
                mysqli_query($conn,$sql);
                echo json_encode(["status"=> "success","message"=> "Account created go and Login"]);
            }
            catch(mysqli_sql_exception){
                echo json_encode(value: ["status" => "error", "message" => "Failed to create new Account"]);
            }
        }
}
}
?>