const client = require('./mongoConnection');

const getOnePageOfHeroes = async (page) => {
  const itemsByPage = 12;
  const toSkip = page === 1 ? 0 : (page - 1) * 12
  try {
    await client.connect();
    const result = await client.db("projects").collection("heroes")
      .find({}).limit(itemsByPage).skip(toSkip).toArray();
    return result;
  } catch (error) {
    console.error(error);
    client.close();
  }
};

const getHeroByName = async (name) => {
  try {
    await client.connect();
    const result = await client
      .db("projects").collection("heroes").find({ name: {
        $regex : name,
        $options : "i",
      } }).toArray();
    return result;
  } catch (error) {
    console.error(error);
    client.close();
  }
};

const addHero = () => {};

const updateHero = () => {};

module.exports = {
  getOnePageOfHeroes,
  getHeroByName,
};
