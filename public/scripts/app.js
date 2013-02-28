define(["jquery", "underscore", "backbone", "views/userview",
 "io", "models/DeckModel", "models/PlayerModel", "models/GameModel", "views/GameView"],

    function($,_,Backbone,UserView, socket, Deck, Player, Game, GameView){

        return {
            run : function(){
            	$(document).ready(function(){


                var gameView = new GameView({model:new Game});
                $("body").append(gameView.render().el);


            	});
       		}
       	}
	}
);