const db = require('./database.js');
const passwordHash = require('password-hash');

// ENTER VIEW SETTINGS
// -----------------------------------------------------------------------------------------
exports.enterViewSetting = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'SELECT * FROM user WHERE id_user = ?';
      const query = db.format(sql, [req.params.id]);
      db.query(query, (err, response) => {
        if (err) {
          res.json({
            success: false,
            message: 'User not found',
          });
        } else if (response[0].confirm === 1){
          
          console.log(response[0].confirm);
          res.json({
            success: true,
            message: 'Successfully fetched user data',
            user: response
          });
        } else
        //EST CE QU'ON DECONNECTE L'UTILISATEUR SI SON COMPTE EST PAS CONFIRME ?
          res.json({
            success: false,
            message: 'error',
            user: response
        });
      });
    } else {
      res.sendStatus(401);
    }
  }
};

// UPDATE NAME
// -----------------------------------------------------------------------------------------
exports.updateName = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      if (req.body.newFirstName || req.body.newLastName)
      {
        if (req.body.newFirstName && req.body.newLastName)
        {
          let sql = 'UPDATE user SET firstname = ?, lastname = ? WHERE id_user = ?';
          var query = db.format(sql, [req.body.newFirstName, req.body.newLastName, req.body.idUser]);
        }
        else if (req.body.newFirstName && !req.body.newLastName)
        {
          let sql = 'UPDATE user SET firstname = ? WHERE id_user = ?';
          var query = db.format(sql, [req.body.newFirstName, req.body.idUser]);
        } else if (req.body.newLastName && !req.body.newFirstName)
        {
          let sql = 'UPDATE user SET lastname = ? WHERE id_user = ?';
          var query = db.format(sql, [req.body.newLastName, req.body.idUser]);
        }
        db.query(query, (err, response) => {
          if (err) {
            console.log(err);
          }
          res.json({
            message: 'succes',
            success: true,
          });
        });
      } else {
        res.json({
          message: 'error',
          success: false,
        });
      }
    } else {
      res.sendStatus(401);
    }
  }
};

// UPDATE EMAIL
// -----------------------------------------------------------------------------------------
exports.updateEmail = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      if (req.body.newEmail) {
        let sql = 'UPDATE user SET email = ? WHERE id_user = ?';
        let query = db.format(sql, [
          req.body.newEmail,
          req.body.idUser
        ]);
        db.query(query, (err, response) => {
          if (err) {
            console.log(err);
          }
          res.json({
            message: '[BACK] YEAH EMAIL MODIFIED',
            success: true,
          });
        });
      } else {
        res.json({
          message: '[BACK] FAILED TO UPDATE EMAIL',
          success: false,
        });
      }
    } else {
      res.sendStatus(401);
    }
  }
};

// UPDATE PASSWORD
// -----------------------------------------------------------------------------------------
exports.updatePassword = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      if (req.body.newPassword === req.body.newPasswordConfirmation) {
        let sql = 'SELECT hash FROM user WHERE id_user = ?';
        let query = db.format(sql, [
          req.body.idUser,
        ]);
        db.query(query, (err, response) => {
          if (err) {
            console.log(err);
          } else if (passwordHash.verify(req.body.currentPassword, response[0].hash)) {
            let sql = 'UPDATE user SET hash = ? WHERE id_user = ?';
            const hash = passwordHash.generate(req.body.newPassword);
            let query = db.format(sql, [
              hash,
              req.body.idUser,
            ]);
            db.query(query, (err, response) => {
              if (err) {
                console.log(err);
              } else if (response.changedRows === 1) {
                res.json({
                  message: 'success',
                  success: true,
                });
              } else {
                res.json({
                  message: 'error',
                  success: false,
                });
              }
            });
          } else {
            res.json({
              message: 'currentPwd',
              success: false,
            });
          }
        });
      } else {
        res.json({
          message: 'confirmPwd',
          success: false,
        });
      }
    } else {
      res.sendStatus(401);
    }
  }
};
