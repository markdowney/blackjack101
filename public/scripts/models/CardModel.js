define(["jquery", "underscore", "backbone" ], 


	function($,_,Backbone){

    	var CardModel = Backbone.Model.extend({

    		defaults: function() {
		    	return {
		    		suit: "suit",
		    		rank: "rank"
		    	}
		    },	

    	});

		return CardModel;
	}
);