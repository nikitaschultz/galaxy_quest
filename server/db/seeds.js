use galaxy_quest;
db.dropDatabase();

db.profiles.insertMany([
  {
    name: "Sully",
    avatar: "avatar3",
    starPoints: 2,
    completedGames: [],
    starCoordinates: []
  },
  {
    name: "Boo",
    avatar: "avatar4",
    starPoints: 7,
    completedGames: [],
    starCoordinates: []
  }
])

db.admin.insertOne({
  password: "password"
})

db.planets.insertMany([
  {
    name: "numbers",
    title: "Numbers Planet",
    games: [
      {
        name: "Count the Ducks",
        description: "Since a star fell to Earth, ducks have been popping up everywhere! Can you help us count them ?",
        type: "NumbersGame",
        dataset: null
      }
    ]
  },
  {
    name: "geography",
    title: "Geography Planet",
    games: [
      {
        name: "Continents of the World",
        description: "A star has fallen to one of Earth's continents!  Help them find it by selecting the right continent on a map!",
        type: "ContinentSelect",
        dataSet: null
      },
      {
        name: "World Landmarks",
        description: "Take a trip around planet Earth's most amazing landmarks!  Put a landmark's picture back together",
        type: "PicturePuzzle",
        dataSet: "landmarks"
      }
    ]
  },
  {
    name: "animals",
    title: "Animals Planet",
    games: [
      {
        name: "Memory Match",
        description: "Turn over pictures of animals to find their match.",
        type: "MemoryMatch",
        dataSet: "animals_match"
      },{
        name: "Animals of the Planet",
        description: "Without star-light, the animals of Earth are hard to see. Can you help find them?",
        type: "AnimalGame",
        dataSet: "Animals"
      }
    ]
  }
])


// dataset stroed below, to be refactored in future

db.landmarks.insertMany([
  {
    name: "Eiffel Tower",
    location: "Paris, France",
    facts:[
      "It was built for the 1889 World Fair!",
      "It was built to celebrate the 100th anniversary of the French Revolution!",
      "It was the tallest structure in the world until 1930!",
      "Cold weather can shrink the tower by up to six inches!",
      "It gets a fresh coat of paint every seven years!"
    ],
    image: "eiffeltower"
  },
  {
    name: "Great Wall of China",
    location: "China",
    facts: [
      "It's the longest human built structure in the world!",
      "It spans across 15 regions in north China!",
      "1/3 of the walls have disappeared!",
      "It took 2,500 years to build!"
    ],
    image: "greatwall"
  },
  {
    name: "Leaning Tower of Pisa",
    location: "Pisa, Italy",
    facts: [
      "At one point, the tower's lean switched directions!",
      "The tower took 200 years to build!",
      "The lean was the result of a design flaw!",
      "The tower took 344 years to build!"
    ],
    image: "leaningtower"
  },
  {
    name: "The Great Sphinx",
    location: "Giza, Egypt",
    facts: [
      "No one knows how the Great Sphinx lost its nose!",
      "The Great Sphinx faces the sunrise and guards the pyramid tombs of Giza!",
      "The structure is huge!  Its eyes are 6 feet tall!",
      "A Sphinx is a mythological creature wiht the boyd of a lion and the head of a person!"
    ],
    image: "sphinx"
  },
  {
    name: "Sydney Opera House",
    location: "Sydney, Australia",
    facts: [
      "Paul Robeson sang Old Man River to the construction workers before the whole structure was finished!",
      "The grand organ in the Concert Hall is the largest mechanical organ in the world!",
      "More than 10 million people visit the Opera House every year!",
      "The temperatures inside the house must stay at 22.5 degrees so the instruments stay perfectly tuned!"
    ],
    image: "operahouse"
  },
  {
    name: "Statue of Liberty",
    location: "Liberty Island, USA",
    facts: [
      "The statue was actaully a gift from France in 1886!",
      "When it was first built it was the tallest iron structure ever built!",
      "The torch can move 5 inches in high winds!",
      "The head was installed 2 feet off centre!",
      "The statue is hit by around 600 bolts of lightning every year!"
    ],
    image: "statueofliberty"
  },
  {
    name: "Taj Mahal",
    location: "Agra, India",
    facts: [
      "The name 'Taj Mahal' means 'crown of palaces'!",
      "The structure is built of white marble!",
      "It was originally built as the final resting place for the emperor's third wife!",
      "Over 1000 elephants were used to transport heavy materials and supplies for construction!"
    ],
    image: "tajmahal"
  },
  {
    name: "Machu Picchu",
    location: "Peru",
    facts: [
      "The stones were cut specially to fit together without any mortar!",
      "The heavy rocks were pushed up the mountain by hand!",
      "The name 'Machu Picchu' means 'Old Mountain'!",
      "The city has survived many earthquakes!",
      "60% of the construction exists underneath the ground!"
    ],
    image: "machupicchu"
  },
  {
    name: "Edinburgh Castle",
    location: "Edinburgh, Scotland",
    facts: [
      "The castle was built on top of a dormant volcano!",
      "The castle has faced 23 attempted sieges!",
      "The chapel in the castle is the oldest building in Scotland!",
      "The Scottish crown jewels were lost in the castle for years!"
    ],
    image: "edinburghcastle"
  },
  {
    name: "Big Ben",
    location: "London, England",
    facts: [
      "Big Ben is actually the name of the Great Bell inside the Elixabeth Tower!",
      "The clock is wound three times a week to make sure it works correctly!",
      "Underneath each face of the clock are the words, 'O Lord, keep safe our Queen Victoria the First', in latin!",
      "Each clock face's minute hand is 14 feet long!"
    ],
    image: "bigben"
  }
])

db.animals.insertMany([
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
])

db.animalsmatch.insertMany([
  {
    name: "Monkey",
    image: "monkey",
    facts: [
      "Some monkeys live on the ground, while others live in trees!",
      "Groups of monkeys are known as a 'tribe', 'troop' or 'mission'!",
      "Different monkey species eat a variety of foods, such as fruit, insects, flowers, leaves and reptiles."
    ]
  },
  {
    name: "Rabbit",
    image: "rabbit",
    facts: [
      "A baby rabbit is called a kit, a female is called a doe and a male is called a buck!",
      "A rabbit's teeth never stop growing!",
      "Rabbits perform an athletic leap, known as a 'binky', when they're happy — performing twists and kicks in mid air!"
    ]
  },
  {
    name: "Cow",
    image: "cow",
    facts: [
      "Cows are sacred in India!",
      "Cows are red/greed colorblind!",
      "Cows have an excellent sense of smell and can detect odors up to six miles away!"
    ]
  },
  {
    name: "Parrot",
    image: "parrot",
    facts: [
      "Parrots are believed to be one of the most intelligent bird species!",
      "Some species of parrot can imitate human voices!",
      "Some parrot species can live for over 80 years!"
    ]
  },
  {
    name: "Squirrel",
    image: "squirrel",
    facts: [
      "Squirrels have four front teeth which never stop growing throughout their lives!",
      "Squirrels can find food buried beneath a foot of snow!",
      "Squirrels sometimes pretend to bury a nut to throw off potential thieves!"
    ]
  },
  {
    name: "Tiger",
    image: "tiger",
    facts: [
      "Tigers love to swim and play in water!",
      "Tigers are the largest wild cats in the world!",
      "No two tigers have the same stripes!"
    ]
  },
  {
    name: "Kangaroo",
    image: "kangaroo",
    facts: [
      "Kangaroos can't walk backwards!",
      "Kangaroos can jump up to three times their own height!",
      "There are more kangaroos in Australia than there are Australian people!"
    ]
  }

])
