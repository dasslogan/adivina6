<?php
header('Content-Type: application/json');
$conn = new mysqli('localhost', 'root', '', 'riddle_game');
$result = $conn->query("SELECT username, MIN(time) as time FROM leaderboard GROUP BY username ORDER BY time ASC LIMIT 5");
echo json_encode($result->fetch_all(MYSQLI_ASSOC));
?>
