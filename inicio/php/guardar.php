<?php


// conectamos con el servidor

$conectar=mysql_connect ('localhost', 'root', '', 'consultas');

// verificamos la conexion 

if(!$conectar){
	echo "No se pudo conectar con el servidor";
	
	}else{
		$base=mysql_select_db('consultas');
		if(!$base){
			echo "No se encontro la base de datos";
		}
	}
	
	if(isset ($_POST['enviar']))){
		
	//recuperar las variables 
	$nombre = $_POST['nombre'];
	$email  = $_POST['email'];
	$acercade  = $_POST['acercade'];
	$mensaje = $_POST['mensaje'];
	
	
	}
	// hacemos la sentencia de sql_regcase
	
	$sql = "INSERT INTO datos VALUES ('$nombre',
									  '$email',
									  '$acercade',
									  '$mensaje')"
	
	//ejecutamos la sentencia de sql
	$ejecutar=mysql_query($conectar, $sql);
	
	//verificamos la ejecucion 
	
	if (!$ejecutar){
		echo"Hubo algun error";
		
	}else{
		echo"Datos Guardados Correctamente <br>< a href='inicio.html'>Volver</a>"
	}
	

	
?>



