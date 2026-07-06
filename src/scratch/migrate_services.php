<?php
include __DIR__ . '/../../../../../xampp/htdocs/IHOST-backend/config/db.php';

$extensions = [
    '.ma' => 139.00,
    '.com' => 119.00,
    '.net' => 129.00,
    '.org' => 139.00,
    '.tech' => 89.00,
    '.dev' => 149.00,
    '.store' => 79.00,
    '.co' => 169.00,
    '.info' => 99.00,
    '.me' => 109.00,
    '.online' => 40.00
];

foreach ($extensions as $ext => $price) {
    // Check if service with exact name (e.g. '.ma' or '.ma') exists
    $stmt = $conn->prepare("SELECT idService FROM service WHERE typeService='domain' AND LOWER(nameService) = ?");
    $nameLower = strtolower($ext);
    $stmt->bind_param("s", $nameLower);
    $stmt->execute();
    $res = $stmt->get_result();
    
    if ($res->num_rows > 0) {
        $row = $res->fetch_assoc();
        $id = $row['idService'];
        $update = $conn->prepare("UPDATE service SET price = ? WHERE idService = ?");
        $update->bind_param("di", $price, $id);
        $update->execute();
        echo "Updated $ext to price $price\n";
    } else {
        // Check for 'Domaine $ext' or 'Domaine .ext'
        $nameDomaine = "Domaine " . strtoupper($ext);
        $stmt2 = $conn->prepare("SELECT idService FROM service WHERE typeService='domain' AND LOWER(nameService) = ?");
        $nameDomLower = strtolower($nameDomaine);
        $stmt2->bind_param("s", $nameDomLower);
        $stmt2->execute();
        $res2 = $stmt2->get_result();
        
        if ($res2->num_rows > 0) {
            $row2 = $res2->fetch_assoc();
            $id2 = $row2['idService'];
            $update = $conn->prepare("UPDATE service SET price = ? WHERE idService = ?");
            $update->bind_param("di", $price, $id2);
            $update->execute();
            echo "Updated $nameDomaine to price $price\n";
        } else {
            // Also check for '.EXT'
            $nameExtUpper = strtoupper($ext);
            $stmt3 = $conn->prepare("SELECT idService FROM service WHERE typeService='domain' AND nameService = ?");
            $stmt3->bind_param("s", $nameExtUpper);
            $stmt3->execute();
            $res3 = $stmt3->get_result();
            if ($res3->num_rows > 0) {
                $row3 = $res3->fetch_assoc();
                $id3 = $row3['idService'];
                $update = $conn->prepare("UPDATE service SET price = ? WHERE idService = ?");
                $update->bind_param("di", $price, $id3);
                $update->execute();
                echo "Updated $nameExtUpper to price $price\n";
            } else {
                // Insert new service as 'Domaine .EXT'
                $insert = $conn->prepare("INSERT INTO service (nameService, descriptionS, price, typeService, isActive) VALUES (?, ?, ?, 'domain', 1)");
                $desc = "Enregistrement de domaine " . strtoupper($ext);
                $insert->bind_param("ssd", $nameDomaine, $desc, $price);
                $insert->execute();
                echo "Inserted $nameDomaine with price $price\n";
            }
        }
    }
}
?>
