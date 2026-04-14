<?php
require 'C:/xampp/htdocs/IHOST-backend/config/db.php';
$stmt = $conn->query("SELECT email, passwordU FROM users LIMIT 1");
$row = $stmt->fetch_assoc();
print_r($row);
?>
