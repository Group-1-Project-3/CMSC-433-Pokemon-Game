<?php
    require_once ('C:\xampp\php\vendor\autoload.php');
    use PhpOffice\PhpSpreadsheet\Reader\Xlsx;

    $dbhost = "127.0.0.1";
    $dbuser = "root";
    $db = "pokemonDB";

    $con = mysqli_connect($dbhost, $dbuser);

    if (!mysqli_select_db($con, $db)){
        $query = "CREATE DATABASE pokemonDB";
        $result = mysqli_query($con, $query);
    }

    $query = "SELECT * FROM pokemon_data";
    if (!mysqli_query($con, $query)){
        $query = "CREATE TABLE pokemon_data (
        entry_id INT(4) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        pokemonid INT(4) UNSIGNED,
        name VARCHAR(100),
        type1 VARCHAR(50),
        type2 VARCHAR(50),
        totalstat INT(10) UNSIGNED,
        hp INT(10) UNSIGNED,
        attack INT(10) UNSIGNED,
        defense INT(10) UNSIGNED,
        specialattack INT(10) UNSIGNED,
        specialdefense INT(10) UNSIGNED,
        speed INT(10) UNSIGNED,
        generation INT(2) UNSIGNED,
        legendarystatus BOOLEAN
        )";
        mysqli_query($con, $query);
    }
    // $err = mysqli_error($con);
    // echo "$err";


    $inputFile = "pokemon_data.xlsx";
    $reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
    $spreadsheet = $reader->load($inputFile);
    $excelSheet = $spreadsheet->getActiveSheet();
    $spreadSheetAry = $excelSheet->toArray();

    $sheetCount = count($spreadSheetAry);

    for ($i = 1; $i < $sheetCount; $i++){
        $gen = $spreadSheetAry[$i][11];
        if ($gen == "1"){

            $id = intval(mysqli_real_escape_string($con, $spreadSheetAry[$i][0]));
            $name = mysqli_real_escape_string($con, $spreadSheetAry[$i][1]);
            $type1 = mysqli_real_escape_string($con, $spreadSheetAry[$i][2]);
            $type2 = mysqli_real_escape_string($con, $spreadSheetAry[$i][3]);
            $totalstat = intval(mysqli_real_escape_string($con, $spreadSheetAry[$i][4]));
            $hp = intval(mysqli_real_escape_string($con, $spreadSheetAry[$i][5]));
            $attack = intval(mysqli_real_escape_string($con, $spreadSheetAry[$i][6]));
            $defense = intval(mysqli_real_escape_string($con, $spreadSheetAry[$i][7]));
            $spattack = intval(mysqli_real_escape_string($con, $spreadSheetAry[$i][8]));
            $spdefense = intval(mysqli_real_escape_string($con, $spreadSheetAry[$i][9]));
            $speed = intval(mysqli_real_escape_string($con, $spreadSheetAry[$i][10]));
            $legendary = intval(mysqli_real_escape_string($con, $spreadSheetAry[$i][12]));

            if ($type2){
                $query = "INSERT INTO `pokemon_data` (pokemonid, name, type1, type2, totalstat, hp, attack, defense, specialattack, specialdefense, speed, generation, legendarystatus) VALUES ('$id', '$name', '$type1', '$type2', '$totalstat', '$hp', '$attack', '$defense', '$spattack', '$spdefense', '$speed', '$gen', '$legendary')";
            }
            else {
                $query = "INSERT INTO `pokemon_data` (pokemonid, name, type1, totalstat, hp, attack, defense, specialattack, specialdefense, speed, generation, legendarystatus) VALUES ('$id', '$name', '$type1', '$totalstat', '$hp', '$attack', '$defense', '$spattack', '$spdefense', '$speed', '$gen', '$legendary')";
            }
            mysqli_query($con, $query);
        }



    }


    $error = mysqli_error($con);
    echo "$error";
    mysqli_close($con);

?>
