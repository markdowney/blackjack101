define(["jquery", "underscore", "backbone" ], 


	function($,_,Backbone){
  
    	var UserListView = Backbone.View.extend({
	
			initialize: function(){
				this.render();
			},

			render: function(){

			},

			serverEvent: function() {
				this.render();
			}

		});

		return UserListView;
	}
);