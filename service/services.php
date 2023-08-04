<?php include "inc/config.php"; ?> 
<?php
header('Content-type: application/json');

$serviceName = $_POST["serviceName"];

if ($serviceName=="getContactsList"){
	$data = [];

	$result = $conn->query('SELECT `id`, `first_name`, `last_name`, `email`, `phone_number` FROM contacts');
	while ($row = $result->fetch(PDO::FETCH_ASSOC)){
		$data[] = $row;
	}
	$response = array( "status"=>"ok", "data" => $data );
}
else if ($serviceName=="getContactDetails"){
	$contactIdSelected = $_POST["contactIdSelected"];
	$data = array();

	$stmt = $conn->prepare('SELECT `id`, `first_name`, `last_name`, `email`, `phone_number`, `datetime_created` FROM contacts WHERE id = :contactIdSelected');
	$stmt->bindParam('contactIdSelected', $contactIdSelected, PDO::PARAM_INT);
	$stmt->execute();
	if ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
		$data["id"] = $row["id"];
		$data["first_name"] = $row["first_name"];
		$data["last_name"] = $row["last_name"];
		$data["email"] = $row["email"];
		$data["phone_number"] = $row["phone_number"];
		$data["datetime_created"] = $row["datetime_created"];
	} 
	$response = array( "status"=>"ok", "data" => $data );
}
else if ($serviceName=="deleteContact"){
	$contactIdSelected = $_POST["contactIdSelected"];
	$stmt = $conn->prepare('DELETE FROM contacts WHERE id = :contactIdSelected');
	$stmt->bindParam('contactIdSelected', $contactIdSelected, PDO::PARAM_INT);
	$stmt->execute();
	$response = array( "status"=>"ok", "data" => "" );
}
else if ($serviceName=="addContact"){

	$first_name = $_POST["first_name"];
	$last_name = $_POST["last_name"];
	$email = $_POST["email"];
	$phone_number = $_POST["phone_number"];

	$stmt = $conn->prepare('SELECT id FROM contacts WHERE email = :email');
	$stmt->bindParam('email', $email, PDO::PARAM_STR);
	$stmt->execute();
	$recordExists = false;
	if ($row = $stmt->fetch(PDO::FETCH_ASSOC))
		$recordExists = true;

	if (!$recordExists){
		$stmt = $conn->prepare('insert into contacts ( `first_name`, `last_name`, `email`, `phone_number`) values ( :first_name, :last_name, :email, :phone_number)');
		$stmt->bindParam('first_name', $first_name, PDO::PARAM_STR);
		$stmt->bindParam('last_name', $last_name, PDO::PARAM_STR);
		$stmt->bindParam('email', $email, PDO::PARAM_STR);
		$stmt->bindParam('phone_number', $phone_number, PDO::PARAM_STR);

		$stmt->execute();
		$response = array( "status"=>"ok", "data" => "" );
	}
	else
		$response = array( "status"=>"Error occured : email exists", "data" => "" );

}
else if ($serviceName=="updateContact"){

	$contactIdSelected = $_POST["contactIdSelected"];
	$first_name = $_POST["first_name"];
	$last_name = $_POST["last_name"];
	$email = $_POST["email"];
	$phone_number = $_POST["phone_number"];

	$stmt = $conn->prepare('SELECT id FROM contacts WHERE id = :id');
	$stmt->bindParam('id', $contactIdSelected, PDO::PARAM_INT);
	$stmt->execute();
	$recordExists = false;
	if ($row = $stmt->fetch(PDO::FETCH_ASSOC))
		$recordExists = true;

	if ($recordExists){
		$stmt = $conn->prepare('UPDATE contacts SET `first_name` = :first_name, `last_name` = :last_name, `email` = :email, `phone_number` = :phone_number WHERE id = :id');
		$stmt->bindParam('first_name', $first_name, PDO::PARAM_STR);
		$stmt->bindParam('last_name', $last_name, PDO::PARAM_STR);
		$stmt->bindParam('email', $email, PDO::PARAM_STR);
		$stmt->bindParam('phone_number', $phone_number, PDO::PARAM_STR);
		$stmt->bindParam('id', $contactIdSelected, PDO::PARAM_INT);

		$stmt->execute();
		$response = array( "status"=>"ok", "data" => "" );
	}
	else
		$response = array( "status"=>"err", "data" => "" );

}

$conn = null;

echo json_encode($response);
?>