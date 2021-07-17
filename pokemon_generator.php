<?php
    $dbhost = "127.0.0.1";
    $dbuser = "root";
    $db = "pokemondb";

    $con = mysqli_connect($dbhost, $dbuser, "", $db);
    $random = rand(1, 166);
    $query = "SELECT entry_id, pokemonid, name, type1, type2, totalstat, hp, attack, defense, specialattack, specialdefense, speed, generation, legendarystatus FROM pokemon_data WHERE (entry_id = $random)";

    $result = mysqli_query($con, $query);

    $array = mysqli_fetch_row($result);

    echo json_encode($array);
?>
