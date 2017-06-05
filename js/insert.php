<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "edu";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 






    echo "New record created successfully";
	
	
	$lastId = $conn->insert_id;


	foreach($_POST as $Name => $respuesta){
	
					$sql = "INSERT INTO 'responde' ('idPersona', 'idRespuesta',) VALUES ('$lastId, $respuesta)";
	}
	if ($conn->query($sql) === TRUE) {

	echo "Guay ";
	
	
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>