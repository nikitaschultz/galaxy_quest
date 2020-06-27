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

db.planets.insertMany([
  {
    name: "numbers",
    games: []
  },
  {
    name: "geography",
    games: []
  },
  {
    name: "animals",
    games: []
  }
])

db.games.insertMany([
  { animals: [
    {
      name: "Donkey",
    },
    {
      name: "Goat"
    },
    {
      name: "Goose"
    },
    {
      name: "Horse"
    },
    {
      name: "Pig"
    },
    {
      name: "Sheep"
    }
  ]},
  {tester: "test"},
  {tester2: "alsoatest"}

])
