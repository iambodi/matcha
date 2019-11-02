const mysql = require('mysql');

const db = mysql.createConnection({
  multipleStatements: true,
  host: '192.168.99.101',
  user: 'root',
  password: 'qwerty',
  // database: 'qinder'
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.log('Failed to connect to mysql database');
    return;
  }
  console.log('Successfully connect to mysql database');
});

var sqlCommand = "CREATE DATABASE IF NOT EXISTS matcha;\
USE matcha;\
\
CREATE TABLE IF NOT EXISTS user (\
  id_user int(11) NOT NULL AUTO_INCREMENT,\
  firstname varchar(255) DEFAULT NULL,\
  lastname varchar(255) DEFAULT NULL,\
  email varchar(255) DEFAULT NULL,\
  hash varchar(255) DEFAULT NULL,\
  gender varchar(255) DEFAULT NULL,\
  birthdate date DEFAULT NULL,\
  interest varchar(255) DEFAULT NULL,\
  bio varchar(255) DEFAULT NULL,\
  distance int(11) DEFAULT NULL,\
  minage int(11) DEFAULT NULL,\
  maxage int(11) DEFAULT NULL,\
  validation_key varchar(255) DEFAULT NULL,\
  confirm tinyint(1) DEFAULT NULL,\
  popularity float DEFAULT NULL,\
  position varchar(255) DEFAULT NULL,\
  online tinyint(1) NOT NULL,\
  last_connected date DEFAULT NULL,\
  pop float NOT NULL,\
  username varchar(255) DEFAULT NULL,\
  PRIMARY KEY (id_user),\
  UNIQUE KEY email (email),\
  UNIQUE KEY username (username)\
);\
CREATE TABLE IF NOT EXISTS matcha.match (\
  id_match int(11) NOT NULL AUTO_INCREMENT,\
  started timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\
  PRIMARY KEY (id_match)\
);\
CREATE TABLE IF NOT EXISTS photo (\
  id_photo INT(11) NOT NULL auto_increment,\
  id_user INT(11) DEFAULT NULL,\
  photo longtext,\
  active tinyint(1) DEFAULT NULL,\
  ts timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\
  PRIMARY KEY (id_photo),\
  KEY id_user (id_user),\
  CONSTRAINT photo_ibfk_1 FOREIGN KEY (id_user) REFERENCES user (id_user)\
);\
  CREATE TABLE IF NOT EXISTS message (\
    id_message int(11) NOT NULL AUTO_INCREMENT,\
    id_user int(11) DEFAULT NULL,\
    message tinytext,\
    ts timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\
    id_match int(11) DEFAULT NULL,\
    PRIMARY KEY (id_message),\
    KEY id_match (id_match),\
    CONSTRAINT message_ibfk_1 FOREIGN KEY (id_match) REFERENCES matcha.match (id_match)\
);\
    CREATE TABLE IF NOT EXISTS notification (\
      id_notif int(11) NOT NULL AUTO_INCREMENT,\
      id_user_ int(11) DEFAULT NULL,\
      notif int(11) DEFAULT NULL,\
      ts timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\
      id_user int(11) DEFAULT NULL,\
      PRIMARY KEY (id_notif),\
      KEY id_user (id_user),\
      CONSTRAINT notification_ibfk_1 FOREIGN KEY (id_user) REFERENCES user (id_user)\
);\
      CREATE TABLE IF NOT EXISTS report (\
        id_report int(11) NOT NULL AUTO_INCREMENT,\
        id_user_blocked int(11) DEFAULT NULL,\
        id_user int(11) DEFAULT NULL,\
        PRIMARY KEY (id_report),\
        KEY id_user (id_user),\
        CONSTRAINT report_ibfk_1 FOREIGN KEY (id_user) REFERENCES user (id_user)\
    );\
        CREATE TABLE IF NOT EXISTS swipe (\
          id_swipe int(11) NOT NULL AUTO_INCREMENT,\
          id_user int(11) DEFAULT NULL,\
          id_user_matched int(11) DEFAULT NULL,\
          `like` tinyint(1) DEFAULT NULL,\
          id_match int(11) DEFAULT NULL,\
          PRIMARY KEY (id_swipe),\
          KEY id_user (id_user),\
          KEY id_match (id_match),\
          CONSTRAINT swipe_ibfk_1 FOREIGN KEY (id_user) REFERENCES user (id_user),\
          CONSTRAINT swipe_ibfk_2 FOREIGN KEY (id_match) REFERENCES matcha.match (id_match)\
    );\
          CREATE TABLE IF NOT EXISTS tag (\
            id_tag int(11) NOT NULL AUTO_INCREMENT,\
            label varchar(255) DEFAULT NULL,\
            logo mediumtext,\
            tag varchar(255) DEFAULT NULL,\
            PRIMARY KEY (id_tag)\
            );\
            CREATE TABLE IF NOT EXISTS tagpref (\
              id_tpref int(11) NOT NULL AUTO_INCREMENT,\
              id_tag int(11) NOT NULL,\
              id_user int(11) NOT NULL,\
              PRIMARY KEY (id_tpref),\
              KEY id_user (id_user)\
        );\
              CREATE TABLE IF NOT EXISTS usertag (\
                id_utag int(11) NOT NULL AUTO_INCREMENT,\
                id_tag int(11) DEFAULT NULL,\
                id_user int(11) DEFAULT NULL,\
                PRIMARY KEY (id_utag),\
                KEY id_user (id_user),\
                KEY id_tag (id_tag)\
);\
INSERT INTO tag (id_tag, label, logo, tag)\
                VALUES (1, 'Netflix', NULL, 'Netflix & Chill')\
                ON DUPLICATE KEY UPDATE id_tag = id_tag;\
INSERT INTO tag (id_tag, label, logo, tag)\
    VALUES (2, 'Athletic', NULL, 'Athletic')\
      ON DUPLICATE KEY UPDATE id_tag = id_tag;\
INSERT INTO tag (id_tag, label, logo, tag)\
      VALUES (3, 'Gastronomy', NULL, 'Gastronomy')\
      ON DUPLICATE KEY UPDATE id_tag = id_tag;\
INSERT INTO tag (id_tag, label, logo, tag)\
      VALUES (4, 'Nature Lovers', NULL, 'Nature Lovers')\
      ON DUPLICATE KEY UPDATE id_tag = id_tag;\
INSERT INTO tag (id_tag, label, logo, tag)\
      VALUES (5, 'Nightlife', NULL, 'Nightlife')\
      ON DUPLICATE KEY UPDATE id_tag = id_tag;\
INSERT INTO tag (id_tag, label, logo, tag)\
      VALUES (6, 'Adventurer', NULL, 'Adventurer')\
      ON DUPLICATE KEY UPDATE id_tag = id_tag;\
      "
db.query(sqlCommand, function (error, results, fields) {
if (error)
console.log(error) });
module.exports = db;
