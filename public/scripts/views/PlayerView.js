define(["jquery", "underscore", "backbone", "views/HandView", "handlebars","text!templates/player.html"], 


	function($,_,Backbone, HandView, Handlebars, template){

		var PlayerView = Backbone.View.extend({

			template : Handlebars.compile(template),
			
			tagName: "div",
			className: "player",
			initialize: function(){
				this.render();
				this.model.bind("change", this.render, this);

			},
			render: function(){
				

				if(this.model.get("status") == "win"){
					this.$el.addClass(this.model.get("status"));
				}
				else if(this.model.get("status") == "bust"){
					this.$el.addClass("bust");
				}
				else {
					this.$el.attr("class", "player");
				}

				this.$el.html(this.template(this.model.toJSON()));
				this.$el.append(new HandView({collection: this.model.hand}).$el);
			}


		});

		return PlayerView;
	}
);