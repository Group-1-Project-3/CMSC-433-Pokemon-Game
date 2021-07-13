<?php
    $dbhost = "127.0.0.1";
    $dbuser = "root";
    $db = "pokemondb";
    $con = mysqli_connect($dbhost, $dbuser, "", $db);
    $pokemon_name = $_GET["pokemon_name"];

    $query = "SELECT entry_id, pokemonid, name, type1, type2, totalstat, hp, attack, defense, specialattack, specialdefense, speed, generation, legendarystatus FROM pokemon_data WHERE (name = '$pokemon_name')";

    $result = mysqli_query($con, $query);

    $array = mysqli_fetch_row($result);

    mysqli_close($con);

    echo json_encode($array);
?>
