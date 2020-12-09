const Interstice = require("interstice");
const acrCloud = require("acrcloud");
const fs = require("fs");
const { uid } = require('uid');
const rimraf = require('rimraf');
const shell = require('shelljs');

const identifySong = async ({ 
  acrConfig, 
  streamURL, 
  recordingDuration, 
  tempPath 
}) => {

  tempPath = tempPath || './temp';

  return new Promise((resolve, reject) => {
    const id = uid(16);
    const folderPath = `${tempPath || './temp'}/${id}`;
    const interstice = new Interstice({ output: folderPath }); // set audio recording output
    const acr = new acrCloud(acrConfig);
    let filePath = '';
  
    if (!fs.existsSync(tempPath)) shell.mkdir('-p', tempPath);; // custom temp folder (shell for nested dirs)
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath); // create folder for stream audio
  
    interstice.start(streamURL);
  
    interstice.on('song:start', res => { 
      filePath = res.filePath; // move scope of filePath to be used below
    });
  
    setTimeout(() => {

      interstice.stop();
      if (!filePath) {
        return reject("No audio was saved. Check stream URL.")
      }
      const sample = fs.readFileSync(filePath); // send snippet to recognition API  
      acr.identify(sample).then(metadata => {
        rimraf(folderPath, (err) => { if (err) throw err }); // delete temp audio file
        if(metadata.metadata?.music[0]?.title) { // if song recognized, return.
          resolve(metadata.metadata.music[0]);
        } else {
          reject("Could not recognize song.");
        }
      });

    }, recordingDuration || 3000); // listen to stream for x seconds
  });

}

module.exports = { identifySong };