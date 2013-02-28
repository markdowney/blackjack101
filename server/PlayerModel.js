define(["jquery", "underscore", "backbone", "models/HandModel", "models/CardModel" ], 


	function($,_,Backbone, Hand, Card){
  
    	var PlayerModel = Backbone.Model.extend({
	
		    defaults: function() {
		    	return {
		       		name: "",
		        	type: "human",
		        	status: "",
		        	total: 0,
		        	money: 100,
		        	bet: 0,
		        	score: 0
		      	};
		    },

			initialize: function(){
				this.hand = new Hand();
				this.bind("change:status", this.logStatus, this);
			},

			askCard: function(card){
				this.set(this.hand.add(card));
				this.set("score", this.hand.count());
				console.log(this.get("name")+" has hand "+JSON.stringify(this.hand)+". ["+this.get("score")+"]");
			},

			restart: function(){
				this.set({state: "playing"});
				this.set({hand: new Hand()});
				this.set({bet: 10});
			},

			stand: function(){
				this.set({state: "stand"});
			},

			logStatus: function(){
				console.log(this.get("name")+": "+this.get("status"));
			}
		});

		return PlayerModel;
	}
);