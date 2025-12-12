import * as Blockly from "blockly/core";

Blockly.defineBlocksWithJsonArray([
  {
    "type": "pillow_image_create",
    "message0": "create new image mode %1 size %2 color %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "MODE",
        "options": [
          [
            "RGB",
            "RGB"
          ],
          [
            "L (grayscale)",
            "L"
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "SIZE",
        "check": "Tuple"
      },
      {
        "type": "input_value",
        "name": "COLOR",
        "check": [
          "Colour",
          "String",
          "Number"
        ]
      }
    ],
    "output": "Image",
    "colour": "#00ACC1",
    "tooltip": "Creates a new image with the given mode, size, and color.",
    "helpUrl": "https://pillow.readthedocs.io/en/stable/reference/Image.html#PIL.Image.new"
  },
  {
    "type": "pillow_draw_line",
    "message0": "on image %1 draw line from %2 to %3 fill %4 width %5",
    "args0": [
      {
        "type": "input_value",
        "name": "IMAGE",
        "check": "Image"
      },
      {
        "type": "input_value",
        "name": "XY_START",
        "check": "Tuple"
      },
      {
        "type": "input_value",
        "name": "XY_END",
        "check": "Tuple"
      },
      {
        "type": "input_value",
        "name": "FILL",
        "check": [
          "Colour",
          "String"
        ]
      },
      {
        "type": "input_value",
        "name": "WIDTH",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00ACC1",
    "inputsInline": false,
    "tooltip": "Draws a line on the given image.",
    "helpUrl": "https://pillow.readthedocs.io/en/stable/reference/ImageDraw.html#PIL.ImageDraw.ImageDraw.line"
  },
  {
    "type": "pillow_draw_rectangle",
    "message0": "on image %1 draw rectangle at %2 fill %3 outline %4 width %5",
    "args0": [
      {
        "type": "input_value",
        "name": "IMAGE",
        "check": "Image"
      },
      {
        "type": "input_value",
        "name": "BOUNDING_BOX",
        "check": "Tuple"
      },
      {
        "type": "input_value",
        "name": "FILL",
        "check": [
          "Colour",
          "String"
        ]
      },
      {
        "type": "input_value",
        "name": "OUTLINE",
        "check": [
          "Colour",
          "String"
        ]
      },
      {
        "type": "input_value",
        "name": "WIDTH",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00ACC1",
    "inputsInline": false,
    "tooltip": "Draws a rectangle on the given image.",
    "helpUrl": "https://pillow.readthedocs.io/en/stable/reference/ImageDraw.html#PIL.ImageDraw.ImageDraw.rectangle"
  },
  {
    "type": "pillow_draw_ellipse",
    "message0": "on image %1 draw ellipse in bounding box %2 fill %3 outline %4 width %5",
    "args0": [
      {
        "type": "input_value",
        "name": "IMAGE",
        "check": "Image"
      },
      {
        "type": "input_value",
        "name": "BOUNDING_BOX",
        "check": "Tuple"
      },
      {
        "type": "input_value",
        "name": "FILL",
        "check": [
          "Colour",
          "String"
        ]
      },
      {
        "type": "input_value",
        "name": "OUTLINE",
        "check": [
          "Colour",
          "String"
        ]
      },
      {
        "type": "input_value",
        "name": "WIDTH",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00ACC1",
    "inputsInline": false,
    "tooltip": "Draws an ellipse on the given image.",
    "helpUrl": "https://pillow.readthedocs.io/en/stable/reference/ImageDraw.html#PIL.ImageDraw.ImageDraw.ellipse"
  },
  {
    "type": "pillow_draw_text",
    "message0": "on image %1 draw text %2 at position %3 fill %4",
    "args0": [
      {
        "type": "input_value",
        "name": "IMAGE",
        "check": "Image"
      },
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "POSITION",
        "check": "Tuple"
      },
      {
        "type": "input_value",
        "name": "FILL",
        "check": [
          "Colour",
          "String"
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00ACC1",
    "inputsInline": false,
    "tooltip": "Draws text on the given image.",
    "helpUrl": "https://pillow.readthedocs.io/en/stable/reference/ImageDraw.html#PIL.ImageDraw.ImageDraw.text"
  },
  {
    "type": "pillow_image_filter",
    "message0": "apply filter %1 to image %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "FILTER",
        "options": [
          [
            "BLUR",
            "BLUR"
          ],
          [
            "CONTOUR",
            "CONTOUR"
          ],
          [
            "DETAIL",
            "DETAIL"
          ],
          [
            "EDGE_ENHANCE",
            "EDGE_ENHANCE"
          ],
          [
            "EDGE_ENHANCE_MORE",
            "EDGE_ENHANCE_MORE"
          ],
          [
            "EMBOSS",
            "EMBOSS"
          ],
          [
            "FIND_EDGES",
            "FIND_EDGES"
          ],
          [
            "SHARPEN",
            "SHARPEN"
          ],
          [
            "SMOOTH",
            "SMOOTH"
          ],
          [
            "SMOOTH_MORE",
            "SMOOTH_MORE"
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "IMAGE",
        "check": "Image"
      }
    ],
    "output": "Image",
    "colour": "#00ACC1",
    "inputsInline": true,
    "tooltip": "Applies a predefined filter to the image.",
    "helpUrl": "https://pillow.readthedocs.io/en/stable/reference/ImageFilter.html"
  }
]);