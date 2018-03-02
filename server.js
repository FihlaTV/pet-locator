var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

// Create an Express App
var app = express();

app.use(session({secret: 'codingdojorocks'}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/petlocator_db');

var UserSchema = new mongoose.Schema({
    email: { type: String, required: true, minlength: 3},
    password: { type: String, required: true, minlength: 3},
    favorites: [{name: String, breed: String, photo: String, description: String, city: String, email: String, lat: String, lng: String}]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

mongoose.model('User', UserSchema);
var User = mongoose.model('User');

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname, './static')));
app.use(express.static( __dirname + '/client/dist' ));


// Set our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Set our View Engine set to EJS
//app.set('view engine', 'ejs');

// Routes
app.get('/favorites/', function(req, res) {
    //Pet.find({}, function(err, pets) {
    User.findOne({email: email}).sort('type').exec(function(err, pets) {
      if (err) {
        console.log("Returned error", err);
        res.json({message: "Error", error: err});
      } else {
        //res.json({data: names})
        res.json({message: "Success", pets: pets})
      }
    })
    //res.render('index', {errors: req.session.errors});
})

app.get('/user/:id', function(req, res) {
  console.log(req.params.id);
  let id = req.params.id;
  User.findOne({_id: id}, function(err, user) {
    if (err) {
        console.log("Returned error", err);
        res.json({message: "Error", error: err});
    } else {
        console.log('successfully retrieved a pet!', user);
        res.json({message: "Success", user: user})
    }
  })
})

app.post('/register/', function(req, res) {
    console.log("REQUEST", req.body.name)
    let errors = [];
    if (req.body.email.length < 3) {
      console.log("The pet must have a name (at least 3 letters)!");
      errors.push("The pet must have a name (at least 3 letters)!");
    }
    if (req.body.password.length < 3) {
      console.log("The pet must have a type (at least 3 letters)!");
      errors.push("The pet must have a type (at least 3 letters)!");
    }
    if (errors.length != 0) {
      console.log("there are errors", errors)
      res.json({message: "Error", errors: errors});
    } else {
          var user = new User({email: req.body.email, password: req.body.password, favorites: []});
          console.log("Created new user", user)
          user.save(function(err) {
            console.log("Saved the user", user)
            if (err) {
              console.log("Returned error", err);
              res.json({message: "Error", error: err});
            } else {
              console.log('successfully added a user!');
              res.json({message: "Success", user: user})
            }
          })
      }
})

app.post('/log-in/', function(req, res) {
  let email = req.body.email;
  User.findOne({email: email}, function(err, user) {
    if (err) {
        console.log("Returned error", err);
        res.json({message: "Error", error: err});
    } else {
        console.log('successfully retrieved a user!', user);
        if (user.password == req.body.password) {
          req.session.id = user._id;
        }
        res.json({message: "Success", user: user})
    }
  })
})


app.put('/favorite/:id', function(req, res) {
    let id = req.params.id;
    let pet = {};
    console.log("****ID***", id)
    let errors = [];
    User.findById(id, function(err, user) {
      if (err) {
        console.log("Returned error", err);
        res.json({message: "Error", error: err});
      } else {
                console.log("Start");
                var name = req.body.name;
                if (req.body.breed){
                  var breed = req.body.breed
                }
                else { var breed = ''}
                var description = req.body.description;
                var photo = req.body.photo;
                var city = req.body.city;
                var email = req.body.email;
                var lat = req.body.lat;
                var lng = req.body.lng;
                console.log("Creating an object");
                pet = {name: name, breed: breed, description: description, photo: photo, email: email, city: city, lat: lat, lng: lng}
                user.favorites.push(pet);
                user.save(function(err) {
                  // if there is an error console.log that something went wrong!
                  if (err) {
                      console.log("Returned error", err);
                      res.json({message: "Error", error: err});
                  } else { // else console.log that we did well and then redirect to the root route
                      console.log('successfully favorited a pet');
                      res.json({message: "Success", user: user})
                  }
                })
        }

    })
})

app.delete('/pets/:id', function(req, res) {
    console.log("trying to delete a pet");
    let id = req.params.id;
    Pet.remove({_id: id}, function(err) {
      if (err){
        console.log("Returned error", err);
        res.json({message: "Error", error: err});
      }else {
        console.log('successfully deleted a pet!');
        res.json({message: "Success"})
      }
    })
})





app.put('/likes/:id', function(req, res) {

    let id = req.params.id;

    console.log("trying to like the pet on backend", id);

    Pet.findById(id, function(err, pet) {
      if (err) {
        console.log("Returned error", err);
        res.json({message: "Error", error: err});
      } else {
        pet.likes ++;
        pet.save(function(err) {
          // if there is an error console.log that something went wrong!
          if (err) {
              console.log("Returned error", err);
              res.json({message: "Error", error: err});
          } else { // else console.log that we did well and then redirect to the root route
              console.log('successfully liked the pet!');
              res.json({message: "Success", pet: pet})
          }
        })
      }

    })


})



app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./client/dist/index.html"))
});

// Set our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
