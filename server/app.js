const express = require('express');
const app = express();
const port = 3003;
const cors = require('cors');
app.use(cors());
const mysql = require('mysql');
const md5 = require('js-md5');
const uuid = require('uuid');
app.use(express.json({ limit: '50mb' }));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'exam',
});

const doAuth = function (req, res, next) {
  if (0 === req.url.indexOf('/admin')) {
    // admin
    const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
    con.query(sql, [req.headers['authorization'] || ''], (err, results) => {
      if (err) throw err;
      if (!results.length || results[0].role !== 'admin') {
        res.status(401).send({});
        req.connection.destroy();
      } else {
        next();
      }
    });
  } else if (
    0 === req.url.indexOf('/login-check') ||
    0 === req.url.indexOf('/login') ||
    0 === req.url.indexOf('/')
  ) {
    next();
  } else {
    // front
    const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
    con.query(sql, [req.headers['authorization'] || ''], (err, results) => {
      if (err) throw err;
      if (!results.length) {
        res.status(401).send({});
        req.connection.destroy();
      } else {
        next();
      }
    });
  }
};
app.use(doAuth);

// AUTH
app.get('/login-check', (req, res) => {
  let sql;
  let requests;
  if (req.query.role === 'admin') {
    sql = `
        SELECT
        name
        FROM users
        WHERE session = ? AND role = ?
        `;
    requests = [req.headers['authorization'] || '', req.query.role];
  } else {
    sql = `
          SELECT
          name
          FROM users
          WHERE session = ?
          `;
    requests = [req.headers['authorization'] || ''];
  }
  con.query(sql, requests, (err, result) => {
    if (err) throw err;
    if (!result.length) {
      res.send({ msg: 'error' });
    } else {
      res.send({ msg: 'ok' });
    }
  });
});

app.post('/login', (req, res) => {
  const key = uuid.v4();
  const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND pass = ?
  `;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    if (!result.affectedRows) {
      res.send({ msg: 'error', key: '' });
    } else {
      res.send({ msg: 'ok', key });
    }
  });
});

///////////////////create service////////////////////

app.post('/admin/create-service', (req, res) => {
  const sql = `
    INSERT INTO services
    (title, city)
    VALUES (?, ?)
    `;
  con.query(sql, [req.body.title, req.body.city], (err, result) => {
    if (err) throw err;
    res.send({
      result,
      // msg: { text: 'OK, new Cat was created', type: 'success' },
    });
  });
});

///////////////////read services/////////////////////

app.get('/admin/services', (req, res) => {
  // const sql = `
  // SELECT
  // t.title, t.id, COUNT(c.id) AS total
  // FROM  clothes AS c
  // RIGHT JOIN type AS t
  // ON c.type_id = t.id
  // GROUP BY t.id
  //   `;
  const sql = `
  SELECT
  *
  FROM  SERVICES
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//////////////////////edit services/////////////////////
app.put('/admin/services/:id', (req, res) => {
  const sql = `
  UPDATE services
  SET title = ?, city = ?
  WHERE id = ?
  `;
  con.query(
    sql,
    [req.body.title, req.body.city, req.params.id],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});
//////////////////////delete services/////////////////////////
app.delete('/admin/services/:id', (req, res) => {
  const sql = `
  DELETE FROM services
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

///////////////////read masters/////////////////////
app.get('/admin/masters', (req, res) => {
  const sql = `
  SELECT
  m.name, m.surname, m.specialization, m.photo, m.id, m.service_id
  FROM  masters AS m
  RIGHT JOIN services AS s
  ON m.service_id = s.id
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

///create master

app.post('/admin/masters', (req, res) => {
  const sql = `
    INSERT INTO masters
    (name, surname, specialization, service_id, photo)
    VALUES (?, ?, ?, ?, ?)
    `;
  con.query(
    sql,
    [
      req.body.name,
      req.body.surname,
      req.body.specialization,
      req.body.service,
      req.body.photo,
    ],
    (err, result) => {
      if (err) throw err;
      res.send({
        result,
        // msg: { text: 'OK, new Cat was created', type: 'success' },
      });
    }
  );
});

//////////////////////edit masters/////////////////////
app.put('/admin/masters/:id', (req, res) => {
  const sql = `
  UPDATE masters
  SET name = ?, surname = ?, specialization =?, service_id=?, photo=?
  WHERE id = ?
  `;
  con.query(
    sql,
    [
      req.body.name,
      req.body.surname,
      req.body.specialization,
      req.body.service_id,
      req.body.photo,
      req.params.id,
    ],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});
//////////////////////delete masters/////////////////////////
app.delete('/admin/masters/:id', (req, res) => {
  const sql = `
  DELETE FROM masters
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

////////////////////////FRONT///////////////
//////////////////////create user////////////////////

app.post('/users', (req, res) => {
  const key = uuid.v4();
  const sql = `
    INSERT INTO users
    (name, pass, session)
    VALUES (?, ?, ?)
    `;
  con.query(sql, [req.body.name, md5(req.body.pass), key], (err, result) => {
    if (err) throw err;
    res.send({
      result,
      // msg: { text: 'OK, new Cat was created', type: 'success' },
    });
  });
});

///////////////////read masters/////////////////////
app.get('/masters', (req, res) => {
  const sql = `
  SELECT
  m.name, m.surname, m.specialization, m.photo, m.id, m.service_id, s.title, s.city
  FROM  masters AS m
  LEFT JOIN services AS s
  ON m.service_id = s.id
  GROUP BY m.id
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// read services

app.get('/services', (req, res) => {
  const sql = `
  SELECT
  *
  FROM  SERVICES
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
app.listen(port, () => {
  console.log(`Egzaminą laikom ant ${port} porto.`);
});
