// Welcome to the jungle
//==========================
// API for foodboard

// Import things and setup app in express
var express         = require('express');
var app             = express();
var bodyParser      = require("body-parser");
var mongoose        = require('mongoose');
var config	        = require('./config');
var Dish            = require('./app/models/dish');
// var User            = require('./app/models/user');

// Connect to DB
mongoose.connect(config.database);

// Add bodyParser to app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routing
//============
var router = express.Router();

// Filter all requests
router.use(function(req, res, next){
    console.log('Accessing the API');
    next(); // go to next route for sure
});

router.get('/', function(req, res){
    res.json({ message: "Welcome to foodboard API"});
});

// Dishes
router.route('/dishes')
    // Create via POST
    .post(function(req, res){

        var dish = new Dish();

        dish.name = req.body.name;
        dish.place = req.body.place;
        dish.points = req.body.points;
        // dish.photo_url = req.body.photo_url;

        dish.save(function(err){
            if (err) res.send(err);

            res.json({ message: 'Dish created',
                        dish: dish });
        });
    })

    // List all via GET
    .get(function(req, res){
        Dish.find(function(err, dishes){
            if (err) res.send(err);

            res.json(dishes);
        });
    });

// Handling one dish at a time
router.route('/dishes/:dish_id')
    // Show One
    .get(function(req, res){
        Dish.findById(req.params.dish_id, function(err, dish){
            if (err) res.send(err);

            res.json(dish);
        });
    })
    // Update one
    .put(function(req, res){
        Dish.findById(req.params.dish_id, function(err, dish){
            if (err) res.send(err);

            //actual updating
            dish.name = req.body.name;
            dish.place = req.body.place;
            dish.points = req.body.points;

            dish.save(function(err){
                if (err) res.send(err);

                res.json({ message: 'Dish updated',
                            dish: dish });
            });

        });
    })

    // Delete one
    .delete(function(req, res){
        Dish.remove({
            _id: req.params.dish_id
        }, function(err, dish){
            if (err) res.send(err);

            res.json({ message: "Dish deleted! 😟 " })
        });
    });

//TODO handle dishes with all important variables

//TODO Users and verification


// Prefix /api and use the router
app.use('/api', router);


// Start the server
//=======================
// Set 8080 port
var port = process.env.PORT || 8080;

app.listen(port);
console.log('Magic happening on port ' + port);
