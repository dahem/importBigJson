import models from './models';

export default (block) => {
  // const tasks = block.map((x, i) => ({ ...x, id: i }));
  console.log(block);
  console.log(models.Task);
  return models.Task.bulkCreate(block, {
    updateOnDuplicate: ['name'],
  });
};
