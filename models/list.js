module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    heroId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
    tableName: 'Lists',
  });
  
  List.associate = (models) => {
    List.belongsTo(models.User, {
      foreignKey: 'id',
      as: 'user',
    });
  };

  return List;
};
