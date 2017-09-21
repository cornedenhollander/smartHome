var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

var mysql = require('mysql');
function getConnection() {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'home'
  });
  return connection;
}

app.listen(3000, function () {
  console.log('Login on port 3000');
});

app.use(express.static('public'));

app.post('/user', function (req, res) {
  var connection = getConnection();
  connection.connect();
  var newUser = { id: 0, username: req.body.username, password: req.body.password, email: req.body.email, name: req.body.name, surname: req.body.surname };
  console.log("Yeah! Alles ging goed!");
  try {
    connection.query('INSERT INTO users SET ?', newUser, function (err, result) {
      if (err)
        throw new Error('something bad happened');
      /* continue as normal */
      //TODO error melding werkt nog niet
      console.log("Joepie! Ook dit ging goed!");
      if (err) {
        console.log("Error: " + err);
        res.status(500).end();
      }
      else {
        res.status(200).end();
      }
    });
  } catch (ex) {
    //callback(ex);
    throw new Error('something other bad happened');
    console.log("Er zit een error in");
  }
  connection.end();
});

app.get('/users', function (req, res) {
  var connection = getConnection();
  connection.connect();
  connection.query('SELECT * from users order by id desc', function (err, rows, fields) {
    if (!err) {
      //console.log(rows);
      res.send(JSON.stringify(rows));
    }
    else {
      console.log('Error while performing Query.');
    }
  });
  connection.end();
});

app.delete('/user/:id', function (req, res) {
  var id = req.params.id;
  var connection = getConnection();
  connection.connect();
  connection.query('DELETE from users where id = ?', id, function (err, rows, fields) {
    console.log('deleted ' + id);
    res.status(200).end();
  });
  connection.end();
});

app.delete('/room/:id', function (req, res) {
  var id = req.params.id;
  var connection = getConnection();
  connection.connect();
  connection.query('DELETE from rooms where id = ?', id, function (err, rows, fields) {
    console.log('deleted ' + id);
    res.status(200).end();
  });
  connection.end();
});

app.delete('/device/:id', function (req, res) {
  var id = req.params.id;
  var connection = getConnection();
  connection.connect();
  connection.query('DELETE from devices where id = ?', id, function (err, rows, fields) {
    console.log('deleted ' + id);
    res.status(200).end();
  });
  connection.end();
});

app.delete('/recipe/:id', function (req, res) {
  var id = req.params.id;
  var connection = getConnection();
  connection.connect();
  connection.query('DELETE from recipes where id = ?', id, function (err, rows, fields) {
    console.log('deleted ' + id);
    res.status(200).end();
  });
  connection.end();
});

app.put('/user/:id', function (req, res) {
  var id = req.params.id;
  var connection = getConnection();
  connection.connect();
  connection.query('select password from users where id = ?', id, function (err, rows, fields) {
    console.log("this is the query with the PUT-request");
    res.status(200).end();
  });
  connection.end();
})

app.post('/login', function (req, res) {
  var connection = getConnection();
  connection.connect();
  // var user = { id: 0, username:  req.body.username, password : req.body.password }
  var user2 = [req.body.username, req.body.password];
  // var user2 = ["nathanrose13", "12345"];
  connection.query('select * from users where username = ? AND password = ?', user2, function (err, result) {
    if (err) {
      console.log("Error: " + err);
      res.status(500).end();
    }
    else {
      console.log("result of login post function: ", result);
      res.send(result)
    }
  });
  connection.end();
})

app.post('/rooms', function (req, res) {
  var connection = getConnection();
  connection.connect();
  var newRoom = { id: 0, username: req.body.username, Name: req.body.Name, Type: req.body.Type, Floor: req.body.Floor, Location: req.body.Location };
  console.log("Room post serverside fired!");
  try {
    connection.query('INSERT INTO rooms SET ?', newRoom, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).end();
      }
      else {
        res.send(result);
        console.log("Post succes!");
      }
    });
  } catch (ex) {
    //callback(ex);
    console.log("Er zit een error in");
  }
  connection.end();
});

app.post('/devices', function (req, res) {
  var connection = getConnection();
  connection.connect();
  var newDevice = { id: 0, username: req.body.username, room_id: 5, Name: req.body.Name, Brand: req.body.Brand, Type: req.body.Type };
  console.log("Device post serverside fired!");
  try {
    connection.query('INSERT INTO devices SET ?', newDevice, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).end();
      }
      else {
        res.send(result);
        console.log("Post succes!");
      }
    });
  } catch (ex) {
    //callback(ex);
    console.log("Er zit een error in");
  }
  connection.end();
});

app.post('/recipes', function (req, res) {
  var connection = getConnection();
  connection.connect();
  var newRecipe = { id: 0, username: req.body.username, device_id: 2, Name: req.body.Name, if_this: req.body.if_this, then_that: req.body.then_that };
  console.log("Recipe post serverside fired!");
  try {
    connection.query('INSERT INTO recipes SET ?', newRecipe, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).end();
      }
      else {
        res.send(result);
        console.log("Post succes!");
      }
    });
  } catch (ex) {
    //callback(ex);
    console.log("Er zit een error in");
  }
  connection.end();
});

app.get('/rooms', function (req, res) {
  var connection = getConnection();
  connection.connect();
  connection.query('SELECT * from rooms order by id desc', function (err, rows, fields) {
    if (!err) {
      res.send(JSON.stringify(rows));
    }
    else {
      console.log('Error while performing Query.');
    }
  });
  connection.end();
});

app.get('/devices', function (req, res) {
  var connection = getConnection();
  connection.connect();
  connection.query('SELECT * from devices order by id desc', function (err, rows, fields) {
    if (!err) {
      res.send(JSON.stringify(rows));
    }
    else {
      console.log('Error while performing Query.');
    }
  });
  connection.end();
});

app.get('/recipes', function (req, res) {
  var connection = getConnection();
  connection.connect();
  connection.query('SELECT * from recipes order by id desc', function (err, rows, fields) {
    if (!err) {
      res.send(JSON.stringify(rows));
    }
    else {
      console.log('Error while performing Query.');
    }
  });
  connection.end();
});