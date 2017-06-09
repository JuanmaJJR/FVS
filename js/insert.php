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


SELECT responde.idPersona, pregunta.pregunta, respuesta.respuesta, depende.valorRespuesta, textoInformativo.texto 
FROM responde 
JOIN depende ON responde.idRespuesta=depende.id 
JOIN pregunta ON pregunta.id=depende.idPregunta 
JOIN respuesta ON respuesta.id=depende.idRespuesta 
LEFT JOIN textoInformativo ON depende.idTexto=textoInformativo.id 
WHERE responde.idPersona=1