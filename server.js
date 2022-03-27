const express = require('express')
const app = express()

app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

let globalID = 2022

const todos = []

console.log(JSON.stringify(todos))

app.get('/', (req, res) => {
    res.send("welcome to todo server");
})

app.get('/api/get-todos', (req, res) => {
    console.log("client-request reached at get")
    res.send({todolist: todos});
})

app.post('/api/create-todos', (req, res, next) => {
    console.log("client-request reached at post")
    let val = req.body.todo
    globalID++
    const todo = {id:globalID, value: val, isDone: false}
    todos.push(todo)
    res.json({status: 'ok'})
    console.log(todos)
})

app.put('/api/update-status', (req, res, next) => {
    console.log("client-request reached at patch1")
    const id = req.body.id
    const index = todos.findIndex(todo => todo.id === id)
    if(index !== -1) {
        const cStatus = todos[index].isDone
        todos[index].isDone = !cStatus
        res.json({status:'ok'})
    } else {
        res.json({status: 'Not Found'})
    }
})

app.put('/api/update-todo', (req, res, next) => {
    console.log("client-request reached at patch2")
    const id = req.body.id
    const value = req.body.value
    const index = todos.findIndex(todo => todo.id === id)
    if(index !== -1) {
        todos[index].value = value
        res.json({status:'ok'})
    } else {
        res.json({status: 'Not Found'})
    }
})

app.delete('/api/remove-todo', (req, res, next) => {
    console.log("client-request reached at delete")
    const id = req.body.id
    const index = todos.findIndex(todo => todo.id === id)
    if(index !== -1) {
        todos.splice(index, 1)
        res.json({status:'ok'})
    } else {
        res.json({status: 'Not Found'})
    }
})

app.listen(5500, () => {
    console.log('server started at 5500')
})


