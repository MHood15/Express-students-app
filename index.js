const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const students = require('./students.json')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json())


app.get('/students', (req, res) => {
    //returns a list of all students
    let searchResults = req.query.search
    if(searchResults){
        res.send(students.filter(student => student['name'].includes(searchResults)))
    } else {
        res.send(students)
    }
})

app.get('/students/:studentId', (req, res) => {
    //returns details of a specific student by student id
    let id = req.params.studentId
    id -= 1
    res.send(students[id])
})

app.get('/grades/:studentId', (req, res) => {
    //returns all grades for a given student by student id
    let id = req.params.studentId
    id -= 1
    res.send(students[id].grades)
})

app.post('/grades', (req, res) => {
    //records a new grade, returns success status in JSON response
    let id = req.body.studentId
    let grade = req.body.grade
    let ans = ["Student ID: "+id, "Student name: "+students[id].name, "New grade: "+grade]
    res.send(ans)
    //doesn't actually store new grade - just a test of the use of POST
})

app.post('/register', (req, res) => {
    //creates a new user, returns success status in JSON response
    let id = students.length+1
    let name = req.body.name
    let grades = req.body.grades
    let ans =     {
        "id": id,
        "name": name,
        "grades": grades
    }
    res.send(ans)
    //doesn't actually store new student - just a test of the use of POST
})


const port = 3001
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))