<?php
    $dbhost = "127.0.0.1";
    $dbuser = "root";
    $db = "pokemonDB";
    $con = mysqli_connect($dbhost, $dbuser, "", $db);

    $query = "SELECT entry_id, pokemonid, name, type1, type2, totalstat, hp, attack, defense, specialattack, specialdefense, speed, generation, legendarystatus FROM pokemon_data";

    $result = mysqli_query($con, $query);


    $arr = array();
    while ($row = mysqli_fetch_row($result)){

        $arr[$row[2]] = array("entry_id" => $row[0], "pokemon_id" => $row[1], "pokemon_name" => $row[2], "type1" => $row[3], "type2" => $row[4],
        "totalstat" => $row[5], "hp" => $row[6], "attack" => $row[7], "defense" => $row[8], "spattack" => $row[9], "spdefense" => $row[10], "speed" => $row[11]);
    }



    mysqli_close($con);

    echo json_encode($arr);
?>
