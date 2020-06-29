const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('galaxy_quest');
    const profilesCollection = db.collection('profiles');
    const profilesRouter = createRouter(profilesCollection);
    app.use('/api/profiles', profilesRouter);
    const planetsCollection = db.collection('planets');
    const planetsRouter = createRouter(planetsCollection);
    app.use('/api/planets', planetsRouter)
    const landmarksCollection = db.collection('landmarks');
    const landmarksRouter = createRouter(landmarksCollection);
    app.use('/api/landmarks', landmarksRouter)
    const animalsCollection = db.collection('animals');
    const animalsRouter = createRouter(animalsCollection);
    app.use('/api/animals', animalsRouter)
  })
  .catch(console.err);

app.listen(3000, function(){
  console.log('Listening on port 3000');
})
