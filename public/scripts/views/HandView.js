define(["jquery", "underscore", "backbone", "views/CardView"], 


	function($,_,Backbone, CardView){

		var HandView = Backbone.View.extend({
			
			tagName: "ul",
			className: "hand",
			initialize: function(){
				this.render();
				this.collection.bind("add", this.render, this);
				this.collection.bind("remove", this.render, this);

			},
			render: function(){
				view = this;
				view.$el.html("");
				view.collection.each(function(card) {
					var cardView = new CardView({model: card, className: card.get("suit")+" _"+card.get("rank")});
					view.$el.append(cardView.$el);	
				});
			}

		});

		return HandView;
	}
);