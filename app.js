require('dotenv').config({ path: '.env' });
const { identifySong } = require("./src/index");

const acrConfig = process.env;

identifySong({
  acrConfig,
  streamURL: 'http://stream2.datacenter.by:8002/energy'
})
.catch(err => { console.log(new Error(err)) })
.then(metadata => console.log(metadata));