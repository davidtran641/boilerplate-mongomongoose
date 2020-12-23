require('dotenv').config();

let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let person = Person({name: 'person 1', age: 10});
  person.save(function (err, data) {
    done(err, data);
  })
};

var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.log(err);
    done(err, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    if (err) return console.log(err);
    done(err, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return console.log(err);
    done(err, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.log(err);
    done(err, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, data) => {
    if (err) return console.log(err);
    data.favoriteFoods.push(foodToAdd);
    data.save((err, data) => {
      if (err) return console.log(err);
      done(err, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, data) => {
    if (err) return console.log(err);
    done(err, data);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.log(err);
    done(err, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.deleteMany({name: nameToRemove}, (err, data) => {
    if (err) return console.log(err);
    done(err, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person
    .find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({age: 0})
    .exec(function (err, data) {
      if (err) return console.log(err);
      done(err, data);
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
