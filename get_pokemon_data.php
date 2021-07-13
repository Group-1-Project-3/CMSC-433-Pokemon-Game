<?php
    $dbhost = "127.0.0.1";
    $dbuser = "root";
    $db = "pokemonDB";
    $con = mysqli_connect($dbhost, $dbuser, "", $db);
    $pokemon_name = $_GET['pokemon_name'];
    $query = "SELECT * FROM pokemon_data WHERE (pokemon_name = '$pokemon_name')";

    $result = mysqli_query($con, $query);

    $array = mysqli_fetch_row($result);

    mysqli_close($con);
    
    echo json_encode($array);
?>
