var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('localhost:27017/peex', ['expenses','category']);
var body_parser = require('body-parser');
app.use(body_parser.json());

var port = process.env.PORT || 5000

app.use(express.static(__dirname + '/material'));


 app.get('/expenses', function (req, res) {
   db.expenses.find(function (err, docs) {
    res.json(docs)
  })
 });

app.get('/category', function (req, res) {
  db.category.aggregate([
    {$project:{_id:0, category:1}}
    
    ],(function (err, docs) {
    res.json(docs)
  })
);
});

app.post('/expenses',function(req,res){
  console.log(req.body);
  db.expenses.insert(req.body, function(err,docs){
  res.json(docs);
  })
});

app.post('/category', function(req, res) {
  console.log(req.body);
  db.category.insert(req.body, function(err, docs){
    res.json(docs);
  });

});
app.delete('/expenses/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  db.expenses.remove({
    _id: mongojs.ObjectId(id)
  }, function(err, doc) {
    res.json(doc);
  })
});


app.get('/', (req, res) => res.sendStatus(200));
app.listen(port, function () {
  console.log('Node app is running on port', port);
});

