define(["jquery", "underscore", "backbone", "models/PlayerModel"], 


	function($,_,Backbone, Player){
  
		var PlayersModel = Backbone.Collection.extend({
			model: Player,
			initialize: function() {
				//update the players when a player is added 
				this.bind("add", this.log, this);
			},
			log: function(player) {
				console.log("player "+player.get("name")+" joined.");
			}
		});


		return PlayersModel;
	}
);