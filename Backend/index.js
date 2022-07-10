require('dotenv').config();

const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const middlewareInstance = require('./Middleware/textTranslator')
const fs = require('fs');
const { log } = require('console');

app.use(cors())
app.use(bodyParser.json())

app.listen
    (
        process.env.PORT, () => console.log(`i'm listening on port ${process.env.PORT}`)
    );

app.post('/get/translation', async (request, response) =>
{
    try
    {
        response.json(await middlewareInstance.translator(request.body.text, request.body.language));
        console.log("Translation returned succesdsfully!")
    } catch (e)
    {
        console.log(e);
    }
})

app.get('/get/students', async (request, response) =>
{
    try
    {
        
        let data = fs.readFileSync('students.json');
        console.log("oi");
        let students = JSON.parse(data);
        response.json(students);
        console.log("students returned succesdsfully!")

    } catch (e)
    {
        console.log(e);
    }
})
