export default (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: {
      type: DataTypes.STRING,
    },
  }, {
    freezeTableName: true,
    paranoid: false,
    timestamps: false,
    tableName: 'tasks',
  });

  return Task;
};
