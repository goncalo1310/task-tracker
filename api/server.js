const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
var bodyparser = require('body-parser');
const app = express();

//criar uma conexão à base de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tarefas'
});

app.use(cors({
    origin: '*'
})); 

app.use(bodyparser.urlencoded({
    extended: false
}));

app.use(bodyparser.json());

connection.connect();

//rota para o get
app.get('/tasks', (req, res) => {
    connection.query('SELECT * FROM tasks', (err, results) => {
        if (err){
            res.status(500).json({
                error: 'Erro ao obter os dados da base de dados'
            });
        }else{
            res.json(results);
        }
    });
});

//rota para o get por id
app.get('/tasks/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM tasks WHERE id = ?', id, (err, results) =>{
        if (err){
            res.status(500).json({
                error: 'Erro ao obter os dados da base de dados'
            });
        }else{
            res.json(results);
        }
    });
});

//rota para o post
app.post('/tasks', (req, res) =>{
    var data = req.body;
    console.log(req.body);
    connection.query('INSERT INTO tasks SET ?', data, (err, results) =>{
        if (err){
            res.status(500).json({
                error:  'Erro ao inserir os dados da base de dados'
            });
        } else {
            res.json(results);
        }
    });
});

//rota para o post apenas o reminder
app.put('/tasks/:id', (req, res) => {
    const data = req.body;
    const id = req.params.id;
    connection.query('UPDATE tasks SET ? WHERE id = ?', [data,id], (err, results) => {
        if (err) {
            res.status(500).json({
                error: 'Erro ao atualizar os dados da base de dados'
            });
        }else {
            res.json(results);
        }
    });
});

//rota para o delete
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.params);
    connection.query('DELETE FROM tasks WHERE id = ?', id, (err, results) => {
        if(err) {
            res.status(500).json({
                error: 'Erro ao deletar os dados da base de dados'
            });
        } else {
            res.json(results);
        }
    });
});

app.listen(5000, () => {
    console.log('O servidor foi iniciado na porta 5000');
});