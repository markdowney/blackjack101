require.config({

    baseUrl: 'scripts',

    shim: {
        'underscore' : {exports: '_' },
        'backbone' : {exports: 'Backbone', deps: ['underscore']},
        'handlebars' : {exports: 'Handlebars' },
        'json' : {exports: 'JSON'},
    },


    paths: {
    	underscore: 'libs/underscore-min',
        jquery: 'libs/jquery-1.7.2.min',
        backbone: 'libs/backbone-min',
        io: 'libs/socket.io.min',
        handlebars: 'libs/handlebars',
        templates: '../templates',
        text: 'libs/text'
    }
});


require(['app'], function(Application) {
    Application.run();
});