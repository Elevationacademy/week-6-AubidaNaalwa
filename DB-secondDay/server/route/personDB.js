const mongoose = require('mongoose');
const express = require('express')
const personRouter = express.Router()
mongoose.connect('mongodb://localhost/peopleDB', { useNewUrlParser: true, useUnifiedTopology: true})

const Schema = mongoose.Schema

const personSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number
})

const Person = mongoose.model('person', personSchema)

personRouter.post(`/person`,function(req,res){
    const person = req.body
    const personToSave = new Person({firstName : person.firstName, lastName:person.lastName,   age: person.age})
    personToSave.save()
    res.end()
})

personRouter.put(`/person/:id`,function(req,res){
    const person = req.body
    const id = req.params.id
    
    
    Person.findByIdAndUpdate(id, { age: parseInt(person.age) }, {new :true}, function (err, person) {
        console.log(person)
        res.end()
    })
})


personRouter.delete("/apocalypse",function(req,res){
    Person.remove({}, function (err, person) {
        res.end()
    })
})


personRouter.get('/',function(req,res){
    Person.find({},function(err,people){
        res.send(people)
    })
})

module.exports = personRouter
