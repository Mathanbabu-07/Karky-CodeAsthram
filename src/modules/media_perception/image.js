import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "media_img_load",
    "message0": "load image from path %1",
    "args0": [
      { "type": "input_value", "name": "PATH", "check": "String" }
    ],
    "output": "Image",
    "colour": 65,
    "tooltip": "Loads an image from a file path."
  },
  {
    "type": "media_img_resize",
    "message0": "resize image %1 to width %2 height %3",
    "args0": [
      { "type": "input_value", "name": "IMG", "check": "Image" },
      { "type": "input_value", "name": "WIDTH", "check": "Number" },
      { "type": "input_value", "name": "HEIGHT", "check": "Number" }
    ],
    "output": "Image",
    "colour": 65,
    "tooltip": "Resizes an image."
  },
  {
    "type": "media_img_crop",
    "message0": "crop image %1 with box (left, upper, right, lower) %2",
    "args0": [
      { "type": "input_value", "name": "IMG", "check": "Image" },
      { "type": "input_value", "name": "BOX", "check": "Tuple" }
    ],
    "output": "Image",
    "colour": 65,
    "tooltip": "Crops an image."
  },
  {
    "type": "media_img_save",
    "message0": "save image %1 to path %2",
    "args0": [
      { "type": "input_value", "name": "IMG", "check": "Image" },
      { "type": "input_value", "name": "PATH", "check": "String" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 65,
    "tooltip": "Saves an image to a file path."
  },
  {
    "type": "media_img_to_bytes",
    "message0": "get bytes of image %1",
    "args0": [
      { "type": "input_value", "name": "IMG", "check": "Image" }
    ],
    "output": "Bytes",
    "colour": 65,
    "tooltip": "Converts an image to bytes."
  },
  {
    "type": "media_img_thumbnail",
    "message0": "create thumbnail for image %1 with size %2",
    "args0": [
      { "type": "input_value", "name": "IMG", "check": "Image" },
      { "type": "input_value", "name": "SIZE", "check": "Tuple" }
    ],
    "output": "Image",
    "colour": 65,
    "tooltip": "Creates a thumbnail for an image."
  },
  {
    "type": "media_img_convert_format",
    "message0": "convert image %1 to format %2",
    "args0": [
      { "type": "input_value", "name": "IMG", "check": "Image" },
      { "type": "field_input", "name": "FORMAT", "text": "PNG" }
    ],
    "output": "Image",
    "colour": 65,
    "tooltip": "Converts an image to a different format."
  }
]);
