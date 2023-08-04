<?php include "inc/config.php"; ?> 
<?php
header('Content-type: application/json');

$file_org = $_FILES["file_csv"];
$ext = strtolower(pathinfo($file_org["name"], PATHINFO_EXTENSION));
if ($ext!="csv")
    $response = array( "status"=>"error", "data" => "" );
else{
    $csvAsArray = array_map('str_getcsv', file($file_org["tmp_name"]));
    $recordNum = count($csvAsArray);
    $i=0;
    $j=0;
    foreach($csvAsArray as $csvRecord){
        $i++;
        if ($i==1)
            continue;
        
        $first_name = $csvRecord[0];
        $last_name = $csvRecord[1];
        $email = $csvRecord[2];
        $phone_number = $csvRecord[3];
/*
        $stmt = $conn->prepare('SELECT id FROM contacts WHERE email = :email');
        $stmt->bindParam('email', $email, PDO::PARAM_STR);
        $stmt->execute();
        $recordExists = false;
        if ($row = $stmt->fetch(PDO::FETCH_ASSOC))
            $recordExists = true;
        $stmt = null;
*/
//        if (!$recordExists){
            $stmt = $conn->prepare('insert into contacts ( `first_name`, `last_name`, `email`, `phone_number`) values ( :first_name, :last_name, :email, :phone_number)');
            $stmt->bindParam('first_name', $first_name, PDO::PARAM_STR);
            $stmt->bindParam('last_name', $last_name, PDO::PARAM_STR);
            $stmt->bindParam('email', $email, PDO::PARAM_STR);
            $stmt->bindParam('phone_number', $phone_number, PDO::PARAM_STR);
            $stmt->execute();
            //$j += $stmt->rowCount();
            $stmt = null;
//        }
    }
    $conn = null;

	$response = array( "status"=>"ok", "data" => "" );
}
echo json_encode($response);
?>