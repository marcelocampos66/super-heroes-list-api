const { ObjectId } = require('mongodb');
const client = require('./mongoConnection');

const getOnePageOfHeroes = async (page) => {
  const itemsByPage = 12;
  const toSkip = page === 1 ? 0 : (page - 1) * 12
  const result = await client.db("projects").collection("heroes")
      .find({}).limit(itemsByPage).skip(toSkip).toArray();
    return result;
};

const getHeroByName = async (name) => {
  const result = await client
    .db("projects").collection("heroes").find({ name: {
      $regex : name,
      $options : "i",
    } }).toArray();
  return result;
};

const getMyListOfHeroes = async (arrayOfIds) => {
  const newArr = arrayOfIds.map((id) => ( ObjectId(id) ));
  const result = await client
    .db("projects").collection("heroes").find({
      _id: { $in: newArr }
    }).toArray();
  return result;
};

const getHeroById = async (id) => {
  const result = await client
    .db('projects').collection('heroes').findOne({ _id: ObjectId(id) });
  return result
};

const getHeroesQuantity = async () => (
  client.db('projects').collection('heroes').countDocuments()
);

module.exports = {
  getOnePageOfHeroes,
  getHeroByName,
  getMyListOfHeroes,
  getHeroById,
  getHeroesQuantity,
};
