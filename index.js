const express = require('express');
const morgan = require('morgan');   
const cors = require('cors');
const Person = require('./mongotest')

const app = express();

app.use(express.json());
app.use(express.static('dist'));
app.use(cors());

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'});
}

const errorHandler = (error, req, res, next) => {
    console.error(error.message);
    if(error.name === 'CastError'){
        return res.status(400).send({error: 'malformatted id'});
    }
    if(error.name === 'ValidationError'){
        return res.status(400).send({error: error.message});
    }
    next(error);
}

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.status(200).json(persons);
    })
});

app.get('/info', (req, res) => {
    Person.find({}).then(persons => {
        res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`);
    })
}); 

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        if(person){
            res.json(person);
        }else{
            res.status(404).end();
        }
    }).catch(error => next(error))
});

app.delete('/api/persons/:id', (req, res, next) => {  
    Person.findByIdAndDelete(req.params.id).then(result => {
        res.status(204).end();  
    }).catch(error => next(error))
});

app.post('/api/persons', (req, res, next) => {
    const personInfo = req.body;
    if(!personInfo.name || !personInfo.number){
        res.status(400).json({
            error: 'name or number is missing'
        });
    }

    Person.findOne({name: personInfo.name}).then(existingPerson => {    
        if(existingPerson){ 
            res.status(400).json({
            error: 'name must be unique'
            });
        }
    }).catch(error => next(error))

    const person = {
        name: personInfo.name,
        number: personInfo.number
    };

    Person.create(person).then(savedPerson => {
        res.json(savedPerson);
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const personInfo = req.body;
    const person = {
        name: personInfo.name,
        number: personInfo.number
    };

    Person.findByIdAndUpdate(req.params.id, person, {new: true}).then(updatedPerson => {
        res.json(updatedPerson);
    }).catch(error => next(error))
});

app.use(errorHandler);
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})