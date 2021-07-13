import { Pokemon } from "./pokemon_class.js";

var pokeChosen; //Pokemon chosen by the user
var pokeparty = []; //"Pokemon Holder" Array that will hold all the pokemon
var user;

//Get selected Pokemon
$(document).ready(function(){
	document.getElementById('submit').onclick = function() {
		var selected = document.querySelector('input[type=radio][name=pokemon]:checked');
	
			$.get(`get_pokemon_data.php?pokemon_name=${selected.value}`, function(data){
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
	
				//Set pokeChosen to new pokemon object of user's choice	
				pokeChosen = new Pokemon(pokemon_name, type1, type2,totalstat, hp, attack, defense, spattack, spdefense, speed, 1); 
			
				//Add the pokemon chosen into the array
				pokeparty.push(pokeChosen);
	
				user = new Player(pokeparty);
			});
	}
});

//Player Object/Class
class Player {
	
	constructor(pokeparty){
		this.pokeparty = pokeparty;
		console.log(pokeparty);
	}
}