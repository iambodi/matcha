const db = require('./database.js');
const app = require('express')();
let http2 = require('http').Server(app);
let io = require('socket.io')(http2);

http2.listen(3000, function () {
  console.log('listening on *:3000');
});

io.sockets.on('connection', function (socket) {
  socket.on('leave room', function (room) {
    socket.leave(room);
  });
  socket.on('join room', function (room) {
    socket.join(room);
    console.log('a user connected to room', room);
    roomId = room;
  });
  socket.on('send message', (obj) => {
    // console.log(obj)
    io.to(obj.id_match).emit('receive message', obj);
  });
  socket.on('send notif', (obj) => {
    console.log(obj)
    io.to(obj.user + "_user").emit('receive notif', obj)
  });
  socket.on('join userroom', (roomValue) => {
    console.log("socket joined ", roomValue)
    socket.join(roomValue)
  })
});

exports.loadMatches = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'select * from swipe where id_match is not NULL and id_user = ?';
      const query = db.format(sql, [req.params.id]);
      db.query(query, (err, response) => {
        if (err) {
          res.json({
            success: false,
            message: 'User not found',
          });
        } else {
          res.json({
            success: true,
            message: 'Successfully loaded matches',
            matches_list: response,
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
}

exports.loadConversation = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'SELECT * FROM `message` WHERE id_match = ?';
      let query = db.format(sql, req.params.id);
      db.query(query, (err, response) => {
        if (err) {
          res.json({
            success: false,
            message: 'User not found',
          });
        } else {
          res.json({
            success: true,
            message: 'Successfully loaded conversation messages',
            messageArray: response
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
}

exports.saveMessage = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'INSERT INTO message VALUES(?, ?, ?, NOW(), ?)';
      let query = db.format(sql,
        [
          null,
          req.body.idUser,
          req.body.message,
          req.body.idMatch
        ]);
      db.query(query, (err, response) => {
        if (err) {
          console.log(err);
          res.json({
            success: false,
            message: 'Failed to save this message',
          });
        } else {
          res.json({
            success: true,
            message: 'Successfully saved this message',
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }

}