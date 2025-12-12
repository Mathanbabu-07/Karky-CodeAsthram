import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "media_audio_load",
    "message0": "load audio from path %1",
    "args0": [
      { "type": "input_value", "name": "PATH", "check": "String" }
    ],
    "output": "Audio",
    "colour": 65,
    "tooltip": "Loads an audio file."
  },
  {
    "type": "media_audio_trim",
    "message0": "trim audio %1 from %2 to %3",
    "args0": [
      { "type": "input_value", "name": "AUDIO", "check": "Audio" },
      { "type": "input_value", "name": "START", "check": "Number" },
      { "type": "input_value", "name": "END", "check": "Number" }
    ],
    "output": "Audio",
    "colour": 65,
    "tooltip": "Trims an audio file."
  },
  {
    "type": "media_audio_save",
    "message0": "save audio %1 to path %2",
    "args0": [
      { "type": "input_value", "name": "AUDIO", "check": "Audio" },
      { "type": "input_value", "name": "PATH", "check": "String" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 65,
    "tooltip": "Saves an audio file."
  },
  {
    "type": "media_video_load",
    "message0": "load video from path %1",
    "args0": [
      { "type": "input_value", "name": "PATH", "check": "String" }
    ],
    "output": "Video",
    "colour": 65,
    "tooltip": "Loads a video file."
  },
  {
    "type": "media_video_extract_frames",
    "message0": "extract frames from video %1",
    "args0": [
      { "type": "input_value", "name": "VIDEO", "check": "Video" }
    ],
    "output": "Array",
    "colour": 65,
    "tooltip": "Extracts frames from a video."
  }
]);
