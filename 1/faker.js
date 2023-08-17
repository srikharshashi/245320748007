const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Train = require('./models/Train'); 

const connectionString = 'mongodb+srv://root:passwordhehe@cluster0.glw1wym.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(connectionString);

const numberOfTrains = 10;

const generateFakeTrain = () => ({
  trainName: faker.company.buzzNoun(),
  trainNumber: faker.datatype.uuid(),
  departureTime: faker.date.future(),
  seatsAvailableAC: faker.number.int({ min: 20, max: 100 }),
  seatsAvailableSleeper: faker.number.int({ min: 50, max: 200 }),
  priceAC: faker.number.int({ min: 500, max: 2000 }),
  priceSleeper: faker.number.int({ min: 300, max: 1500 })
});

(async () => {
  try {
    const trains = [];

    for (let i = 0; i < numberOfTrains; i++) {
      trains.push(generateFakeTrain());
    }

    await Train.insertMany(trains);
    console.log(`${numberOfTrains} fake trains inserted successfully.`);
  } catch (error) {
    console.error('Error generating fake data:', error);
  } finally {
    mongoose.disconnect();
  }
})();
