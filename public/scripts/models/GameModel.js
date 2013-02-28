define(["jquery", "underscore", "backbone", "models/PlayerModel", "models/PlayersModel",
		 "models/DeckModel", "models/HandModel"], 


	function($,_,Backbone, Player, Players, Deck, Hand){


    	var GameModel = Backbone.Model.extend({
	
		    defaults: function() {
		    	return {
			    	currentPlayer: 0,
			    	status: "none"
		    	}
		    },

			initialize: function(){
								
				//new deck
				this.deck = new Deck();
				
				//init players
				this.players = new Players();
				this.players.add({name: "dealer", type: "dealer"});
				this.addPlayer();

				//start
				this.newHand();
			},

			addPlayer: function(){

				this.players.unshift({name:"mark"});
			},

			newHand: function(){
				
				//empty hands
				this.players.forEach(function(player){
					player.hand.reset();
					player.set("status","play");
				});

				//shuffle deck
				this.deck.initialize();
				this.deck.shuffle();

				var game = this;

				//deal cards
				this.players.forEach(function(player){
					player.askCard(game.deck.draw());
				});
				this.players.forEach(function(player){
					player.askCard(game.deck.draw());
				});

				//start turn
				this.set("currentPlayer", 0);
				this.set("status","playing");
			},

			play: function(){

				var currentPlayer = this.players.at(this.get("currentPlayer"));
				
				if(currentPlayer.get("type") === "dealer" || currentPlayer.get("type") === "comp"){
					while(currentPlayer.hand.count() < 17){
						currentPlayer.askCard(this.deck.draw());
					}
	
					console.log(currentPlayer.get("name")+" stands. ["+currentPlayer.hand.count()+"]");
					this.stand();
					
				}

				else {
					//look at human player
					if(currentPlayer.get("status") == "hit"){
						currentPlayer.askCard(this.deck.draw());
					}
				}
			},

			hit: function(){
				var currentPlayer = this.players.at(this.get("currentPlayer"));
				currentPlayer.askCard(this.deck.draw());
				var currentScore = currentPlayer.get("score");
				if(currentScore >= 21){
					//busted
					this.nextTurn();
				}
			},

			stand: function(){
				this.nextTurn();
			},

			nextTurn: function(){
				var currentPlayer = this.get("currentPlayer");
				currentPlayer++;
				this.set("currentPlayer", currentPlayer);

				if(currentPlayer > this.players.length - 1){
					this.findWinner();
				}
				else {
					this.play();
				}
			},

			findWinner: function(){
				var dealer = this.players.where({type: "dealer"})[0];
				var dealerScore = dealer.get("score"); 			
				function compareToDealer(playerScore, dealerScore){
					if(playerScore > 21) {
						return "bust";
					} 
					else if (!dealerScore) {
						return "none";
					}
					else if (playerScore > dealerScore || dealerScore > 21) {
						return "win";
					} 
					else if (playerScore === dealerScore) {
						return "push";
					} 
					else if (playerScore < dealerScore){
						return "lost";
					}
				}
				this.players.each(function (player) {
					var result;
					if (player.get("type") === "dealer") {
						result = compareToDealer(dealerScore);
					}
					else {
						console.log("evaluating "+player.get("name"));
						var playerScore = player.get("score");
						result = compareToDealer(playerScore, dealerScore);
					}
					player.set("status",result);
				});
				this.set("status","finished");
			}

		});

		return GameModel;
});