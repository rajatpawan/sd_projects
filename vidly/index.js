const express = require('express');
const app = express();
const Joi = require('joi');


var port = process.env.port || 3000;

app.listen(port, function () {
    console.log('listening on port ' + port + '!');
});

const genres = [
    {id: 1, name:"Action"},
]

app.get('/genres',(req, res) => {
    res.send(genres);
} )

app.post('/genres', (req, res) => {
    const {error} = validateGenre(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }


    const genre = {
        id: genres.length+1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

function validateGenre(genre){
    const schema = {
        name : Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

app.delete('/genre/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) res.status(404).send("genre with given id is not present")

    const index = genres.findIndex(genre);
    genres.splice(index, 1);
    
    res.send(genre);
})