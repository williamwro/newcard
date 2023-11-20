<?PHP
    include "Adm/php/banco.php";
    include "Adm/php/funcoes.php";
    $pdo = Banco::conectar_postgres();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    $std = new stdClass();
    $someArray = array();

    $query = $pdo->query("SELECT id, matricula, data, latitude, longitude
	FROM sind.coordenadas ORDER BY id desc");
    while($row = $query->fetch()) {
        $someArray[] = array_map("utf8_encode",$row);
    }
    echo json_encode($someArray);