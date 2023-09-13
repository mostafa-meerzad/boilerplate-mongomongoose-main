require("dotenv").config();

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to database"))
  .catch((error) => console.log(error));

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);

const arrayOfPeople = [
  {
    name: "John",
    age: 20,
    favoriteFoods: ["chocolate cake", "pizza"],
  },
  {
    name: "Mary",
    age: 25,
    favoriteFoods: ["beans", "rice", "eggplant"],
  },
  {
    name: "James",
    age: 30,
    favoriteFoods: ["cheese burger", "honey", "donut"],
  },
];

let personName = "Marry";

let food = "bean";

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Mostafa",
    age: 23,
    favoriteFoods: ["beans", "honey", "cake"],
  });

  person.save((err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: { $in: food } }, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.log();
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({"name":personName},{age:ageToSet}, {new:true} ,(err, updatedPerson)=>{
    if (err) return console.log(err)
    
    done(null , updatedPerson);

  })

};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, person)=>{
    if (err) return console.log(err)
    done(null , person);

  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, (err, person)=>{
    if(err) return console.log(err)
    done(null, person)
  })

};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:{$in:foodToSearch}}).sort("name").limit(2).select("-age").exec((err, data) =>{
    if (err) return console.log(err)
    done(null , data);
  } )

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
