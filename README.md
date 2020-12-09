# icecast-song-recognition

An npm module for getting song metadata from Icecast streams with sound recognition.

Perfect for Icecast streams that don't already contain song metadata.

[![GitHub issues](https://img.shields.io/github/issues/ikejs/icecast-song-recognition)](https://github.com/ikejs/icecast-song-recognition/issues)
[![Travis CI Build](https://travis-ci.com/ikejs/icecast-song-recognition.svg?branch=master)]()

## Installation


```bash
npm i icecast-song-recognition --save
```

## Usage

```javascript
const { identifySong } = require("icecast-song-recognition");


const acrConfig = {
  host: '*****.acrcloud.com',
  access_key: '*****',
  access_secret: '*****'
};


identifySong({
  acrConfig,
  streamURL: 'http://stream2.datacenter.by:8002/energy'
})
.catch(err => { console.log(new Error(err)) })
.then(metadata => console.log(metadata));
```

## API
| Name | Default | Type | Description |
| --- | --- | --- | --- |
| acrConfig | null | Object | API key from [ACRCloud](https://www.acrcloud.com/music-recognition/)
| streamURL | null | String | Direct URL to Icecast audio |
| recordingDuration | 3000 | Number | Time (in ms) to record Icecast stream before recognizing music |
| tempPath | "./temp" | String | Path to store temporary audio files |
