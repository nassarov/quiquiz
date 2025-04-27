<?php
require 'conn.php';
header('Content-Type: application/json'); 

$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $userId = $data['user_id'];
    $quizId = $data['quiz_id'];
    $score = $data['score'];
    // check if there is prev result
    $checkSql = "SELECT score FROM results WHERE user_id = ? AND quiz_id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("ii", $userId, $quizId);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();

if ($checkResult->num_rows > 0) {
     $row = $checkResult->fetch_assoc();
      $previousScore = $row['score'];

        if ($score > $previousScore) {
            // update result row for savine highest score
            $updateSql = "UPDATE results SET score = ? WHERE user_id = ? AND quiz_id = ?";
            $updateStmt = $conn->prepare($updateSql);
            $updateStmt->bind_param("iii", $score, $userId, $quizId);
            if ($updateStmt->execute()) {
                echo json_encode(['status'=>'success','message'=>'Result updated successfully']);
            } 
            $updateStmt->close();
        } 
 } else {
        // if no record insert one
        $insertSql = "INSERT INTO results (user_id,quiz_id,score) VALUES (?,?,?)";
        $insertStmt = $conn->prepare($insertSql);
        $insertStmt->bind_param("iii", $userId, $quizId, $score);
        if ($insertStmt->execute()) {
            echo json_encode(['status'=>'success','message' =>'Result saved successfully']);
} 
        $insertStmt->close();
    }
    $checkStmt->close();
}
$conn->close();
?>