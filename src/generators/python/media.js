import { pythonGenerator as Python } from 'blockly/python';

Python.forBlock['media_img_load'] = function (block) {
    Python.addImport('from PIL import Image');
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    return [`Image.open(${path})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_img_resize'] = function (block) {
    const img = Python.valueToCode(block, 'IMG', Python.ORDER_MEMBER) || 'None';
    const width = Python.valueToCode(block, 'WIDTH', Python.ORDER_NONE) || '0';
    const height = Python.valueToCode(block, 'HEIGHT', Python.ORDER_NONE) || '0';
    return [`${img}.resize((${width}, ${height}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_img_crop'] = function (block) {
    const img = Python.valueToCode(block, 'IMG', Python.ORDER_MEMBER) || 'None';
    const box = Python.valueToCode(block, 'BOX', Python.ORDER_NONE) || '()';
    return [`${img}.crop(${box})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_img_save'] = function (block) {
    const img = Python.valueToCode(block, 'IMG', Python.ORDER_MEMBER) || 'None';
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    return `${img}.save(${path})\n`;
};

Python.forBlock['media_img_to_bytes'] = function (block) {
    Python.addImport('import io');
    const img = Python.valueToCode(block, 'IMG', Python.ORDER_MEMBER) || 'None';
    const helperName = Python.nameDB_.getDistinctName('_img_to_bytes', 'PROCEDURE');
    const funcDef = `def ${helperName}(img):\n` +
        `  buf = io.BytesIO()\n` +
        `  img.save(buf, format='PNG')\n` +
        `  return buf.getvalue()\n`;
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = funcDef;
    }
    return [`${helperName}(${img})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_img_thumbnail'] = function (block) {
    const img = Python.valueToCode(block, 'IMG', Python.ORDER_MEMBER) || 'None';
    const size = Python.valueToCode(block, 'SIZE', Python.ORDER_NONE) || '()';
    return [`${img}.thumbnail(${size})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_img_convert_format'] = function (block) {
    const img = Python.valueToCode(block, 'IMG', Python.ORDER_MEMBER) || 'None';
    const format = block.getFieldValue('FORMAT');
    return [`${img}.convert('${format}')`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_audio_load'] = function (block) {
    Python.addImport('from pydub import AudioSegment');
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    return [`AudioSegment.from_file(${path})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_audio_trim'] = function (block) {
    const audio = Python.valueToCode(block, 'AUDIO', Python.ORDER_MEMBER) || 'None';
    const start = Python.valueToCode(block, 'START', Python.ORDER_NONE) || '0';
    const end = Python.valueToCode(block, 'END', Python.ORDER_NONE) || '0';
    return [`${audio}[${start}:${end}]`, Python.ORDER_MEMBER];
};

Python.forBlock['media_audio_save'] = function (block) {
    const audio = Python.valueToCode(block, 'AUDIO', Python.ORDER_MEMBER) || 'None';
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    return `${audio}.export(${path})\n`;
};

Python.forBlock['media_video_load'] = function (block) {
    Python.addImport('import cv2');
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    return [`cv2.VideoCapture(${path})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_video_extract_frames'] = function (block) {
    Python.addImport('import cv2');
    const video = Python.valueToCode(block, 'VIDEO', Python.ORDER_MEMBER) || 'None';
    const helperName = Python.nameDB_.getDistinctName('_extract_frames', 'PROCEDURE');
    const funcDef = `def ${helperName}(video):\n` +
        `  frames = []\n` +
        `  while True:\n` +
        `    ret, frame = video.read()\n` +
        `    if not ret:\n` +
        `      break\n` +
        `    frames.append(frame)\n` +
        `  return frames\n`;
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = funcDef;
    }
    return [`${helperName}(${video})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_img_detect_edges'] = function (block) {
    Python.addImport('import cv2');
    Python.addImport('import numpy as np');
    const img = Python.valueToCode(block, 'IMG', Python.ORDER_NONE) || 'None';
    return [`cv2.Canny(np.array(${img}), 100, 200)`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_img_to_gray'] = function (block) {
    const img = Python.valueToCode(block, 'IMG', Python.ORDER_MEMBER) || 'None';
    return [`${img}.convert('L')`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_ocr_extract_text'] = function (block) {
    Python.addImport('import pytesseract');
    const img = Python.valueToCode(block, 'IMAGE', Python.ORDER_NONE) || 'None';
    return [`pytesseract.image_to_string(${img})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_face_detect'] = function (block) {
    Python.addImport('import cv2');
    const img = Python.valueToCode(block, 'IMAGE', Python.ORDER_NONE) || 'None';
    const helperName = Python.nameDB_.getDistinctName('_detect_faces', 'PROCEDURE');
    const funcDef = `def ${helperName}(img):\n` +
        `  face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')\n` +
        `  gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\n` +
        `  return face_cascade.detectMultiScale(gray, 1.1, 4)\n`;
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = funcDef;
    }
    return [`${helperName}(${img})`, Python.ORDER_FUNCTION_CALL];
};
