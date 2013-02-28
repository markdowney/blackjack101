define(["jquery", "underscore", "backbone", "views/PlayerView"], 


	function($,_,Backbone, PlayerView){

		var GameView = Backbone.View.extend({
			
			//el: "document",
			className: "game",

			initialize: function(){
				_.bindAll(this, 'detectKey');
				$(document).bind('keypress', this.detectKey);

				var game = this;

				game.model.players.each(function (player){
    				var playerView = new PlayerView({model: player});
					game.$el.append(playerView.$el);
				});
			},
			
			detectKey: function(e){
				if(this.model.get("status") == "playing"){
					if(e.keyCode == 110){
						this.stand();
					}
					else if (e.keyCode == 104){
						this.hit();
					}
				}
				else {
					//new game
					this.model.newHand();
				}
			},
			hit: function() {
				this.model.hit();
			},
			stand: function() {
				this.model.stand();
			}

		});

		return GameView;
	}
);