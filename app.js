const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');


app.use((req, res, next) => {
    console.log(`Request ${req.method} on path ${req.url} ${new Date()}`);
    next();
  });

  
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const students = [];

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Home</title>
      </head>
      <body>
        <p>HOME</p>
      </body>
    </html>
  `);
});


app.post('/student', (req, res) => {
    const { imie, nazwisko, kierunek } = req.body;
    students.push({ imie, nazwisko, kierunek });
    res.send(`
      <html>
        <head>
          <title>Student</title>
        </head>
        <body>
          <p>Hello, ${imie} ${nazwisko} on ${kierunek} studies!</p>
        </body>
      </html>
    `);
});

app.get('/student', (req, res) => {
    res.redirect('/add-student');
  });


app.get('/add-student', (req, res) => {
    res.send(`
    <html>
      <head>
        <title>Add-student</title>
      </head>
      <body>
        <form action="/student" method="post">
          <label for="imie">Imie:</label><br>
          <input type="text" id="imie" name="imie"><br>
          <label for="nazwisko">Nazwisko:</label><br>
          <input type="text" id="nazwisko" name="nazwisko"><br>
          <label for="kierunek">Kierunek:</label><br>
          <input type="text" id="kierunek" name="kierunek"><br><br>
          <button type="submit">Dodaj</button>
        </form>
      </body>
    </html>
  `);
});

app.get('/users', (req, res) => {
    const Lista = students.map(student => `<p>${student.imie} ${student.nazwisko} - ${student.kierunek}</p>`).join('');
    res.send(`
      <html>
        <head>
          <title>Users</title>
        </head>
        <body>
          <ul>${Lista}</ul>
        </body>
      </html>
    `);
});

app.listen(PORT, () => {
  console.log(`Serwer nasłuchuje na ${PORT}`);
});