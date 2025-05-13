<?php
header('Content-Type: application/json');
$conn = new mysqli('localhost', 'root', '', 'riddle_game');
$result = $conn->query("SELECT * FROM riddles ORDER BY RAND() LIMIT 1");
echo json_encode($result->fetch_assoc());
?>
