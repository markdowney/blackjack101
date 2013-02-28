define(["jquery", "underscore", "backbone"], 


	function($,_,Backbone, CardView){

		var CardView = Backbone.View.extend({
			
			tagName: "li",
			initialize: function(){
				this.render();
			}

		});

		return CardView;
	}
);