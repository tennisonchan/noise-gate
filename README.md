# Noise Gate
To filter out the noise from the audio source. This is simply a compressor and a filter with a pre-adjusted values on the setting.

## Get Start
```js
let noiseGate = new NoiseGateNode(audioContext);

// Connect to the source and then to the destination
source.connect(noiseGate);
noiseGate.connect(audioContext.destination);
```

## Example
```js
const audioContext = new AudioContext();

navigator.mediaDevices.getUserMedia({ audio: true })
.then(function(stream) {
  let source = this.context.createMediaStreamSource(stream);
  let noiseGate = new NoiseGateNode(audioContext);
  source.connect(noiseGate);
  noiseGate.connect(audioContext.destination);
});
```