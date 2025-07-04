require('dotenv').config();
const mongoose = require('mongoose');
const {Schema, model} = mongoose;
mongoose.connect('mongodb://localhost', { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
})

let Person = model('Person', personSchema);

const createAndSavePerson = (done) => {
  const william = new Person({
    name: "William Boeira",
    age: 18,
    favoriteFoods: ["Bolo de Whatsapp", "Pizza de chocolate com molho verde"]
  });
  william.save(function(err, data){
    if (err) return console.error(err);
    done(null, data);
  });
};

const arrayOfPeople = [
  {
    name: "John Doe",
    age: 27,
    favoriteFoods: ["Pizza do Roblox", "Pastel de Clickbait"]
  },
  {
    name: "Sigma Boy",
    age: 13,
    favoriteFoods: ["Carne crua", "Alface com azeite"]
  }
]

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, function(err, people){
      done(null, people);
    })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, personFound){
    done(null, personFound);
  })
};

const findOneByFood = (foodName, done) => {
  Person.findOne({favoriteFoods: foodName}, function(err, foodFound){
    done(null, foodFound);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, data){
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, function(err, person){
    person.favoriteFoods.push(foodToAdd);
    person.save(function(err, data){
      done(null, data);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, data){
    done(null, data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId, function(err, data){
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, response){
    done(null, response);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  const query = Person.find({favoriteFoods: [foodToSearch]}).sort().limit(2).select("-age");
  query.exec(function(error, data) {
    done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
