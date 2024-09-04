const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://sthasaurav57:${password}@cluster0.kdr0j.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB');
    
    if (name && number) {
      const person = new Person({
        name, 
        number,
      });

      return person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`);
      });
    } else {
      return Person.find({}).then(result => {
        console.log("phonebook:");
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`);
        });
      });
    }
  })
  .catch(err => {
    console.error('error:', err.message);
  })
  .finally(() => {
    mongoose.connection.close();
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);
