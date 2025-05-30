CREATE DATABASE IF NOT EXISTS riddle_game;
USE riddle_game;

CREATE TABLE IF NOT EXISTS riddles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    answer VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS leaderboard (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    time INT NOT NULL,
    guessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
