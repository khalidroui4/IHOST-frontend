<?php
require 'C:/xampp/htdocs/IHOST-backend/config/db.php';
$email = 'test@ihost.com';
$password = password_hash('password123', PASSWORD_BCRYPT);
$name = 'Test User';
$stmt = $conn->prepare("INSERT INTO users (nameU, email, passwordU, roleU, first_name, last_name, username) VALUES (?, ?, ?, 'admin', 'Test', 'User', 'testuser') ON DUPLICATE KEY UPDATE passwordU = ?");
$stmt->bind_param("ssss", $name, $email, $password, $password);
$stmt->execute();
echo "User test@ihost.com : password123 added/updated.";
?>
