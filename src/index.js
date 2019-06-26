// const fs = require('fs');
import { Task } from './models';
// const json = require('big-json');
// console.log(models);
// Task.findAll().then(x => console.log(x));
// const readStream = fs.createReadStream('dumpfiles/example.json', { flags: 'r', encoding: 'utf-8' });

// readStream.on('data', function (data) {
//   // This just pipes the read stream to the response object (which goes to the client)
//   console.log(data);
// });

// const parseStream = json.createParseStream();
//
// parseStream.on('data', function(pojo) {
//   console.log('xxx', pojo);
// });
//
// readStream.pipe(parseStream);
//
// readStream.on('error', function(err) {
//   res.end(err);
// });

// const StreamArray = require('stream-json/streamers/StreamArray');
const fs = require('fs');
//
// const pipeline = fs.createReadStream('dumpfiles/example.json')
//   .pipe(StreamArray.withParser({name: 'stringChunk', value: '3'}));
//
// async function insert(data) {
//   await Task.create(data);
// }
//
// pipeline.on('data', data => console.log('o', data.value));
const split = require('split');

fs.createReadStream('dumpfiles/example.json')
  .pipe(split(JSON.parse, null, { maxLength: 2}))
  .on('data', function (line) {
    //each chunk now is a separate line!
    console.log(line)
  })
