import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "media_img_detect_edges",
    "message0": "detect edges in image %1",
    "args0": [
      { "type": "input_value", "name": "IMG", "check": "Image" }
    ],
    "output": "Image",
    "colour": 65,
    "tooltip": "Detects edges in an image using the Canny algorithm."
  },
  {
    "type": "media_img_to_gray",
    "message0": "convert image to grayscale %1",
    "args0": [
      { "type": "input_value", "name": "IMG", "check": "Image" }
    ],
    "output": "Image",
    "colour": 65,
    "tooltip": "Converts an image to grayscale."
  },
  {
    "type": "media_ocr_extract_text",
    "message0": "extract text from image %1",
    "args0": [
      { "type": "input_value", "name": "IMAGE", "check": "Image" }
    ],
    "output": "String",
    "colour": 65,
    "tooltip": "Extracts text from an image using OCR."
  },
  {
    "type": "media_face_detect",
    "message0": "detect faces in image %1",
    "args0": [
      { "type": "input_value", "name": "IMAGE", "check": "Image" }
    ],
    "output": "Array",
    "colour": 65,
    "tooltip": "Detects faces in an image. (Gated)"
  }
]);
