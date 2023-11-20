<?PHP
    header("Content-type: application/json");
    include "../../php/banco.php";
    include "../../php/funcoes.php";
    $someArray = array();
    $pdo = Banco::conectar_postgres();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $i=1;
    $mes = $_GET['mes'];

    //TOTAL SENDO SOMADO COM OS CONVENIOS COM PROLABORE ZERO

    /* sql somando convenios com prolabore zero
     "SELECT sum(valor) as total,mes
                          FROM sind.qextrato 
                         WHERE mes = '".$mes."' 
                      GROUP BY mes "
    */
    
    //TOTAL SENDO SOMADO SEM OS CONVENIOS COM PROLABORE ZERO

    $sql = $pdo->query("SELECT sum(valor) as total,mes
                          FROM sind.qextrato 
                         WHERE mes = '".$mes."' 
                           AND divisao = 1
                           AND cobranca = true 
                       AND NOT prolabore isnull
                           AND prolabore <> 0
                      GROUP BY mes");
    while($row = $sql->fetch()) {
        $someArray[$i] = array_map("utf8_encode",$row);
        $i++;
    }
    echo json_encode($someArray);