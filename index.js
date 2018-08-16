const express = require('express');
const bodyparser = require("body-parser");
const app = express();
const jwt_secret = 'WU5CjF8fHxG40S2t7oyk';

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var mongojs = require('mongojs');
var db = mongojs('localhost:27017/peex', ['expenses','category','users','carrental']);
app.use(bodyparser.json());

var port = process.env.PORT || 5000
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({
    extended: true
})); // to support URL-encoded bodies

app.use(express.static(__dirname + '/material'));

//provjerava da li je vrsta tokena validna za nastavaka
//jwt.verify(token, public key, options callback)
app.use('/peex/',function(request,response,next){
  jwt.verify(request.get('JWT'), jwt_secret, function(error, decoded) {      
    if (error) {
      response.status(401).send('Unauthorized access');    
    } else {
      db.collection("users").findOne({'_id': new MongoId(decoded._id)}, function(error, user) {
        if (error){
          throw error;
        }else{
          if(user){
            next();
          }else{
            response.status(401).send('Credentials are wrong.');
          }
        }
      });
    }
  });  
})

app.post('/login', function(req, res) {
    var user = req.body;
    db.collection('users').findOne({
        'email': user.email,
    }, function(error, users) {
        if (error) {
            throw error;
        } 
        if(users) {
            bcrypt.compare(user.password, users.password, function(err, resp){
                if(resp === true){
                    if(users.type == "user"){
                        var token = jwt.sign(users, jwt_secret, {
                            expiresIn: 60*60*24
                        });
                        res.send({
                            success: true,
                            message: 'Authenticated',
                            token: token,
                            type: "user"
                        })
                        console.log("Authentication passed.");
                    }
                }
                else {
                    res.send({
                        user : false
                    })
                }
            })
        }
    });
});


app.post('/register', function(req, res, next) {
  req.body.type = "user";
  req.body._id = null;
  req.body.password_confirm = null;
  var user = req.body;
  bcrypt.hash(user.password, 10, function(err, hash) {
      user.password = hash;
      db.collection('users').insert(user, function(err, data) {
          if (err) return console.log(err);
          res.setHeader('Content-Type', 'application/json');
          res.send(user);
      })
  })
});

 app.get('/expenses', function (req, res) {
   db.expenses.find(function (err, docs) {
    res.json(docs)
  })
 });

app.get('/category', function (req, res) {
  db.category.aggregate([

    {$project:{_id:0, category:1}}
    
    ],
    (function (err, doc) {
      res.json(doc)
    })
  );
    
});
app.get('/users', function (req, res) {
  db.users.find(function (err, docs) {
    res.json(docs)
  })
});
app.post('/users', function(req, res) {
  console.log(req.body);
  db.users.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.post('/expenses',function(req,res){
  console.log(req.body);
  db.expenses.insert(req.body, function(err,docs){
  res.json(docs);
  })
});
app.put('/users/:id', function(req, res) {
  var id = req.params.id;
  db.users.findAndModify({
      query: {
        _id: mongojs.ObjectId(id)
      },
      update: {
        $set: {
          username: req.body.username,
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          password: req.body.password
        }
      },
      new: true
    },
    function(err, doc) {
      res.json(doc);
    });
});

app.post('/category', function(req, res) {
  console.log(req.body);
  db.category.insert(req.body, function(err, docs){
    res.json(docs);
  });

});
app.delete('/expenses/:id', function(req, res) {
  var id = req.params.id;
  console.log("deleting expense with id: ",id);
  db.expenses.remove({
    _id: mongojs.ObjectId(id)
  }, function(err, doc) {
    res.json(doc);
  })
});
app.get('/expenses/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  db.expenses.findOne({
    _id: mongojs.ObjectId(id),
  }, function(err, doc) {
    res.json(doc);
  });
});
app.put('/expenses/:id', function(req, res) {
  var id = req.params.id;
  db.expenses.findAndModify({
      query: {
        _id: mongojs.ObjectId(id)
      },
      update: {
        $set: {
          name: req.body.name,
          cost: req.body.cost,
          type: req.body.type,
          date: req.body.date
        }
      },
      new: true
    },
    function(err, doc) {
      res.json(doc);
    });
});

app.get('/', (req, res) => res.sendStatus(200));
app.listen(port, function () {
  console.log('Node app is running on port', port);
});

