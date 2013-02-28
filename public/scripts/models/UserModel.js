




UserModel = Backbone.Model.extend({

	defaults: {
		name: "user",
		money: ""
	},

	initialize: {
		alert("new user");

		this.on("change:cards", function(){
			//blabla
		});

	}


});