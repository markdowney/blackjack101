define(["jquery", "underscore", "backbone", "models/CardModel" ], 


	function($,_,Backbone, Card){
  
    	var DeckModel = Backbone.Collection.extend({
	
		    model: Card,

		    initialize: function(){
		    	for (var i=1; i<14; i++) {
					//set attributes for each card
					this.add({suit: "club", rank: i});
					this.add({suit: "heart", rank: i});
					this.add({suit: "spade", rank: i});
					this.add({suit: "diamond", rank: i});
				}
		    },

		    draw: function(){
		    	return this.pop();
		    },

		    shuffle: function(){

		    	var tmp, current, top = this.models.length;
			    
			    if(top) while(--top) {
			        current = Math.floor(Math.random() * (top + 1));
			        tmp = this.models[current];
			        this.models[current] = this.models[top];
			        this.models[top] = tmp;
			    }
			    console.log("shuffled");
		    },

		    draw: function(){

				return this.shift();
		    }

		});

		return DeckModel;
	}
);