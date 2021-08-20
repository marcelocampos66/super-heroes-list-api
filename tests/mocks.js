const { ObjectId } = require('mongodb');

const validAdminCredentials = {
  email: 'root@email.com',
  password: 'admin123',
}

const validUserCredentials = {
  email: 'magni.thorson@email.com',
  password: 'asgard123',
}

const invalidCredentials = {
  email: 'test@email.com',
  password: 'senhaquenaoexiste',
};

const validAdminUser = {
  name: 'admin',
  password: 'admin123',
  age: 99,
  email: 'root@email.com',
  role: 'admin',
  image: null,
};

const validUserToRegister = {
  name: 'Magni Thorson',
  password: 'asgard123',
  age: 30,
  email: 'magni.thorson@email.com',
};

const mockPageOfHeroes = [
  {
    _id: ObjectId('60e8cef2849ece5d484ff618'),
    name: 'Cyborg',
    powerstats: {
      intelligence: '75',
      strength: '53',
      speed: '42',
      durability: '85',
      power: '71',
      combat: '64'
    },
    biography: {
      'full-name': 'Victor Stone',
      'alter-egos': 'No alter egos found.',
      aliases: [Array],
      'place-of-birth': 'New York City, New York',
      'first-appearance': 'DC Comics Presents #26 (October, 1980)',
      publisher: 'DC Comics',
      alignment: 'good'
    },
    appearance: {
      gender: 'Male',
      race: 'Cyborg',
      height: [Array],
      weight: [Array],
      'eye-color': 'Brown',
      'hair-color': 'Black'
    },
    work: { occupation: 'Adventurer, Teen Titan', base: 'San Francisco' },
    connections: {
      'group-affiliation': 'Justice League; formerly Teen Titans, Titans, Titans East, New Teen Titans',
      relatives: 'Silas Stone (father), Elinore Stone (mother), Tucker Stone (grandfather), Maude Stone (grandmother)'
    },
    image: {
      url: 'https://www.superherodb.com/pictures2/portraits/10/100/1204.jpg'
    },
    overall: '65'
  },
  {
    _id: ObjectId('60e8cef2849ece5d484ff622'),
    name: 'Darkseid',
    powerstats: {
      intelligence: '88',
      strength: '100',
      speed: '83',
      durability: '100',
      power: '100',
      combat: '95'
    },
    biography: {
      'full-name': 'Uxas',
      'alter-egos': 'No alter egos found.',
      aliases: [Array],
      'place-of-birth': '-',
      'first-appearance': "Superman's Pal Jimmy Olsen #134 (November 1970)",
      publisher: 'DC Comics',
      alignment: 'bad'
    },
    appearance: {
      gender: 'Male',
      race: 'New God',
      height: [Array],
      weight: [Array],
      'eye-color': 'Red',
      'hair-color': 'No Hair'
    },
    work: { occupation: 'Dictator of Apokolips', base: '-' },
    connections: {
      'group-affiliation': 'New Gods of Apokolips(ruler), Secret Society of Supervillains',
      relatives: 'Zonuz (father), Izaya (brother), Avia (sister, deceased), Grail (daughter), Kalibak (son), Orion (son), Deathspawn (son), Scot (nephew/adopted son)'
    },
    image: {
      url: 'https://www.superherodb.com/pictures2/portraits/10/100/668.jpg'
    },
    overall: '94'
  },
  {
    _id: ObjectId('60e8cef2849ece5d484ff62b'),
    name: 'Deadpool',
    powerstats: {
      intelligence: '69',
      strength: '32',
      speed: '50',
      durability: '100',
      power: '100',
      combat: '100'
    },
    biography: {
      'full-name': 'Wade Wilson',
      'alter-egos': 'Evil Deadpool, Venompool',
      aliases: [Array],
      'place-of-birth': 'Canada',
      'first-appearance': 'New Mutants #98 (February, 1991)',
      publisher: 'Evil Deadpool',
      alignment: 'neutral'
    },
    appearance: {
      gender: 'Male',
      race: 'Mutant',
      height: [Array],
      weight: [Array],
      'eye-color': 'Brown',
      'hair-color': 'No Hair'
    },
    work: {
      occupation: 'Mercenary; former enforcer, government operative, sumo wrestler, soldier, assassin, anti-hero, others',
      base: 'Cavern-X, Sedona, Arizona, Mobile'
    },
    connections: {
      'group-affiliation': 'Thunderbolts (Strike Team), shares body with Agent Preston; formerly X-Force, Deadpool Corps, Agency X, S.H.I.E.L.D.; Code Red, Six Pack, One World Church, DP Inc., Weapon X, Weapon Plus, Heroes for Hire, Secret Defenders, Frightful Four, Team Deadpool, L',
      relatives: 'Thomas "Mickey" Wilson (father, deceased); Hailey Wilson (mother, deceased); Gretchen Wilson, Orksa (ex-wives); Evil Deadpool (clone); Widdle Wade (clone)'
    },
    image: {
      url: 'https://www.superherodb.com/pictures2/portraits/10/100/835.jpg'
    },
    overall: '75'
  },
  {
    _id: ObjectId('60e8cef2849ece5d484ff635'),
    name: 'Doctor Doom II',
    powerstats: {
      intelligence: 'null',
      strength: 'null',
      speed: 'null',
      durability: 'null',
      power: 'null',
      combat: 'null'
    },
    biography: {
      'full-name': 'Kristoff Vernard',
      'alter-egos': 'No alter egos found.',
      aliases: [Array],
      'place-of-birth': 'Doomstadt, Latveria',
      'first-appearance': 'Fantastic Four #247 (1982, as Kristoff), Fantastic Four #278 (1985, as Doctor Doom)',
      publisher: 'Marvel Comics',
      alignment: 'bad'
    },
    appearance: {
      gender: 'Male',
      race: 'null',
      height: [Array],
      weight: [Array],
      'eye-color': 'Brown',
      'hair-color': 'Brown'
    },
    work: { occupation: '-', base: 'Former monarch, would-be conqueror' },
    connections: {
      'group-affiliation': '-',
      relatives: 'unnamed mother (deceased), Mister Fantastic (alleged half-brother), Valeria Richards (alleged niece), Victor von Doom (aka Doctor Doom, adopted father)'
    },
    image: {
      url: 'https://www.superherodb.com/pictures2/portraits/10/100/1018.jpg'
    },
    overall: 'NaN'
  },
  {
    _id: ObjectId('60e8cef2849ece5d484ff651'),
    name: 'Falcon',
    powerstats: {
      intelligence: '38',
      strength: '13',
      speed: '50',
      durability: '28',
      power: '22',
      combat: '64'
    },
    biography: {
      'full-name': 'Sam Wilson',
      'alter-egos': 'No alter egos found.',
      aliases: [Array],
      'place-of-birth': 'New York, New York',
      'first-appearance': 'Captain America #117 (September, 1969)',
      publisher: 'Marvel Comics',
      alignment: 'good'
    },
    appearance: {
      gender: 'Male',
      race: 'Human',
      height: [Array],
      weight: [Array],
      'eye-color': 'Brown',
      'hair-color': 'Black'
    },
    work: {
      occupation: 'Crimefighter, (former) freelance artist',
      base: 'New York, New York; formerly Avengers Mansion, New York City, New York; S.H.I.E.L.D. Helicarrier.'
    },
    connections: {
      'group-affiliation': 'Mighty Avengers, Avengers, S.H.I.E.L.D.; partner of Redwing; formerly Heroes For Hire, partner of Captain America, Secret Avengers, S.H.I.E.L.D. Super-Agents (leader), Defenders, ally of Secret Warriors , Defenders for a Day',
      relatives: 'Paul Wilson (father, deceased); Darlene Wilson (mother, deceased); Sarah Wilson (sister), Gideon Wilson (brother); Jim Wilson (nephew, deceased); Jody Casper (nephew)'
    },
    image: {
      url: 'https://www.superherodb.com/pictures2/portraits/10/100/56.jpg'
    },
    overall: '36'
  },
  {
    _id: ObjectId('60e8cef2849ece5d484ff654'),
    name: 'Feral',
    powerstats: {
      intelligence: '38',
      strength: '28',
      speed: '45',
      durability: '28',
      power: '27',
      combat: '70'
    },
    biography: {
      'full-name': 'Maria Callasantos',
      'alter-egos': 'No alter egos found.',
      aliases: [Array],
      'place-of-birth': 'Place of birth unknown',
      'first-appearance': 'NEW MUTANTS #99',
      publisher: 'Marvel Comics',
      alignment: 'good'
    },
    appearance: {
      gender: '-',
      race: 'null',
      height: [Array],
      weight: [Array],
      'eye-color': 'Yellow (without irises)',
      'hair-color': 'Orange / White'
    },
    work: {
      occupation: 'Formerly Adventurer, Terrorist',
      base: 'Base of operations unknown'
    },
    connections: {
      'group-affiliation': 'Formerly Morlocks, X-Force, Mutant Liberation Front',
      relatives: 'Mr. Callasantos (father, first name unrevealed, deceased), Marcella Callasantos (mother, deceased), Lucia Callasantos (Thornn, sister), Matteo Callasantos (brother, deceased), Carolina Callasantos (sister, deceased)'
    },
    image: {
      url: 'https://www.superherodb.com/pictures2/portraits/10/100/57.jpg'
    },
    overall: '39'
  },
  {
    _id: '60e8cef2849ece5d484ff659',
    name: 'Firestar',
    powerstats: {
      intelligence: '50',
      strength: '8',
      speed: '54',
      durability: '55',
      power: '71',
      combat: '32'
    },
    biography: {
      'full-name': 'Angelica Jones',
      'alter-egos': 'No alter egos found.',
      aliases: [Array],
      'place-of-birth': 'Place of birth unknown',
      'first-appearance': 'Uncanny X-Men #193 (May, 1985)',
      publisher: 'Marvel Comics',
      alignment: 'good'
    },
    appearance: {
      gender: 'Female',
      race: 'Mutant',
      height: [Array],
      weight: [Array],
      'eye-color': 'Green',
      'hair-color': 'Red'
    },
    work: {
      occupation: 'Student',
      base: 'New Warriors Crash Pad, New York City, New York State; Avengers Mansion, New York City, New York State; and formerly Massachusetts Academy, Snow Valley, Massachusetts'
    },
    connections: {
      'group-affiliation': 'New Warriors Reservist, Avengers Reservist, and Former Hellion and student of the White Queen',
      relatives: 'Bartholomew Jones (father), Nana (grandmother)'
    },
    image: {
      url: 'https://www.superherodb.com/pictures2/portraits/10/100/60.jpg'
    },
    overall: '45'
  },
  {
    _id: ObjectId('60e8cef2849ece5d484ff65c'),
    name: 'Fixer',
    powerstats: {
      intelligence: 'null',
      strength: 'null',
      speed: 'null',
      durability: 'null',
      power: 'null',
      combat: 'null'
    },
    biography: {
      'full-name': 'Paul Norbert Ebersol',
      'alter-egos': 'No alter egos found.',
      aliases: [Array],
      'place-of-birth': 'Dayton, Ohio',
      'first-appearance': '(as Fixer) STRANGE TALES #141',
      publisher: 'Marvel Comics',
      alignment: 'bad'
    },
    appearance: {
      gender: '-',
      race: 'null',
      height: [Array],
      weight: [Array],
      'eye-color': 'Red',
      'hair-color': 'No Hair'
    },
    work: { occupation: 'Criminal inventor', base: 'Mount Charteris' },
    connections: {
      'group-affiliation': 'formerly Thunderbolts, Redeemers',
      relatives: 'No known relatives'
    },
    image: {
      url: 'https://www.superherodb.com/pictures2/portraits/10/100/9.jpg'
    },
    overall: 'NaN'
  },
  {
    _id: ObjectId('60e8cef2849ece5d484ff588'),
    name: 'Atom',
    powerstats: {
      intelligence: 'null',
      strength: 'null',
      speed: 'null',
      durability: 'null',
      power: 'null',
      combat: 'null'
    },
    biography: {
      'full-name': 'Albert Pratt',
      'alter-egos': 'No alter egos found.',
      aliases: [Array],
      'place-of-birth': '-',
      'first-appearance': 'All American Comics #19',
      publisher: 'DC Comics',
      alignment: 'good'
    },
    appearance: {
      gender: 'Male',
      race: 'null',
      height: [Array],
      weight: [Array],
      'eye-color': 'Blue',
      'hair-color': 'Red'
    },
    work: {
      occupation: 'Adventurer, Retired Professor of Nuclear Physics',
      base: 'GBS Building, Gotham City (former) Calvin College on Earth-Two'
    },
    connections: {
      'group-affiliation': 'formerly Justice Society of America; formerly All-Star Squadron',
      relatives: 'Mary James (wife, deceased), Grant Albert Emerson (Damage, son), Albert Rothstein (aka Nuklon / Atom-Smasher, godson)'
    },
    image: {
      url: 'https://www.superherodb.com/pictures2/portraits/10/100/934.jpg'
    },
    overall: 'NaN'
  },
  {
    _id: ObjectId('60e8cef2849ece5d484ff594'),
    name: 'Bantam',
    powerstats: {
      intelligence: '25',
      strength: '53',
      speed: '23',
      durability: '54',
      power: '21',
      combat: '56'
    },
    biography: {
      'full-name': 'Roberto Velasquez',
      'alter-egos': 'No alter egos found.',
      aliases: [Array],
      'place-of-birth': '-',
      'first-appearance': 'Civil War: Front Line #3 (September, 2006)',
      publisher: 'Marvel Comics',
      alignment: 'good'
    },
    appearance: {
      gender: 'Male',
      race: 'null',
      height: [Array],
      weight: [Array],
      'eye-color': 'Brown',
      'hair-color': 'Black'
    },
    work: {
      occupation: 'Adventurer, boxing trainer, former boxer',
      base: '-'
    },
    connections: {
      'group-affiliation': 'Captain America, Pro-Registration forces',
      relatives: '-'
    },
    image: {
      url: 'https://www.superherodb.com/pictures2/portraits/10/100/229.jpg'
    },
    overall: '39'
  },
  {
    _id: ObjectId('60e8cef2849ece5d484ff59f'),
    name: 'Batwoman V',
    powerstats: {
      intelligence: '81',
      strength: '8',
      speed: '29',
      durability: '25',
      power: '27',
      combat: '80'
    },
    biography: {
      'full-name': 'Katherine Rebecca Kane',
      'alter-egos': 'No alter egos found.',
      aliases: [Array],
      'place-of-birth': '-',
      'first-appearance': '52 #7 (June, 2006)',
      publisher: 'DC Comics',
      alignment: 'good'
    },
    appearance: {
      gender: 'Female',
      race: 'Human',
      height: [Array],
      weight: [Array],
      'eye-color': 'Green',
      'hair-color': 'Red'
    },
    work: { occupation: '-', base: 'Gotham City' },
    connections: {
      'group-affiliation': 'Batman Family (unofficially), D.E.O, Unknowns',
      relatives: 'Jacob Kane (father), Gabi Kane (mother; deceased), Beth Kane (twin sister), Mary Elizabeth "Bette" Kane (cousin), Catherine Hamilton-Kane (stepmother), Philip Kane (uncle), Kane Family'
    },
    image: {
      url: 'https://www.superherodb.com/pictures2/portraits/10/100/10234.jpg'
    },
    overall: '42'
  },
  {
    _id: ObjectId('60e8cef2849ece5d484ff5a7'),
    name: 'Big Barda',
    powerstats: {
      intelligence: '88',
      strength: '100',
      speed: '79',
      durability: '100',
      power: '100',
      combat: '100'
    },
    biography: {
      'full-name': 'Barda Free',
      'alter-egos': 'No alter egos found.',
      aliases: [Array],
      'place-of-birth': '-',
      'first-appearance': 'Mister Miracle (Volume 1) #4',
      publisher: 'DC Comics',
      alignment: 'bad'
    },
    appearance: {
      gender: 'Female',
      race: 'New God',
      height: [Array],
      weight: [Array],
      'eye-color': 'Blue',
      'hair-color': 'Black'
    },
    work: {
      occupation: '-',
      base: 'Gotham City, New Genesis, formerly Apokolips'
    },
    connections: {
      'group-affiliation': 'Apocalypse, New Gods, Birds of Prey, formerly Female Furies, formerly Justice League of America',
      relatives: 'Big Breeda (mother), Scott Free (Mister Miricle, husband), Highfather Izaya (father-in-law, deceased)'
    },
    image: {
      url: 'https://www.superherodb.com/pictures2/portraits/10/100/1169.jpg'
    },
    overall: '95'
  }
]

module.exports = {
  validAdminCredentials,
  validAdminUser,
  mockPageOfHeroes,
  invalidCredentials,
};
