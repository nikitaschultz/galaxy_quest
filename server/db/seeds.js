use galaxy_quest;
db.dropDatabase();

db.profiles.insertMany([
  {
    name: "Sully",
    avatar: "avatar3",
    starPoints: 2,
    completedGames: []
  },
  {
    name: "Boo",
    avatar: "avatar4",
    starPoints: 7,
    completedGames: []
  }
])
