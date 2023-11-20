<?PHP
ini_set('display_errors', true);
error_reporting(E_ALL);
require 'Adm/php/banco.php';
date_default_timezone_set('America/Sao_Paulo');
$matricula  = $_POST['matricula'];
$latitude   = $_POST['latitude'];
$longitude  = $_POST['longitude'];

$stmt = new stdClass();
$pdo = Banco::conectar_postgres();
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$data            	  = date("Y-m-d H:i:s");

$sql = "INSERT INTO sind.coordenadas(";
$sql .= "matricula, data, latitude, longitude) ";
$sql .= "VALUES(";
$sql .= ":matricula, ";
$sql .= ":data, ";
$sql .= ":latitude, ";
$sql .= ":longitude)";


$stmt = $pdo->prepare($sql);

$stmt->bindParam(':matricula', $matricula,  PDO::PARAM_STR);
$stmt->bindParam(':data',      $data,       PDO::PARAM_STR);
$stmt->bindParam(':latitude',  $latitude,   PDO::PARAM_STR);
$stmt->bindParam(':longitude', $longitude, PDO::PARAM_STR);

$stmt->execute();
$msg_grava_cad = "gravou";
echo $msg_grava_cad;