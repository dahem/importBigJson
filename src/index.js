import fs from 'fs';
import JSONStream from 'JSONStream';
import es from 'event-stream';
import logger from './logger';
import importTasks from './importTasks';

function importBigJson(path, asyncFunc, options = {}) {
  let { chunk, start } = options;
  chunk = chunk || 1000;
  start = start || 0;
  const stream = fs.createReadStream(path, { encoding: 'utf8' });
  const allData = [];

  logger.info('start read file...');
  let lenRecords = 0;

  stream.pipe(JSONStream.parse('*'))
    .pipe(es.map((data) => {
      if (lenRecords % 10000 === 0) {
        logger.info(`reading ...${lenRecords} records`);
      }
      lenRecords += 1;
      allData.push(data);
      return data;
    }));

  stream.on('close', async () => {
    try {
      logger.info(`finish read file with ${lenRecords} records`);
      const len = allData.length;
      let i;
      for (i = start; i < len; i += chunk) {
        logger.info('imported data block ', i, 'of', (i + chunk) - 1);
        const block = allData.slice(i, i + chunk);
        await asyncFunc(block);
      }
      logger.info('imported data block ', i - chunk, 'of', lenRecords - 1);
      await allData.slice(i - chunk, -1);

      logger.info('finish imported data');
      stream.destroy();
      process.exit();
    } catch (e) {
      logger.error(e);
      stream.destroy();
      process.exit();
    }
  });
}

importBigJson('dumpFiles/example.json', importTasks, { chunk: 2, start: 0 });
