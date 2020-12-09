require('dotenv').config({ path: '.env' });
const { identifySong } = require("./umd/icecast-song-recognition");
const acrConfig = process.env;

test('handle invalid stream URL', () => {
  expect(
    identifySong({ 
      acrConfig, 
      streamURL: "https://google.com"
    }).catch(e => {
      expect(e).toEqual({
        error: "No audio was saved. Check stream URL.",
      })
    })
  )
});
