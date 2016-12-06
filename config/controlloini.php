<?php 
include('../../config/connecti.php');
include('../../config/funzioni.php');


if(isset($_SESSION['IDstruttura'])){
	$testo='0';
}else{
	$testo='error';
}

if(isset($_SESSION['IDstrpren'])){
	$testo='1';
}else{
	$testo='error';
}

$testo=base64_encode($testo);
header('Content-type: application/json');
echo '[{"html" : "'.$testo.'"} ]';	

?>