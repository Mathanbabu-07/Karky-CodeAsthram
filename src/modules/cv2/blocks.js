import * as Blockly from 'blockly/core';

Blockly.defineBlocksWithJsonArray([{
    'type': 'cv2_imread',
    'message0': 'read image from path %1',
    'args0': [{
        'type': 'input_value',
        'name': 'PATH',
        'check': 'String',
        'colour': '#78909C'
      }],
    'output': 'Image',
    'colour': '#78909C',
    'tooltip': 'Reads an image from a file.',
    'helpUrl': 'https://docs.opencv.org/4.x/d4/da8/group__imgcodecs.html#ga288b8b3da0892bd651fce07b3bbd3a56'
  },
  {
    'type': 'cv2_imwrite',
    'message0': 'save image %1 to path %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'IMAGE',
        'check': 'Image'
      },
      {
        'type': 'input_value',
        'name': 'PATH',
        'check': 'String'
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#78909C',
    'tooltip': 'Saves an image to a specified file.',
    'helpUrl': 'https://docs.opencv.org/4.x/d4/da8/group__imgcodecs.html#ga452d9286a22c05e808b9b08a2df1a6a3'
  },
  {
    "type": "cv2_imreadmulti",
    "message0": "read multiple images from path %1",
    "args0": [
      {
        "type": "input_value",
        "name": "PATH",
        "check": "String"
      }
    ],
    "output": "Array",
    "colour": "#78909C",
    "tooltip": "Reads multiple images from a file. Returns a list of images.",
    "helpUrl": "https://docs.opencv.org/4.x/d4/da8/group__imgcodecs.html#ga928182a43fa6198df411986143339246"
  },
  {
    "type": "cv2_imwritemulti",
    "message0": "save multiple images %1 to path %2",
    "args0": [
      {
        "type": "input_value",
        "name": "IMAGES",
        "check": "Array"
      },
      {
        "type": "input_value",
        "name": "PATH",
        "check": "String"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#78909C",
    "tooltip": "Saves multiple images to a single file.",
    "helpUrl": "https://docs.opencv.org/4.x/d4/da8/group__imgcodecs.html#ga833a09c2273f554793f1850771801c34"
  },
  {
    "type": "cv2_imshow",
    "message0": "show image %1 in window titled %2",
    "args0": [
      {
        "type": "input_value",
        "name": "IMAGE",
        "check": "Image"
      },
      {
        "type": "input_value",
        "name": "WINDOW_NAME",
        "check": "String"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#78909C",
    "tooltip": "Displays an image in a specified window.",
    "helpUrl": "https://docs.opencv.org/4.x/d7/dfc/group__highgui.html#ga453d42fe4cb60e5723281a89973ee563"
  },
  {
    "type": "cv2_waitkey",
    "message0": "wait for key press for %1 ms",
    "args0": [
      {
        "type": "input_value",
        "name": "DELAY",
        "check": "Number"
      }
    ],
    "output": "Number",
    "colour": "#78909C",
    "tooltip": "Waits for a pressed key. 0 means wait indefinitely. Returns the code of the pressed key.",
    "helpUrl": "https://docs.opencv.org/4.x/d7/dfc/group__highgui.html#ga5628525ad33f52eab17feebcfb3c8102"
  },
  {
    "type": "cv2_destroyallwindows",
    "message0": "destroy all OpenCV windows",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#78909C",
    "tooltip": "Destroys all of the HighGUI windows.",
    "helpUrl": "https://docs.opencv.org/4.x/d7/dfc/group__highgui.html#ga6b751ac0545f8489635073e73543c75f"
  },
  {
    "type": "cv2_destroywindow",
    "message0": "destroy window titled %1",
    "args0": [
      {
        "type": "input_value",
        "name": "WINDOW_NAME",
        "check": "String"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#78909C",
    "tooltip": "Destroys the specified HighGUI window.",
    "helpUrl": "https://docs.opencv.org/4.x/d7/dfc/group__highgui.html#ga5a555416c1404c06253457f722a849f1"
  },
  {
    "type": "cv2_videocapture",
    "message0": "open video from device/path %1",
    "args0": [
      {
        "type": "input_value",
        "name": "DEVICE",
        "check": ["String", "Number"]
      }
    ],
    "output": "VideoCapture",
    "colour": "#78909C",
    "tooltip": "Opens a video file or a capturing device for video capturing.",
    "helpUrl": "https://docs.opencv.org/4.x/d8/dfe/classcv_1_1VideoCapture.html"
  },
  {
    "type": "cv2_videowriter",
    "message0": "create video writer for path %1 codec %2 fps %3 frame size %4",
    "args0": [
      {
        "type": "input_value",
        "name": "PATH",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "CODEC",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "FPS",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "SIZE",
        "check": "Array"
      }
    ],
    "output": "VideoWriter",
    "colour": "#78909C",
    "tooltip": "Creates a VideoWriter object. Codec is a 4-character code (e.g., 'MJPG').",
    "helpUrl": "https://docs.opencv.org/4.x/dd/d9e/classcv_1_1VideoWriter.html"
  },
  {
    "type": "cv2_read",
    "message0": "read image from path %1",
    "args0": [{
        "type": "input_value",
        "name": "PATH",
        "check": "String"
      }],
    "output": "Image",
    "colour": "#78909C",
    "tooltip": "Reads an image from a file.",
    "helpUrl": "https://docs.opencv.org/4.x/d4/da8/group__imgcodecs.html#ga288b8b3da0892bd651fce07b3bbd3a56"
  },
  {
    "type": "cv2_write",
    "message0": "write image %1 to file %2",
    "args0": [
      {
        "type": "input_value",
        "name": "IMAGE",
        "check": "Image"
      },
      {
        "type": "input_value",
        "name": "PATH",
        "check": "String"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#78909C",
    "tooltip": "Writes an image to a specified file.",
    "helpUrl": "https://docs.opencv.org/4.x/d4/da8/group__imgcodecs.html#ga452d9286a22c05e808b9b08a2df1a6a3"
  },
  {
    "type": "cv2_cvtColor",
    "message0": "convert image %1 color space to %2",
    "args0": [
      { "type": "input_value", "name": "IMAGE", "check": "Image" },
      { "type": "input_value", "name": "CODE", "check": "String" }
    ],
    "output": "Image", "colour": "#78909C", "tooltip": "Converts an image from one color space to another.", "helpUrl": "https://docs.opencv.org/4.x/d8/d01/group__imgproc__color__conversions.html#ga397ae87e1288a81d2363b61574eb8cab"
  },
  {
    "type": "cv2_split", "message0": "split image %1 into channels", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }], "output": "Array", "colour": "#78909C", "tooltip": "Splits a multi-channel image into separate single-channel images.", "helpUrl": "https://docs.opencv.org/4.x/d2/de8/group__core__array.html#ga0547c7fed86152d7e9d0096029c8518a"
  },
  {
    "type": "cv2_merge", "message0": "merge channels %1 into image", "args0": [{ "type": "input_value", "name": "CHANNELS", "check": "Array" }], "output": "Image", "colour": "#78909C", "tooltip": "Merges several single-channel images into a single multi-channel image.", "helpUrl": "https://docs.opencv.org/4.x/d2/de8/group__core__array.html#ga7d7b4d6c6d52892d75c80cb4427e334c"
  },
  {
    "type": "cv2_splitChannels", "message0": "split image %1 channels", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }], "output": "Array", "colour": "#78909C", "tooltip": "Splits a multi-channel array into several single-channel arrays.", "helpUrl": "https://docs.opencv.org/4.x/d2/de8/group__core__array.html#ga0547c7fed86152d7e9d0096029c8518a"
  },
  {
    "type": "cv2_mergeChannels", "message0": "merge channels %1", "args0": [{ "type": "input_value", "name": "CHANNELS", "check": "Array" }], "output": "Image", "colour": "#78909C", "tooltip": "Merges several single-channel arrays into a single multi-channel array.", "helpUrl": "https://docs.opencv.org/4.x/d2/de8/group__core__array.html#ga7d7b4d6c6d52892d75c80cb4427e334c"
  },
  {
    "type": "cv2_threshold", "message0": "apply threshold to image %1 threshold %2 max value %3 type %4", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "THRESHOLD", "check": "Number" }, { "type": "input_value", "name": "MAXVAL", "check": "Number" }, { "type": "input_value", "name": "TYPE", "check": "String" }], "output": "Image", "colour": "#78909C", "tooltip": "Applies a fixed-level threshold to each array element.", "helpUrl": "https://docs.opencv.org/4.x/d7/d1b/group__imgproc__misc.html#gae8a4a146d1ca78c626a53577199e9c57"
  },
  {
    "type": "cv2_adaptiveThreshold", "message0": "apply adaptive threshold to image %1 max value %2 type %3 block size %4 C %5", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "MAXVAL", "check": "Number" }, { "type": "input_value", "name": "TYPE", "check": "String" }, { "type": "input_value", "name": "BLOCK_SIZE", "check": "Number" }, { "type": "input_value", "name": "C", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Applies an adaptive threshold to an array.", "helpUrl": "https://docs.opencv.org/4.x/d7/d1b/group__imgproc__misc.html#ga72b913f352e57d1b13ea2785770a0b42"
  },
  { "type": "cv2_COLOR_BGR2GRAY", "message0": "convert BGR to Grayscale for image %1", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Converts a BGR image to grayscale.", "helpUrl": "https://docs.opencv.org/4.x/d8/d01/group__imgproc__color__conversions.html" },
  { "type": "cv2_COLOR_BGR2RGB", "message0": "convert BGR to RGB for image %1", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Converts a BGR image to RGB.", "helpUrl": "https://docs.opencv.org/4.x/d8/d01/group__imgproc__color__conversions.html" },
  { "type": "cv2_COLOR_BGR2HSV", "message0": "convert BGR to HSV for image %1", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Converts a BGR image to HSV.", "helpUrl": "https://docs.opencv.org/4.x/d8/d01/group__imgproc__color__conversions.html" },
  { "type": "cv2_COLOR_BGR2Lab", "message0": "convert BGR to Lab for image %1", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Converts a BGR image to Lab.", "helpUrl": "https://docs.opencv.org/4.x/d8/d01/group__imgproc__color__conversions.html" },
  { "type": "cv2_COLOR_BGR2XYZ", "message0": "convert BGR to XYZ for image %1", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Converts a BGR image to XYZ.", "helpUrl": "https://docs.opencv.org/4.x/d8/d01/group__imgproc__color__conversions.html" },
  { "type": "cv2_COLOR_BGR2YUV", "message0": "convert BGR to YUV for image %1", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Converts a BGR image to YUV.", "helpUrl": "https://docs.opencv.org/4.x/d8/d01/group__imgproc__color__conversions.html" },
  { "type": "cv2_COLOR_BGR2YCrCb", "message0": "convert BGR to YCrCb for image %1", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Converts a BGR image to YCrCb.", "helpUrl": "https://docs.opencv.org/4.x/d8/d01/group__imgproc__color__conversions.html" },
  { "type": "cv2_COLOR_HSV2BGR", "message0": "convert HSV to BGR for image %1", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Converts an HSV image to BGR.", "helpUrl": "https://docs.opencv.org/4.x/d8/d01/group__imgproc__color__conversions.html" },
  { "type": "cv2_COLOR_Lab2BGR", "message0": "convert Lab to BGR for image %1", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Converts a Lab image to BGR.", "helpUrl": "https://docs.opencv.org/4.x/d8/d01/group__imgproc__color__conversions.html" },
  { "type": "cv2_COLOR_XYZ2BGR", "message0": "convert XYZ to BGR for image %1", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Converts an XYZ image to BGR.", "helpUrl": "https://docs.opencv.org/4.x/d8/d01/group__imgproc__color__conversions.html" },
  { "type": "cv2_COLOR_YUV2BGR", "message0": "convert YUV to BGR for image %1", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Converts a YUV image to BGR.", "helpUrl": "https://docs.opencv.org/4.x/d8/d01/group__imgproc__color__conversions.html" },
  { "type": "cv2_COLOR_YCrCb2BGR", "message0": "convert YCrCb to BGR for image %1", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Converts a YCrCb image to BGR.", "helpUrl": "https://docs.opencv.org/4.x/d8/d01/group__imgproc__color__conversions.html" },
  { "type": "cv2_blur", "message0": "average blur image %1 with kernel size %2", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "KSIZE", "check": "Array" }], "output": "Image", "colour": "#78909C", "tooltip": "Blurs an image using the normalized box filter.", "helpUrl": "https://docs.opencv.org/4.x/d4/d86/group__imgproc__filter.html#ga8c45db9afe636703801b0b2e440fce37" },
  { "type": "cv2_gaussianBlur", "message0": "gaussian blur image %1 with kernel size %2 sigmaX %3", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "KSIZE", "check": "Array" }, { "type": "input_value", "name": "SIGMA_X", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Blurs an image using a Gaussian filter.", "helpUrl": "https://docs.opencv.org/4.x/d4/d86/group__imgproc__filter.html#gaabe8c836e23c3973d633d5d7cacda2b1" },
  { "type": "cv2_medianBlur", "message0": "median blur image %1 with kernel size %2", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "KSIZE", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Blurs an image using the median filter.", "helpUrl": "https://docs.opencv.org/4.x/d4/d86/group__imgproc__filter.html#ga564869aa33e58769b4469101aac458f9" },
  { "type": "cv2_bilateralFilter", "message0": "bilateral filter image %1 diameter %2 sigmaColor %3 sigmaSpace %4", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "D", "check": "Number" }, { "type": "input_value", "name": "SIGMA_COLOR", "check": "Number" }, { "type": "input_value", "name": "SIGMA_SPACE", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Applies the bilateral filter to an image.", "helpUrl": "https://docs.opencv.org/4.x/d4/d86/group__imgproc__filter.html#ga9d7064d478c95d60003cf839430737ed" },
  { "type": "cv2_boxFilter", "message0": "box filter image %1 depth %2 kernel size %3", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "D", "check": "Number" }, { "type": "input_value", "name": "KSIZE", "check": "Array" }], "output": "Image", "colour": "#78909C", "tooltip": "Blurs an image using the box filter.", "helpUrl": "https://docs.opencv.org/4.x/d4/d86/group__imgproc__filter.html#gaa43f8a55287f3f33b143c7b802e3b2b8" },
  { "type": "cv2_filter2D", "message0": "apply linear filter to image %1 depth %2 kernel %3", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "DDEPTH", "check": "Number" }, { "type": "input_value", "name": "KERNEL", "check": "Array" }], "output": "Image", "colour": "#78909C", "tooltip": "Convolves an image with the kernel.", "helpUrl": "https://docs.opencv.org/4.x/d4/d86/group__imgproc__filter.html#ga27c049795ce870216ddfb366086b5a04" },
  { "type": "cv2_fastNlMeansDenoising", "message0": "denoise grayscale image %1 h %2 templateWindowSize %3 searchWindowSize %4", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "H", "check": "Number" }, { "type": "input_value", "name": "TEMPLATE_WINDOW_SIZE", "check": "Number" }, { "type": "input_value", "name": "SEARCH_WINDOW_SIZE", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Perform image denoising using Non-local Means algorithm.", "helpUrl": "https://docs.opencv.org/4.x/d1/d79/group__photo__denoising.html#ga440b84836d5b24430e309f6b4d2459c2" },
  { "type": "cv2_fastNlMeansDenoisingColored", "message0": "denoise color image %1 h %2 templateWindowSize %3 searchWindowSize %4", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "H", "check": "Number" }, { "type": "input_value", "name": "TEMPLATE_WINDOW_SIZE", "check": "Number" }, { "type": "input_value", "name": "SEARCH_WINDOW_SIZE", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Perform image denoising using Non-local Means algorithm for color images.", "helpUrl": "https://docs.opencv.org/4.x/d1/d79/group__photo__denoising.html#ga5f576f3f0d0c3d5267a15152a5595bf4" },
  { "type": "cv2_resize", "message0": "resize image %1 to size %2 with interpolation %3", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "SIZE", "check": "Array" }, { "type": "input_value", "name": "INTERPOLATION", "check": "String" }], "output": "Image", "colour": "#78909C", "tooltip": "Resizes an image.", "helpUrl": "https://docs.opencv.org/4.x/da/d54/group__imgproc__transform.html#ga47a974309e9102f5f08231edc7e7529d" },
  { "type": "cv2_rotate", "message0": "rotate image %1 by angle %2", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "ANGLE", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Rotates an image by a given angle.", "helpUrl": "https://docs.opencv.org/4.x/da/d54/group__imgproc__transform.html#gafbbc470ce8381281c50cf1ca0df56f34" },
  { "type": "cv2_flip", "message0": "flip image %1 with code %2", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "CODE", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Flips a 2D array around vertical, horizontal, or both axes.", "helpUrl": "https://docs.opencv.org/4.x/d2/de8/group__core__array.html#gaca7be533e3dac7feb70fc60635adf441" },
  { "type": "cv2_warpAffine", "message0": "apply affine transform to image %1 with matrix %2 size %3", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "M", "check": "Array" }, { "type": "input_value", "name": "SIZE", "check": "Array" }], "output": "Image", "colour": "#78909C", "tooltip": "Applies an affine transformation to an image.", "helpUrl": "https://docs.opencv.org/4.x/da/d54/group__imgproc__transform.html#ga0203d9ee5fcd28d40dbc4a1ea4451983" },
  { "type": "cv2_warpPerspective", "message0": "apply perspective transform to image %1 with matrix %2 size %3", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "M", "check": "Array" }, { "type": "input_value", "name": "SIZE", "check": "Array" }], "output": "Image", "colour": "#78909C", "tooltip": "Applies a perspective transformation to an image.", "helpUrl": "https://docs.opencv.org/4.x/da/d54/group__imgproc__transform.html#gaf73673a7e8e18ec6963e3774e6a94b87" },
  { "type": "cv2_getRotationMatrix2D", "message0": "get rotation matrix for center %1 angle %2 scale %3", "args0": [{ "type": "input_value", "name": "CENTER", "check": "Array" }, { "type": "input_value", "name": "ANGLE", "check": "Number" }, { "type": "input_value", "name": "SCALE", "check": "Number" }], "output": "Array", "colour": "#78909C", "tooltip": "Calculates an affine matrix of 2D rotation.", "helpUrl": "https://docs.opencv.org/4.x/da/d54/group__imgproc__transform.html#gafbbc470ce8381281c50cf1ca0df56f34" },
  { "type": "cv2_getAffineTransform", "message0": "get affine transform from src points %1 to dst points %2", "args0": [{ "type": "input_value", "name": "SRC_POINTS", "check": "Array" }, { "type": "input_value", "name": "DST_POINTS", "check": "Array" }], "output": "Array", "colour": "#78909C", "tooltip": "Calculates an affine transform from three pairs of the corresponding points.", "helpUrl": "https://docs.opencv.org/4.x/da/d54/group__imgproc__transform.html#ga8f623a0b32924aa4690850b516b250a5" },
  { "type": "cv2_getPerspectiveTransform", "message0": "get perspective transform from src points %1 to dst points %2", "args0": [{ "type": "input_value", "name": "SRC_POINTS", "check": "Array" }, { "type": "input_value", "name": "DST_POINTS", "check": "Array" }], "output": "Array", "colour": "#78909C", "tooltip": "Calculates a perspective transform from four pairs of the corresponding points.", "helpUrl": "https://docs.opencv.org/4.x/da/d54/group__imgproc__transform.html#ga8c1ae37bafc159891894d808c471207e" },
  { "type": "cv2_perspectiveTransform", "message0": "apply perspective transform to points %1 with matrix %2", "args0": [{ "type": "input_value", "name": "POINTS", "check": "Array" }, { "type": "input_value", "name": "MATRIX", "check": "Array" }], "output": "Array", "colour": "#78909C", "tooltip": "Performs the perspective matrix transformation of vectors.", "helpUrl": "https://docs.opencv.org/4.x/d2/de8/group__core__array.html#gad327659ac03e5fd6894b90025e6900a7" },
  { "type": "cv2_getRectSubPix", "message0": "extract rotated rectangle from image %1 patch size %2 center %3", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "PATCH_SIZE", "check": "Array" }, { "type": "input_value", "name": "CENTER", "check": "Array" }], "output": "Image", "colour": "#78909C", "tooltip": "Retrieves a pixel rectangle from an image with sub-pixel accuracy.", "helpUrl": "https://docs.opencv.org/4.x/da/d54/group__imgproc__transform.html#ga7dfb737e8e24ddc1028a54d5e9888806" },
  { "type": "cv2_remap", "message0": "remap image %1 with map1 %2 map2 %3 interpolation %4 borderMode %5", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "MAP1", "check": "Array" }, { "type": "input_value", "name": "MAP2", "check": "Array" }, { "type": "input_value", "name": "INTERPOLATION", "check": "String" }, { "type": "input_value", "name": "BORDER_MODE", "check": "String" }], "output": "Image", "colour": "#78909C", "tooltip": "Applies a generic geometrical transformation to an image.", "helpUrl": "https://docs.opencv.org/4.x/da/d54/group__imgproc__transform.html#ga1a64b08e2b8d01da13b56f8f553f1ad2" },
  { "type": "cv2_canny", "message0": "canny edge detection on image %1 threshold1 %2 threshold2 %3", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "THRESHOLD1", "check": "Number" }, { "type": "input_value", "name": "THRESHOLD2", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Finds edges in an image using the Canny algorithm.", "helpUrl": "https://docs.opencv.org/4.x/da/d5c/tutorial_canny_detector.html" },
  { "type": "cv2_sobel", "message0": "sobel edge detection on image %1 depth %2 dx %3 dy %4 ksize %5", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "DDEPTH", "check": "Number" }, { "type": "input_value", "name": "DX", "check": "Number" }, { "type": "input_value", "name": "DY", "check": "Number" }, { "type": "input_value", "name": "KSIZE", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Calculates the first, second, third, or mixed image derivatives using an extended Sobel operator.", "helpUrl": "https://docs.opencv.org/4.x/d4/d86/group__imgproc__filter.html#gasc010247aa2f3984e94b2a4e38e8e7b1" },
  { "type": "cv2_laplacian", "message0": "laplacian edge detection on image %1 depth %2 ksize %3", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "DDEPTH", "check": "Number" }, { "type": "input_value", "name": "KSIZE", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Calculates the Laplacian of an image.", "helpUrl": "https://docs.opencv.org/4.x/d4/d86/group__imgproc__filter.html#gad78703e4c8fe703d479c1860d76429e6" },
  { "type": "cv2_houghLines", "message0": "hough lines on image %1 rho %2 theta %3 threshold %4", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "RHO", "check": "Number" }, { "type": "input_value", "name": "THETA", "check": "Number" }, { "type": "input_value", "name": "THRESHOLD", "check": "Number" }], "output": "Array", "colour": "#78909C", "tooltip": "Finds lines in a binary image using the standard Hough transform.", "helpUrl": "https://docs.opencv.org/4.x/d9/db0/group__imgproc__feature.html#ga465d3416b406a4608051774b7c6a8585" },
  { "type": "cv2_houghCircles", "message0": "hough circles on image %1 method %2 dp %3 minDist %4 param1 %5 param2 %6 minRadius %7 maxRadius %8", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "METHOD", "check": "String" }, { "type": "input_value", "name": "DP", "check": "Number" }, { "type": "input_value", "name": "MIN_DIST", "check": "Number" }, { "type": "input_value", "name": "PARAM1", "check": "Number" }, { "type": "input_value", "name": "PARAM2", "check": "Number" }, { "type": "input_value", "name": "MIN_RADIUS", "check": "Number" }, { "type": "input_value", "name": "MAX_RADIUS", "check": "Number" }], "output": "Array", "colour": "#78909C", "tooltip": "Finds circles in a grayscale image using the Hough transform.", "helpUrl": "https://docs.opencv.org/4.x/d9/db0/group__imgproc__feature.html#ga47849c3be0d0406ad3ca45db65a25d2d" },
  { "type": "cv2_goodFeaturesToTrack", "message0": "good features to track in image %1 maxCorners %2 qualityLevel %3 minDistance %4", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "MAX_CORNERS", "check": "Number" }, { "type": "input_value", "name": "QUALITY_LEVEL", "check": "Number" }, { "type": "input_value", "name": "MIN_DISTANCE", "check": "Number" }], "output": "Array", "colour": "#78909C", "tooltip": "Determines strong corners on an image.", "helpUrl": "https://docs.opencv.org/4.x/d9/db0/group__imgproc__feature.html#ga47849c3be0d0406ad3ca45db65a25d2d" },
  { "type": "cv2_calcOpticalFlowPyrLK", "message0": "calc optical flow pyr LK prev_img %1 next_img %2 prev_pts %3", "args0": [{ "type": "input_value", "name": "PREV_IMG", "check": "Image" }, { "type": "input_value", "name": "NEXT_IMG", "check": "Image" }, { "type": "input_value", "name": "PREV_PTS", "check": "Array" }], "output": "Array", "colour": "#78909C", "tooltip": "Calculates an optical flow for a sparse feature set using the iterative Lucas-Kanade method with pyramids.", "helpUrl": "https://docs.opencv.org/4.x/dc/d6b/group__video__track.html#ga473e4b886d0d6385ba_972caeab5244c" },
  { "type": "cv2_calcOpticalFlowFarneback", "message0": "calc optical flow farneback prev_img %1 next_img %2", "args0": [{ "type": "input_value", "name": "PREV_IMG", "check": "Image" }, { "type": "input_value", "name": "NEXT_IMG", "check": "Image" }], "output": "Array", "colour": "#78909C", "tooltip": "Computes a dense optical flow using the Gunnar Farneback's algorithm.", "helpUrl": "https://docs.opencv.org/4.x/dc/d6b/group__video__track.html#ga5d10ebbd5ea092c10a1b55_9c19a43a" },
  { "type": "cv2_cornerHarris", "message0": "harris corner detection on image %1 blockSize %2 ksize %3 k %4", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "BLOCK_SIZE", "check": "Number" }, { "type": "input_value", "name": "KSIZE", "check": "Number" }, { "type": "input_value", "name": "K", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Harris corner detector.", "helpUrl": "https://docs.opencv.org/4.x/d9/db0/group__imgproc__feature.html#ga47849c3be0d0406ad3ca45db65a25d2d" },
  { "type": "cv2_cornerSubPix", "message0": "refine corners for image %1 corners %2 winSize %3 zeroZone %4 criteria %5", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "CORNERS", "check": "Array" }, { "type": "input_value", "name": "WIN_SIZE", "check": "Array" }, { "type": "input_value", "name": "ZERO_ZONE", "check": "Array" }, { "type": "input_value", "name": "CRITERIA", "check": "Array" }], "output": "Array", "colour": "#78909C", "tooltip": "Refines the corner locations.", "helpUrl": "https://docs.opencv.org/4.x/d9/db0/group__imgproc__feature.html#ga354e0d7c86d0d9da75de14b878a543ac" },
  { "type": "cv2_line", "message0": "draw line on image %1 from %2 to %3 color %4 thickness %5", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "PT1", "check": "Array" }, { "type": "input_value", "name": "PT2", "check": "Array" }, { "type": "input_value", "name": "COLOR", "check": "Array" }, { "type": "input_value", "name": "THICKNESS", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Draws a line segment connecting two points.", "helpUrl": "https://docs.opencv.org/4.x/d6/d6e/group__imgproc__draw.html#ga7078a9fae8c7e7d13d24dac2520ae4a2" },
  { "type": "cv2_rectangle", "message0": "draw rectangle on image %1 from %2 to %3 color %4 thickness %5", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "PT1", "check": "Array" }, { "type": "input_value", "name": "PT2", "check": "Array" }, { "type": "input_value", "name": "COLOR", "check": "Array" }, { "type": "input_value", "name": "THICKNESS", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Draws a simple, thick, or filled up-right rectangle.", "helpUrl": "https://docs.opencv.org/4.x/d6/d6e/group__imgproc__draw.html#ga07d2f74cadcf8e305e810ce8eed13bc9" },
  { "type": "cv2_circle", "message0": "draw circle on image %1 center %2 radius %3 color %4 thickness %5", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "CENTER", "check": "Array" }, { "type": "input_value", "name": "RADIUS", "check": "Number" }, { "type": "input_value", "name": "COLOR", "check": "Array" }, { "type": "input_value", "name": "THICKNESS", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Draws a circle.", "helpUrl": "https://docs.opencv.org/4.x/d6/d6e/group__imgproc__draw.html#gaf10604b069374903dbd0f0488cb4367" },
  { "type": "cv2_ellipse", "message0": "draw ellipse on image %1 center %2 axes %3 angle %4 startAngle %5 endAngle %6 color %7 thickness %8", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "CENTER", "check": "Array" }, { "type": "input_value", "name": "AXES", "check": "Array" }, { "type": "input_value", "name": "ANGLE", "check": "Number" }, { "type": "input_value", "name": "START_ANGLE", "check": "Number" }, { "type": "input_value", "name": "END_ANGLE", "check": "Number" }, { "type": "input_value", "name": "COLOR", "check": "Array" }, { "type": "input_value", "name": "THICKNESS", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Draws a simple or thick elliptic arc or fills an ellipse sector.", "helpUrl": "https://docs.opencv.org/4.x/d6/d6e/group__imgproc__draw.html#ga28b2267d35786f5f890ca167236cbc69" },
  { "type": "cv2_putText", "message0": "put text %1 on image %2 at %3 font %4 scale %5 color %6 thickness %7", "args0": [{ "type": "input_value", "name": "TEXT", "check": "String" }, { "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "ORG", "check": "Array" }, { "type": "input_value", "name": "FONT", "check": "String" }, { "type": "input_value", "name": "SCALE", "check": "Number" }, { "type": "input_value", "name": "COLOR", "check": "Array" }, { "type": "input_value", "name": "THICKNESS", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Draws a text string.", "helpUrl": "https://docs.opencv.org/4.x/d6/d6e/group__imgproc__draw.html#ga5126f47f883d730f633d74f07456c576" },
  { "type": "cv2_polylines", "message0": "draw polylines on image %1 points %2 isClosed %3 color %4 thickness %5", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "POINTS", "check": "Array" }, { "type": "input_value", "name": "IS_CLOSED", "check": "Boolean" }, { "type": "input_value", "name": "COLOR", "check": "Array" }, { "type": "input_value", "name": "THICKNESS", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Draws several polygonal curves.", "helpUrl": "https://docs.opencv.org/4.x/d6/d6e/group__imgproc__draw.html#ga1ea127ffbbb7e0c403818d2209d25e36" },
  { "type": "cv2_drawMarker", "message0": "draw marker on image %1 at %2 color %3 markerType %4 markerSize %5 thickness %6", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "POSITION", "check": "Array" }, { "type": "input_value", "name": "COLOR", "check": "Array" }, { "type": "input_value", "name": "MARKER_TYPE", "check": "String" }, { "type": "input_value", "name": "MARKER_SIZE", "check": "Number" }, { "type": "input_value", "name": "THICKNESS", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Draws a marker on a predefined position in an image.", "helpUrl": "https://docs.opencv.org/4.x/d6/d6e/group__imgproc__draw.html#ga4228a5ee68f4cc76a5a06f345c613916" },
  { "type": "cv2_erode", "message0": "erode image %1 with kernel %2 iterations %3", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "KERNEL", "check": "Array" }, { "type": "input_value", "name": "ITERATIONS", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Erodes an image by using a specific structuring element.", "helpUrl": "https://docs.opencv.org/4.x/d4/d86/group__imgproc__filter.html#gaeb1e0c1033e3f6b891a25d0511362aeb" },
  { "type": "cv2_dilate", "message0": "dilate image %1 with kernel %2 iterations %3", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "KERNEL", "check": "Array" }, { "type": "input_value", "name": "ITERATIONS", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Dilates an image by using a specific structuring element.", "helpUrl": "https://docs.opencv.org/4.x/d4/d86/group__imgproc__filter.html#ga4ff0f3318642c4f469d0e11f242f3b6c" },
  { "type": "cv2_morphologyEx", "message0": "morphologyEx on image %1 op %2 kernel %3 iterations %4", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "OP", "check": "String" }, { "type": "input_value", "name": "KERNEL", "check": "Array" }, { "type": "input_value", "name": "ITERATIONS", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Performs advanced morphological transformations.", "helpUrl": "https://docs.opencv.org/4.x/d4/d86/group__imgproc__filter.html#ga67493776e3ad1a3df63883829375201f" },
  { "type": "cv2_getStructuringElement", "message0": "get structuring element of shape %1 size %2", "args0": [{ "type": "input_value", "name": "SHAPE", "check": "String" }, { "type": "input_value", "name": "SIZE", "check": "Array" }], "output": "Array", "colour": "#78909C", "tooltip": "Returns a structuring element of the specified size and shape for morphological operations.", "helpUrl": "https://docs.opencv.org/4.x/d4/d86/group__imgproc__filter.html#gac342a1bb6eabf6f55c803a09268e36dc" },
  { "type": "cv2_findContours", "message0": "find contours in image %1 mode %2 method %3", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "MODE", "check": "String" }, { "type": "input_value", "name": "METHOD", "check": "String" }], "output": "Array", "colour": "#78909C", "tooltip": "Finds contours in a binary image.", "helpUrl": "https://docs.opencv.org/4.x/d3/dc0/group__imgproc__shape.html#ga17ed9f5d79ae97bd4c7cf18403e1689a" },
  { "type": "cv2_drawContours", "message0": "draw contours %1 on image %2 contourIdx %3 color %4 thickness %5", "args0": [{ "type": "input_value", "name": "CONTOURS", "check": "Array" }, { "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "CONTOUR_IDX", "check": "Number" }, { "type": "input_value", "name": "COLOR", "check": "Array" }, { "type": "input_value", "name": "THICKNESS", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Draws contours outlines or filled contours.", "helpUrl": "https://docs.opencv.org/4.x/d6/d6e/group__imgproc__draw.html#ga746c0625f1781f1ffc9056259103edbc" },
  { "type": "cv2_contourArea", "message0": "area of contour %1", "args0": [{ "type": "input_value", "name": "CONTOUR", "check": "Array" }], "output": "Number", "colour": "#78909C", "tooltip": "Calculates a contour area.", "helpUrl": "https://docs.opencv.org/4.x/d3/dc0/group__imgproc__shape.html#ga2c759ed9f497d4a618048a2f560d97f1" },
  { "type": "cv2_arcLength", "message0": "arc length of contour %1 closed %2", "args0": [{ "type": "input_value", "name": "CONTOUR", "check": "Array" }, { "type": "input_value", "name": "CLOSED", "check": "Boolean" }], "output": "Number", "colour": "#78909C", "tooltip": "Calculates a contour perimeter or a curve length.", "helpUrl": "https://docs.opencv.org/4.x/d3/dc0/group__imgproc__shape.html#ga8d26483c636be6b35c3ec6335798a47c" },
  { "type": "cv2_approxPolyDP", "message0": "approximate polygon from contour %1 epsilon %2 closed %3", "args0": [{ "type": "input_value", "name": "CONTOUR", "check": "Array" }, { "type": "input_value", "name": "EPSILON", "check": "Number" }, { "type": "input_value", "name": "CLOSED", "check": "Boolean" }], "output": "Array", "colour": "#78909C", "tooltip": "Approximates a polygonal curve(s) with the specified precision.", "helpUrl": "https://docs.opencv.org/4.x/d3/dc0/group__imgproc__shape.html#ga0011a0c10a4f6f874c4a4f8d975a507d" },
  { "type": "cv2_minEnclosingCircle", "message0": "min enclosing circle of contour %1", "args0": [{ "type": "input_value", "name": "CONTOUR", "check": "Array" }], "output": "Array", "colour": "#78909C", "tooltip": "Finds a circle of the minimum area enclosing a 2D point set.", "helpUrl": "https://docs.opencv.org/4.x/d3/dc0/group__imgproc__shape.html#ga8ce13c24081bb0139121273e813a869c" },
  { "type": "cv2_boundingRect", "message0": "bounding rectangle of contour %1", "args0": [{ "type": "input_value", "name": "CONTOUR", "check": "Array" }], "output": "Array", "colour": "#78909C", "tooltip": "Calculates the up-right bounding rectangle of a point set.", "helpUrl": "https://docs.opencv.org/4.x/d3/dc0/group__imgproc__shape.html#ga1034bda28189fb73b18538c339a16f6b" },
  { "type": "cv2_minAreaRect", "message0": "min area rectangle of contour %1", "args0": [{ "type": "input_value", "name": "CONTOUR", "check": "Array" }], "output": "Array", "colour": "#78909C", "tooltip": "Finds a rotated rectangle of the minimum area enclosing the input 2D point set.", "helpUrl": "https://docs.opencv.org/4.x/d3/dc0/group__imgproc__shape.html#ga3d476a3417130ae5154622a479fcf40d" },
  { "type": "cv2_boxPoints", "message0": "box points of rectangle %1", "args0": [{ "type": "input_value", "name": "RECT", "check": "Array" }], "output": "Array", "colour": "#78909C", "tooltip": "Finds the four vertices of a rotated rectangle.", "helpUrl": "https://docs.opencv.org/4.x/d3/dc0/group__imgproc__shape.html#gaf78d467e0e40831671914c1d41a0279e" },
  { "type": "cv2_fitEllipse", "message0": "fit ellipse to contour %1", "args0": [{ "type": "input_value", "name": "CONTOUR", "check": "Array" }], "output": "Array", "colour": "#78909C", "tooltip": "Fits an ellipse to a 2D point set.", "helpUrl": "https://docs.opencv.org/4.x/d3/dc0/group__imgproc__shape.html#gaf2191f27b8783dadaa70c02a4a35048f" },
  { "type": "cv2_fitLine", "message0": "fit line to points %1 distType %2 param %3 reps %4 aeps %5", "args0": [{ "type": "input_value", "name": "POINTS", "check": "Array" }, { "type": "input_value", "name": "DIST_TYPE", "check": "String" }, { "type": "input_value", "name": "PARAM", "check": "Number" }, { "type": "input_value", "name": "REPS", "check": "Number" }, { "type": "input_value", "name": "AEPS", "check": "Number" }], "output": "Array", "colour": "#78909C", "tooltip": "Fits a line to a 2D or 3D point set.", "helpUrl": "https://docs.opencv.org/4.x/d3/dc0/group__imgproc__shape.html#gaf849da1a3111f8a855b513b2c60e5cd8" },
  { "type": "cv2_moments", "message0": "moments of contour %1", "args0": [{ "type": "input_value", "name": "CONTOUR", "check": "Array" }], "output": "Object", "colour": "#78909C", "tooltip": "Calculates all of the moments up to the third order of a polygon or rasterized shape.", "helpUrl": "https://docs.opencv.org/4.x/d3/dc0/group__imgproc__shape.html#ga8b140409a4d8d1e4c274719b4b01e40a" },
  { "type": "cv2_pointPolygonTest", "message0": "point polygon test contour %1 pt %2 measureDist %3", "args0": [{ "type": "input_value", "name": "CONTOUR", "check": "Array" }, { "type": "input_value", "name": "PT", "check": "Array" }, { "type": "input_value", "name": "MEASURE_DIST", "check": "Boolean" }], "output": "Number", "colour": "#78909C", "tooltip": "Performs a point-in-contour test.", "helpUrl": "https://docs.opencv.org/4.x/d3/dc0/group__imgproc__shape.html#ga1a539e9112a249b7e682cb9b4e1837f4" },
  { "type": "cv2_inRange", "message0": "inRange check image %1 lower bound %2 upper bound %3", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "LOWER_BOUND", "check": "Array" }, { "type": "input_value", "name": "UPPER_BOUND", "check": "Array" }], "output": "Image", "colour": "#78909C", "tooltip": "Checks if array elements lie between the elements of two other arrays.", "helpUrl": "https://docs.opencv.org/4.x/d2/de8/group__core__array.html#ga48af0ab51e36436c5d04340e036d9143" },
  { "type": "cv2_bitwise_and", "message0": "bitwise AND of image %1 and image %2 with mask %3", "args0": [{ "type": "input_value", "name": "IMAGE1", "check": "Image" }, { "type": "input_value", "name": "IMAGE2", "check": "Image" }, { "type": "input_value", "name": "MASK", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Computes bitwise conjunction of two arrays (dst = src1 & src2).", "helpUrl": "https://docs.opencv.org/4.x/d2/de8/group__core__array.html#ga60b4d04b251ba5eb1392c34425497e14" },
  { "type": "cv2_bitwise_or", "message0": "bitwise OR of image %1 and image %2", "args0": [{ "type": "input_value", "name": "IMAGE1", "check": "Image" }, { "type": "input_value", "name": "IMAGE2", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Computes bitwise disjunction of two arrays (dst = src1 | src2).", "helpUrl": "https://docs.opencv.org/4.x/d2/de8/group__core__array.html#ga886f84f43c36a6a2a01490217b702283" },
  { "type": "cv2_bitwise_xor", "message0": "bitwise XOR of image %1 and image %2", "args0": [{ "type": "input_value", "name": "IMAGE1", "check": "Image" }, { "type": "input_value", "name": "IMAGE2", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Computes bitwise exclusive-or of two arrays (dst = src1 ^ src2).", "helpUrl": "https://docs.opencv.org/4.x/d2/de8/group__core__array.html#ga09b4a191763a8a9a4b8682a86c67d3b5" },
  { "type": "cv2_bitwise_not", "message0": "bitwise NOT of image %1", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Inverts every bit of an array.", "helpUrl": "https://docs.opencv.org/4.x/d2/de8/group__core__array.html#ga09b4a191763a8a9a4b8682a86c67d3b5" },
  { "type": "cv2_copyTo", "message0": "copy image %1 to %2 with mask %3", "args0": [{ "type": "input_value", "name": "SRC", "check": "Image" }, { "type": "input_value", "name": "DST", "check": "Image" }, { "type": "input_value", "name": "MASK", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Copies the source image into the destination image.", "helpUrl": "https://docs.opencv.org/4.x/d2/de8/group__core__array.html#gaa5433a41bbd9959e45542f56702677d2" },
  { "type": "cv2_subtract", "message0": "subtract image %1 from image %2", "args0": [{ "type": "input_value", "name": "IMAGE1", "check": "Image" }, { "type": "input_value", "name": "IMAGE2", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Calculates the per-element difference between two arrays.", "helpUrl": "https://docs.opencv.org/4.x/d2/de8/group__core__array.html#gaa0f00d98b4b57c269218e77a1a2b0c96" },
  { "type": "cv2_add", "message0": "add image %1 and image %2", "args0": [{ "type": "input_value", "name": "IMAGE1", "check": "Image" }, { "type": "input_value", "name": "IMAGE2", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Calculates the per-element sum of two arrays.", "helpUrl": "https://docs.opencv.org/4.x/d2/de8/group__core__array.html#ga10ac1bfb180e2cfda1701d06c24fdbd6" },
  { "type": "cv2_convertScaleAbs", "message0": "convert scale abs of image %1 alpha %2 beta %3", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "ALPHA", "check": "Number" }, { "type": "input_value", "name": "BETA", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Scales, calculates absolute values, and converts the result to 8-bit.", "helpUrl": "https://docs.opencv.org/4.x/d2/de8/group__core__array.html#ga3460e9c9f37b563ab9d5f265637c352b" },
  { "type": "cv2_addWeighted", "message0": "add weighted image %1 alpha %2 image %3 beta %4 gamma %5", "args0": [{ "type": "input_value", "name": "IMAGE1", "check": "Image" }, { "type": "input_value", "name": "ALPHA", "check": "Number" }, { "type": "input_value", "name": "IMAGE2", "check": "Image" }, { "type": "input_value", "name": "BETA", "check": "Number" }, { "type": "input_value", "name": "GAMMA", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Calculates the weighted sum of two arrays.", "helpUrl": "https://docs.opencv.org/4.x/d2/de8/group__core__array.html#gafafb2513349db3bcff51f54ee5592a19" },
  { "type": "cv2_resizeCanvas", "message0": "resize canvas of image %1 to size %2", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "SIZE", "check": "Array" }], "output": "Image", "colour": "#78909C", "tooltip": "Resizes the canvas of an image.", "helpUrl": "" },
  { "type": "cv2_normalize", "message0": "normalize image %1 alpha %2 beta %3 norm_type %4", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "ALPHA", "check": "Number" }, { "type": "input_value", "name": "BETA", "check": "Number" }, { "type": "input_value", "name": "NORM_TYPE", "check": "String" }], "output": "Image", "colour": "#78909C", "tooltip": "Normalizes the norm or value range of an array.", "helpUrl": "https://docs.opencv.org/4.x/d2/de8/group__core__array.html#ga87eef7ee3970f86906d69a92cbf064bd" },
  { "type": "cv2_equalizeHist", "message0": "equalize histogram of image %1", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Equalizes the histogram of a grayscale image.", "helpUrl": "https://docs.opencv.org/4.x/d6/dc7/group__imgproc__hist.html#ga7e54042d32789d3118a42490b4b20a0b" },
  { "type": "cv2_calcHist", "message0": "calculate histogram of image %1 channels %2 mask %3 histSize %4 ranges %5", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "CHANNELS", "check": "Array" }, { "type": "input_value", "name": "MASK", "check": "Image" }, { "type": "input_value", "name": "HIST_SIZE", "check": "Array" }, { "type": "input_value", "name": "RANGES", "check": "Array" }], "output": "Array", "colour": "#78909C", "tooltip": "Calculates a histogram of a set of arrays.", "helpUrl": "https://docs.opencv.org/4.x/d6/dc7/group__imgproc__hist.html#ga4b2b5fd75503ff9e6844cc43f55d7294" },
  { "type": "cv2_compareHist", "message0": "compare histogram %1 with %2 method %3", "args0": [{ "type": "input_value", "name": "HIST1", "check": "Array" }, { "type": "input_value", "name": "HIST2", "check": "Array" }, { "type": "input_value", "name": "METHOD", "check": "String" }], "output": "Number", "colour": "#78909C", "tooltip": "Compares two histograms.", "helpUrl": "https://docs.opencv.org/4.x/d6/dc7/group__imgproc__hist.html#gaf4190090efa5c45cb3673926e9a4732c" },
  { "type": "cv2_pyrDown", "message0": "pyrDown image %1", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Blurs an image and downsamples it.", "helpUrl": "https://docs.opencv.org/4.x/d4/d86/group__imgproc__filter.html#ga799d33d13c7a38d218b0a93339b6b79a" },
  { "type": "cv2_pyrUp", "message0": "pyrUp image %1", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Upsamples an image and then blurs it.", "helpUrl": "https://docs.opencv.org/4.x/d4/d86/group__imgproc__filter.html#ga279b764724b7a159938d201c1f7a40ec" },
  { "type": "cv2_COLOR_YCrCb2BGR", "message0": "convert YCrCb to BGR for image %1", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Converts a YCrCb image to BGR.", "helpUrl": "https://docs.opencv.org/4.x/d8/d01/group__imgproc__color__conversions.html" },
  { "type": "cv2_resize", "message0": "resize image %1 to size %2 with interpolation %3", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "SIZE", "check": "Array" }, { "type": "input_value", "name": "INTERPOLATION", "check": "String" }], "output": "Image", "colour": "#78909C", "tooltip": "Resizes an image.", "helpUrl": "https://docs.opencv.org/4.x/da/d54/group__imgproc__transform.html#ga47a974309e9102f5f08231edc7e7529d" },
  { "type": "cv2_rotate", "message0": "rotate image %1 by angle %2", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "ANGLE", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Rotates an image by a given angle.", "helpUrl": "https://docs.opencv.org/4.x/da/d54/group__imgproc__transform.html#gafbbc470ce8381281c50cf1ca0df56f34" },
  { "type": "cv2_flip", "message0": "flip image %1 with code %2", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "CODE", "check": "Number" }], "output": "Image", "colour": "#78909C", "tooltip": "Flips a 2D array around vertical, horizontal, or both axes.", "helpUrl": "https://docs.opencv.org/4.x/d2/de8/group__core__array.html#gaca7be533e3dac7feb70fc60635adf441" },
  { "type": "cv2_warpAffine", "message0": "apply affine transform to image %1 with matrix %2 size %3", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "M", "check": "Array" }, { "type": "input_value", "name": "SIZE", "check": "Array" }], "output": "Image", "colour": "#78909C", "tooltip": "Applies an affine transformation to an image.", "helpUrl": "https://docs.opencv.org/4.x/da/d54/group__imgproc__transform.html#ga0203d9ee5fcd28d40dbc4a1ea4451983" },
  { "type": "cv2_warpPerspective", "message0": "apply perspective transform to image %1 with matrix %2 size %3", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "M", "check": "Array" }, { "type": "input_value", "name": "SIZE", "check": "Array" }], "output": "Image", "colour": "#78909C", "tooltip": "Applies a perspective transformation to an image.", "helpUrl": "https://docs.opencv.org/4.x/da/d54/group__imgproc__transform.html#gaf73673a7e8e18ec6963e3774e6a94b87" },
  { "type": "cv2_getRotationMatrix2D", "message0": "get rotation matrix for center %1 angle %2 scale %3", "args0": [{ "type": "input_value", "name": "CENTER", "check": "Array" }, { "type": "input_value", "name": "ANGLE", "check": "Number" }, { "type": "input_value", "name": "SCALE", "check": "Number" }], "output": "Array", "colour": "#78909C", "tooltip": "Calculates an affine matrix of 2D rotation.", "helpUrl": "https://docs.opencv.org/4.x/da/d54/group__imgproc__transform.html#gafbbc470ce8381281c50cf1ca0df56f34" },
  { "type": "cv2_getAffineTransform", "message0": "get affine transform from src points %1 to dst points %2", "args0": [{ "type": "input_value", "name": "SRC_POINTS", "check": "Array" }, { "type": "input_value", "name": "DST_POINTS", "check": "Array" }], "output": "Array", "colour": "#78909C", "tooltip": "Calculates an affine transform from three pairs of the corresponding points.", "helpUrl": "https://docs.opencv.org/4.x/da/d54/group__imgproc__transform.html#ga8f623a0b32924aa4690850b516b250a5" },
  { "type": "cv2_getPerspectiveTransform", "message0": "get perspective transform from src points %1 to dst points %2", "args0": [{ "type": "input_value", "name": "SRC_POINTS", "check": "Array" }, { "type": "input_value", "name": "DST_POINTS", "check": "Array" }], "output": "Array", "colour": "#78909C", "tooltip": "Calculates a perspective transform from four pairs of the corresponding points.", "helpUrl": "https://docs.opencv.org/4.x/da/d54/group__imgproc__transform.html#ga8c1ae37bafc159891894d808c471207e" },
  { "type": "cv2_perspectiveTransform", "message0": "apply perspective transform to points %1 with matrix %2", "args0": [{ "type": "input_value", "name": "POINTS", "check": "Array" }, { "type": "input_value", "name": "MATRIX", "check": "Array" }], "output": "Array", "colour": "#78909C", "tooltip": "Performs the perspective matrix transformation of vectors.", "helpUrl": "https://docs.opencv.org/4.x/d2/de8/group__core__array.html#gad327659ac03e5fd6894b90025e6900a7" },
  { "type": "cv2_getRectSubPix", "message0": "extract rotated rectangle from image %1 patch size %2 center %3", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "PATCH_SIZE", "check": "Array" }, { "type": "input_value", "name": "CENTER", "check": "Array" }], "output": "Image", "colour": "#78909C", "tooltip": "Retrieves a pixel rectangle from an image with sub-pixel accuracy.", "helpUrl": "https://docs.opencv.org/4.x/da/d54/group__imgproc__transform.html#ga7dfb737e8e24ddc1028a54d5e9888806" },
  { "type": "cv2_remap", "message0": "remap image %1 with map1 %2 map2 %3 interpolation %4 borderMode %5", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "MAP1", "check": "Array" }, { "type": "input_value", "name": "MAP2", "check": "Array" }, { "type": "input_value", "name": "INTERPOLATION", "check": "String" }, { "type": "input_value", "name": "BORDER_MODE", "check": "String" }], "output": "Image", "colour": "#78909C", "tooltip": "Applies a generic geometrical transformation to an image.", "helpUrl": "https://docs.opencv.org/4.x/da/d54/group__imgproc__transform.html#ga1a64b08e2b8d01da13b56f8f553f1ad2" },
  { "type": "cv2_pyrDown", "message0": "pyrDown image %1", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Blurs an image and downsamples it.", "helpUrl": "https://docs.opencv.org/4.x/d4/d86/group__imgproc__filter.html#ga799d33d13c7a38d218b0a93339b6b79a" },
  { "type": "cv2_pyrUp", "message0": "pyrUp image %1", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }], "output": "Image", "colour": "#78909C", "tooltip": "Upsamples an image and then blurs it.", "helpUrl": "https://docs.opencv.org/4.x/d4/d86/group__imgproc__filter.html#ga279b764724b7a159938d201c1f7a40ec" },
  { "type": "cv2_buildPyramid", "message0": "build pyramid for image %1 maxlevel %2", "args0": [{ "type": "input_value", "name": "IMAGE", "check": "Image" }, { "type": "input_value", "name": "MAX_LEVEL", "check": "Number" }], "output": "Array", "colour": "#78909C", "tooltip": "Constructs the Gaussian pyramid for an image.", "helpUrl": "https://docs.opencv.org/4.x/d4/d86/group__imgproc__filter.html#gaeda9b32c129e4b6c888d1d82f5d0228d" }
]);