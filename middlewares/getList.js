const { User, List } = require('../models');

const getList = async (req, res, next) => {
  const { payload: { id } } = req;
  try {
    const user = await User.findOne({
      where: { id },
      include: {
        model: List, as: 'list',
        attributes: { exclude: ['id', 'userId'] },
      },
    }).then((data) => JSON.parse(JSON.stringify(data)));
    const arrayOfIds = user.list.map(({ heroId }) => heroId);
    req.list = arrayOfIds;
    next();
  } catch (error) {
    console.error(error);
  }
}

module.exports = getList;
