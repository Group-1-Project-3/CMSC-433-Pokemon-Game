$(document).ready(function(){
    $("#mybutton").click(function(){
        $.get("pokemon_generator.php", function(data){

            var pokemon = jQuery.parseJSON(data);
            var pokemon_id = pokemon[1];
            var pokemon_name = pokemon[2];
            var type1 = pokemon[3];
            var type2 = pokemon[4];
            var totalstat = pokemon[5];
            var hp = pokemon[6];
            var attack = pokemon[7];
            var defense = pokemon[8];
            var spattack = pokemon[9];
            var spdefense = pokemon[10];
            var speed = pokemon[11];
        });
    });
});
