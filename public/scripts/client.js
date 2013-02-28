
$(function(){


	//Card Model and View

	var Card = Backbone.Model.extend({
		defaults: {
			rank: 'ace',
			suit: 'hearts'	
		}	  	
	});

	var CardView = Backbone.View.extend({
		tagName: 'li',

		initialize: function(){
			_.bindAll(this, 'render');      		
		},

		render: function(){
			$(this.el).addClass(this.model.get('rank') + ' ' + this.model.get('suit'));
			return this;
		}	
	});


	//Player Model and View

	var Player = Backbone.Model.extend({
		defaults: {
			name: 'player',
			state: 'play',
			hand: {},
			total: 0
		}
	});


	/*** Central view **/
	
	var PlayerView = Backbone.View.extend({
		tagName: 'div',

		initialize: function(){
			_.bindAll(this, 'render', 'addCards'); 
		},

		render: function(){
			$(this.el).addClass('row').html('<h1>'+this.model.get('name')+' ('+this.model.get('total')+') / Bet:'+this.model.get('bet')+'</h1><ul class="cardlist"></ul>');
			
			console.log(this.model.get('state'));
			
			if(this.model.get('state') == 'blackjack'){
				$(this.el).addClass('blackjack');
			}
			else if (this.model.get('state') == 'stand'){
				$(this.el).addClass('stand');	
			}
			else if (this.model.get('state') == 'lost'){
				$(this.el).addClass('lost');	
			}			
			
			this.addCards(this.model.get('hand'));
			return this;
		},

		addCards: function(cards){
			var that = this						
			$.each(cards, function(index, card) {
				var newcard = new Card({rank:card.rank, suit:card.suit});
				var cardView = new CardView({model: newcard});
				$('ul.cardlist', that.el).append(cardView.render().el);			
			});			
		}
	});
	
	/*** Left view **/
	
	var PlayerListView = Backbone.View.extend({
		tagName: 'li',
		
		initialize: function(){
			_.bindAll(this, 'render'); 
		},
		
		render: function(){
			$(this.el).html(this.model.get('name') + " : "+this.model.get('money'));
			if(this.model.get('state') == 'play'){
				$(this.el).addClass('active');
			}
			return this;						
		}		
	})


	//Game Control View
	window.GameControlView = Backbone.View.extend({
	})

	//Game View
	window.GameView = Backbone.View.extend({

		el: $('body'),
		//tagName

		initialize: function(){
			_.bindAll(this, 'render','addPlayer', 'addPlayers');
			init();
		},
		
		render: function(players){
			this.addPlayers(players);
		},

		addPlayer: function(player){						
			var newplayer = new Player({name:player.name, state:player.state, hand:player.hand, total:player.total, bet:player.bet, money:player.money}); 			
			var playerView = new PlayerView({ model: newplayer});
			$('div#players', this.el).append(playerView.render().el);
			var playerListView = new PlayerListView({ model: newplayer});
			$('ul.nav-list', this.el).append(playerListView.render().el);			
		},
				
		addPlayers: function(players){
			var that = this;
			$('div#players', this.el).html('');
			$('ul.nav-list', this.el).html('');
			$('div.player-list', this.el).attr('style','display:block;');
			$.each(players, function(index, player) {
				if(player != null){
					console.log(player);
					that.addPlayer(player);	
				}			
			});
		}
				
	});

	window.gameView = new GameView; 	


	function init(){
		 
		var socket = io.connect('http://localhost:3000');
		
		/*** Debug ***/
		socket.on('connect', function () {
			$('#log').html('connected');
		});

		socket.on('disconnect', function () {
			$('#log').html('disconnected');
		});

		socket.on('message', function (msg) {
			$('#log').html(msg);
		});
		
		socket.on('gamestate', function (msg){			
			var players = jQuery.parseJSON(msg);
			window.gameView.render(players);
		});


		//player card or stand

		$(document).keydown(function(evt) {
			
			//alert(evt.keyCode);
			//space for card
			if (evt.keyCode == 32) {
				socket.emit('card');
			}

			//enter for stand
			if (evt.keyCode == 13) {
				socket.emit('stand');
			}

			// N for new game
			if (evt.keyCode == 78) {
				socket.emit('newgame');
			}

			// P for new player
			if (evt.keyCode == 80){
				socket.emit('newplayer');
			}

		});


		$('.join-btn').click(function(){
			this.parent.addClass('my-seat');
			socket.emit('newgame');
		});



	}



});

