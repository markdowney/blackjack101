define(["jquery", "underscore", "backbone", "models/CardModel" ], 


	function($,_,Backbone, Card){
  
    	var HandModel = Backbone.Collection.extend({
		    
		    model: Card,

		    initialize: function(){
		    	//this.bind("add", this.log, this);
		    },

		    count: function(){

		    	var total = 0;
		    	var aces = 0;
		    	this.models.forEach(function(card){
		    		if(card.get("rank") < 10){

		    			if(card.get("rank") == 1) { aces++; total+= 10; }
		    			total += card.get("rank");
		    		}
		    		else{
		    			total += 10;
		    		}

		    		while(aces > 0) {
						if(total <= 21){
							return total;
						}
						else {
							total = total - 10;
							aces = aces - 1;
						}
					}
		    	});
		    	return total;
		    },

		    log: function(card){
		    	console.log("received card");
		    }



		});

		return HandModel;
	}
);