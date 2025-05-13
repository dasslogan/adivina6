<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$conn = new mysqli('localhost', 'pma', '', 'riddle_game');
$stmt = $conn->prepare("INSERT INTO leaderboard (username, time) VALUES (?, ?)");

foreach ($data as $entry) {
    $stmt->bind_param("si", $entry[1].username, $entry[1].time);
    $stmt->execute();
}

echo json_encode(['status' => 'success']);
?>
