import { Pokemon } from "./pokemon_class.js";

var pokeChosen; //Pokemon chosen by the user
var pokeparty = []; //"Pokemon Holder" Array that will hold all the pokemon
var user;

//Test new_poke
var new_poke = new Pokemon("Squirtle",0,0,0,0,0,0,0,0,0,1);

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
				
				//TEST
				user.addPokemon(new_poke);
				user.getPokeInfo("Squirtle", pokeparty);
			});
	}
});

//Player Object/Class
class Player {
	
	//Create player obj with their starter pokemon
	constructor(pokeparty){
		this.pokeparty = pokeparty;
	}
	
	//Add pokemon to player's team
	addPokemon(newPokemon) {
		this.pokeparty.push(newPokemon);
	}

	//Get Pokemon Info
	getPokeInfo(pokeName, pokeparty) {
		let i = 0;
		let len = pokeparty.length;

		//Check that array isn't empty
		if (len > 0) {
			for (i; i < len; i++) {
				if (pokeparty[i].pokemon_name == pokeName) {
					//Ouput Pokemon Info

					//TEST (DELETE LATER)
					console.log(pokeparty[i].pokemon_name);
					console.log("Attack "+ pokeparty[i].spattack);
				}
			}
		}
		else if (len == 0) {
			//Output that there is no Pokemon

			//TEST (DEL LATER)
			console.log("There is no pokemon currently in the array.");
		}
	}
}