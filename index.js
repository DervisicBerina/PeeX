const express = require('express');
const bodyparser = require("body-parser");
const app = express();
const jwt_secret = 'WU5CjF8fHxG40S2t7oyk';

var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);
var jwt = require('jsonwebtoken');
var mongojs = require('mongojs');
//var db = mongojs('localhost:27017/peex', ['expenses', 'category', 'users']);
var db = mongojs(process.env.MONGOLAB_URI || 'localhost:27017/peex', ['expenses', 'category', 'users']);


app.use(bodyparser.json());

var port = process.env.PORT || 5000


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/material'));

app.use('/peex/', function (request, response, next) {
  jwt.verify(request.get('JWT'), jwt_secret, function (error, decoded) {
    if (error) {
      response.status(401).send('Unauthorized access');
    } else {
      db.collection("users").findOne({ '_id': new MongoId(decoded._id) }, function (error, user) {
        if (error) {
          throw error;
        } else {
          if (user) {
            next();
          } else {
            response.status(401).send('Credentials are wrong.');
          }
        }
      });
    }
  });
})

//login and register

app.post('/login', function (req, res) {
  var user = req.body;
  db.collection('users').findOne({
    'email': user.email,
  }, function (error, dbUser) {
    if (error) {
      throw error;
    }
    if (dbUser) {
      bcrypt.compare(user.password, dbUser.password, function (err, resp) {
        if (true === true) {
          if (dbUser.type == "user") {
            dbUser.password = null
            var token = jwt.sign(dbUser, jwt_secret, {
              expiresIn: 60 * 60 * 24

            });
            res.send({
              success: true,
              message: 'Authenticated',
              token: token,
              type: "user",
              user_id: dbUser._id,
              username: dbUser.firstName,
            })
            console.log("Authentication passed.");
          }
        }
        else {
          res.send({
            user: false
          })
        }
      })
    }
  });
});


app.post('/register', function (req, res, next) {
  req.body.type = "user";
  req.body._id = null;
  req.body.password_confirm = null;
  var user = req.body;
  var find = req.body.email;
  console.log(find);
  bcrypt.hash(user.password, salt, null, function (err, hash) {
    user.password = hash;
    db.users.find({
      email: find
    }).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      if (result.length > 0) {
        console.log(result);
      } else {

        db.collection('users').insert(user, function (err, data) {
          if (err) return console.log(err);
          res.setHeader('Content-Type', 'application/json');
          res.send();
        })
      }
    })
  })
});




//manage users

app.get('/users', function (req, res) {
  var token = req.headers['token'];
  var tokenValid = token !== 'null' && token !== undefined;
  if (!tokenValid) {
    return notAuthorizedRequest(res);
  }
  db.users.find(function (err, docs) {
    res.json(docs)
  })
});
app.post('/users', function (req, res) {
  var token = req.headers['token'];
  var tokenValid = token !== 'null' && token !== undefined;
  if (!tokenValid) {
    return notAuthorizedRequest(res);
  }
  console.log(req.body);
  db.users.insert(req.body, function (err, doc) {
    res.send();
  });
});

app.put('/users/:id', function (req, res) {
  var token = req.headers['token'];
  var tokenValid = token !== 'null' && token !== undefined;
  if (!tokenValid) {
    return notAuthorizedRequest(res);
  }
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
    function (err, doc) {
      res.json(doc);
    });
});

//manage expenses
// var userId = req.headers['user_id'];
// var token = req.headers['token'];
// var tokenValid = token !== 'null' && token !== undefined;
// var userIdValid = userId !== 'null' && userId !== undefined;
// if (!tokenValid || !userIdValid) {
//   return notAuthorizedRequest(res);
// }
// var query = {user_id:userId};

// db.collection('expenses').find(query).toArray(function (err, docs) {
//   res.json(docs)
// });
// });

app.get('/expensesLastList', function (req, res) {
  var userId = req.headers['user_id'];
  var token = req.headers['token'];
  var tokenValid = token !== 'null' && token !== undefined;
  var userIdValid = userId !== 'null' && userId !== undefined;
  if (!tokenValid || !userIdValid) {
    return notAuthorizedRequest(res);
  }
  var query = { user_id: userId };

  db.expenses.aggregate(
    [
      {
        $sort: {
          _id: -1
        }
      }, {
        $limit: 10
      }
    ],
    function (err, docs) {
      res.json(docs)
    })
  db.expenses.find(query).toArray(function (err, docs) {
    res.json(docs)
  });
})


//manage category

app.get('/category', function (req, res) {
  var token = req.headers['token'];
  var tokenValid = token !== 'null' && token !== undefined;
  if (!tokenValid) {
    return notAuthorizedRequest(res);
  }
  db.category.find(function (err, docs) {
    res.json(docs)
  })
});

app.post('/category', function (req, res) {
  var token = req.headers['token'];
  var tokenValid = token !== 'null' && token !== undefined;
  if (!tokenValid) {
    return notAuthorizedRequest(res);
  }
  console.log(req.body);
  db.category.insert(req.body, function (err, docs) {
    res.send();
  });

});
app.get('/category/:id', function (req, res) {
  var token = req.headers['token'];
  var tokenValid = token !== 'null' && token !== undefined;
  if (!tokenValid) {
    return notAuthorizedRequest(res);
  }
  var id = req.params.id;
  console.log(id);
  db.category.findOne({
    _id: mongojs.ObjectId(id),
  }, function (err, doc) {
    res.json(doc);
  });
});
app.put('/category/:id', function (req, res) {
  var token = req.headers['token'];
  var tokenValid = token !== 'null' && token !== undefined;
  if (!tokenValid) {
    return notAuthorizedRequest(res);
  }
  var id = req.params.id;
  db.category.findAndModify({
    query: {
      _id: mongojs.ObjectId(id)
    },
    update: {
      $set: {
        category: req.body.category
      }
    },
    new: true
  },
    function (err, doc) {
      res.json(doc);
    });
});
app.delete('/category/:id', function (req, res) {
  var token = req.headers['token'];
  var tokenValid = token !== 'null' && token !== undefined;
  if (!tokenValid) {
    return notAuthorizedRequest(res);
  }
  var id = req.params.id;
  console.log("deleting category with id: ", id);
  db.category.remove({
    _id: mongojs.ObjectId(id)
  }, function (err, doc) {
    res.json(doc);
  })
});


app.get('/sumExpenses', function (req, res) {
  var token = req.headers['token'];
  var userId = req.headers['user_id'];
  var tokenValid = token !== 'null' && token !== undefined;
  var userIdValid = userId !== 'null' && userId !== undefined;
  if (!tokenValid || !userIdValid) {
    return notAuthorizedRequest(res);
  }
  var query = { user_id: userId };
  db.expenses.aggregate([
    [
      {
        $group: {
          _id: null,
          total: {
            $sum: '$cost'
          }
        }
      }
    ]
  ],
    (function (err, docs) {
      res.json(docs)
    })
  )
});


app.post('/expenses', function (req, res) {
  var token = req.headers['token'];
  var tokenValid = token !== 'null' && token !== undefined;
  if (!tokenValid) {
    return notAuthorizedRequest(res);
  }
  console.log(req.body);
  db.expenses.insert(req.body, function (err, docs) {
    res.send();
  })
});

app.get('/expenses', function (req, res) {
  var userId = req.headers['user_id'];
  var token = req.headers['token'];
  var tokenValid = token !== 'null' && token !== undefined;
  var userIdValid = userId !== 'null' && userId !== undefined;
  if (!tokenValid || !userIdValid) {
    return notAuthorizedRequest(res);
  }
  var query = { user_id: userId };

  db.collection('expenses').find(query).toArray(function (err, docs) {
    res.json(docs)
  });
});

var notAuthorizedRequest = function (res) {
  return res.status(401).send({
    auth: false, message: "token not provided"
  });
}

app.get('/expenses/:id', function (req, res) {
  var token = req.headers['token'];
  var tokenValid = token !== 'null' && token !== undefined;
  if (!tokenValid) {
    return notAuthorizedRequest(res);
  }
  var id = req.params.id;
  console.log(id);
  db.expenses.findOne({
    _id: mongojs.ObjectId(id),
  }, function (err, doc) {
    res.json(doc);
  });
});
app.delete('/expenses/:id', function (req, res) {
  var token = req.headers['token'];
  var tokenValid = token !== 'null' && token !== undefined;
  if (!tokenValid) {
    return notAuthorizedRequest(res);
  }
  var id = req.params.id;
  console.log("deleting expense with id: ", id);
  db.expenses.remove({
    _id: mongojs.ObjectId(id)
  }, function (err, doc) {
    res.json(doc);
  })
});
app.put('/expenses/:id', function (req, res) {
  var token = req.headers['token'];
  var tokenValid = token !== 'null' && token !== undefined;
  if (!tokenValid) {
    return notAuthorizedRequest(res);
  }
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
    function (err, doc) {
      res.json(doc);
    });
});

app.get('/', (req, res) => res.sendStatus(200));
app.listen(port, function () {
  console.log('Node app is running on port', port);
});

