<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "vidasostenible";
session_start(); 

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 






    echo "New record created successfully";
	
	$sql = "INSERT INTO `persona` (`id`, `pais`, `ccaa`, `edad`, `tipoCasa`, `m2Casa`, `numPersonas`, `ingresos`, `conocimiento`, `estudios`, `sexo`) VALUES     (NULL, '73', '4', '3', '3', '3', '2', '2', '3', '2', 'masculino')";
	

    if ($conn->query($sql) === TRUE) {
    $lastId = $conn->insert_id;


	       foreach($_POST as $Name => $respuesta){
	
				$sql = "INSERT INTO `responde` (`idPersona`, `idRespuesta`) VALUES ('".$lastId."', '".$respuesta."')";
                if ($conn->query($sql) === TRUE) {

	       echo "<br>Guay<br/> ";
	
	
           } else {
                echo "<br/>Error: " . $sql . "<br>" . $conn->error."<br/>";
        }

	       }
	      
    }
$conn->close();
?>

