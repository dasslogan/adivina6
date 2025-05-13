<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$conn = new mysqli('localhost', 'pma', '', 'riddle_game');
$stmt = $conn->prepare("INSERT INTO riddles (question, answer) VALUES (?, ?)");
$stmt->bind_param("ss", $data['question'], $data['answer']);
$stmt->execute();
echo json_encode(['status' => 'success']);
?>