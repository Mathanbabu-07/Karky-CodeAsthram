import { pythonGenerator as Python } from 'blockly/python';

Python.forBlock['cv2_imread'] = function(block) {
  Python.addImport('import cv2');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_ATOMIC);
  const code = `cv2_imread(${path})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_imwrite'] = function(block) {
  Python.addImport('import cv2');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_ATOMIC) || "'output.png'";
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  return `cv2_imwrite(${path}, ${image})\n`;
};

Python.forBlock['cv2_cvtColor'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const code = Python.valueToCode(block, 'CODE', Python.ORDER_ATOMIC) || 'cv2_COLOR_BGR2GRAY';
  const result = `cv2_cvtColor(${image}, ${code})`;
  return [result, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_split'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_split(${image})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_merge'] = function(block) {
  Python.addImport('import cv2');
  const channels = Python.valueToCode(block, 'CHANNELS', Python.ORDER_ATOMIC) || '[]';
  const code = `cv2_merge(${channels})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_splitChannels'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_split(${image})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_mergeChannels'] = function(block) {
  Python.addImport('import cv2');
  const channels = Python.valueToCode(block, 'CHANNELS', Python.ORDER_ATOMIC) || '[]';
  const code = `cv2_merge(${channels})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_threshold'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const threshold = Python.valueToCode(block, 'THRESHOLD', Python.ORDER_ATOMIC) || '127';
  const maxval = Python.valueToCode(block, 'MAXVAL', Python.ORDER_ATOMIC) || '255';
  const type = Python.valueToCode(block, 'TYPE', Python.ORDER_ATOMIC) || 'cv2_THRESH_BINARY';
  const code = `cv2_threshold(${image}, ${threshold}, ${maxval}, ${type})[1]`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_adaptiveThreshold'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const maxval = Python.valueToCode(block, 'MAXVAL', Python.ORDER_ATOMIC) || '255';
  const type = Python.valueToCode(block, 'TYPE', Python.ORDER_ATOMIC) || 'cv2_ADAPTIVE_THRESH_MEAN_C';
  const blockSize = Python.valueToCode(block, 'BLOCK_SIZE', Python.ORDER_ATOMIC) || '11';
  const C = Python.valueToCode(block, 'C', Python.ORDER_ATOMIC) || '2';
  const code = `cv2_adaptiveThreshold(${image}, ${maxval}, ${type}, cv2_THRESH_BINARY, ${blockSize}, ${C})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

for (const color of ['GRAY', 'RGB', 'HSV', 'Lab', 'XYZ', 'YUV', 'YCrCb']) {
  Python.forBlock[`cv2_COLOR_BGR2${color}`] = function(block) {
    Python.addImport('import cv2');
    const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
    const code = `cv2_cvtColor(${image}, cv2_COLOR_BGR2${color})`;
    return [code, Python.ORDER_FUNCTION_CALL];
  };
}

Python.forBlock['cv2_blur'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const ksize = Python.valueToCode(block, 'KSIZE', Python.ORDER_ATOMIC) || '(5, 5)';
  const code = `cv2_blur(${image}, ${ksize})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_gaussianBlur'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const ksize = Python.valueToCode(block, 'KSIZE', Python.ORDER_ATOMIC) || '(5, 5)';
  const sigmaX = Python.valueToCode(block, 'SIGMA_X', Python.ORDER_ATOMIC) || '0';
  const code = `cv2_GaussianBlur(${image}, ${ksize}, ${sigmaX})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_medianBlur'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const ksize = Python.valueToCode(block, 'KSIZE', Python.ORDER_ATOMIC) || '5';
  const code = `cv2_medianBlur(${image}, ${ksize})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_bilateralFilter'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const d = Python.valueToCode(block, 'D', Python.ORDER_ATOMIC) || '9';
  const sigmaColor = Python.valueToCode(block, 'SIGMA_COLOR', Python.ORDER_ATOMIC) || '75';
  const sigmaSpace = Python.valueToCode(block, 'SIGMA_SPACE', Python.ORDER_ATOMIC) || '75';
  const code = `cv2_bilateralFilter(${image}, ${d}, ${sigmaColor}, ${sigmaSpace})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_boxFilter'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const d = Python.valueToCode(block, 'D', Python.ORDER_ATOMIC) || '-1';
  const ksize = Python.valueToCode(block, 'KSIZE', Python.ORDER_ATOMIC) || '(5, 5)';
  const code = `cv2_boxFilter(${image}, ${d}, ${ksize})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_filter2D'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const ddepth = Python.valueToCode(block, 'DDEPTH', Python.ORDER_ATOMIC) || '-1';
  const kernel = Python.valueToCode(block, 'KERNEL', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_filter2D(${image}, ${ddepth}, ${kernel})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_fastNlMeansDenoising'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const h = Python.valueToCode(block, 'H', Python.ORDER_ATOMIC) || '10';
  const templateWindowSize = Python.valueToCode(block, 'TEMPLATE_WINDOW_SIZE', Python.ORDER_ATOMIC) || '7';
  const searchWindowSize = Python.valueToCode(block, 'SEARCH_WINDOW_SIZE', Python.ORDER_ATOMIC) || '21';
  const code = `cv2_fastNlMeansDenoising(${image}, None, ${h}, ${templateWindowSize}, ${searchWindowSize})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_fastNlMeansDenoisingColored'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const h = Python.valueToCode(block, 'H', Python.ORDER_ATOMIC) || '10';
  const templateWindowSize = Python.valueToCode(block, 'TEMPLATE_WINDOW_SIZE', Python.ORDER_ATOMIC) || '7';
  const searchWindowSize = Python.valueToCode(block, 'SEARCH_WINDOW_SIZE', Python.ORDER_ATOMIC) || '21';
  const code = `cv2_fastNlMeansDenoisingColored(${image}, None, ${h}, ${h}, ${templateWindowSize}, ${searchWindowSize})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_resize'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const size = Python.valueToCode(block, 'SIZE', Python.ORDER_ATOMIC) || '(0, 0)';
  const interpolation = Python.valueToCode(block, 'INTERPOLATION', Python.ORDER_ATOMIC) || 'cv2_INTER_LINEAR';
  const code = `cv2_resize(${image}, ${size}, interpolation=${interpolation})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_rotate'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const angle = Python.valueToCode(block, 'ANGLE', Python.ORDER_ATOMIC) || '0';
  const code = `cv2_rotate(${image}, ${angle})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_flip'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const code = Python.valueToCode(block, 'CODE', Python.ORDER_ATOMIC) || '0';
  const result = `cv2_flip(${image}, ${code})`;
  return [result, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_warpAffine'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const m = Python.valueToCode(block, 'M', Python.ORDER_ATOMIC) || 'None';
  const size = Python.valueToCode(block, 'SIZE', Python.ORDER_ATOMIC) || '(0, 0)';
  const code = `cv2_warpAffine(${image}, ${m}, ${size})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_warpPerspective'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const m = Python.valueToCode(block, 'M', Python.ORDER_ATOMIC) || 'None';
  const size = Python.valueToCode(block, 'SIZE', Python.ORDER_ATOMIC) || '(0, 0)';
  const code = `cv2_warpPerspective(${image}, ${m}, ${size})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_getRotationMatrix2D'] = function(block) {
  Python.addImport('import cv2');
  const center = Python.valueToCode(block, 'CENTER', Python.ORDER_ATOMIC) || '(0, 0)';
  const angle = Python.valueToCode(block, 'ANGLE', Python.ORDER_ATOMIC) || '0';
  const scale = Python.valueToCode(block, 'SCALE', Python.ORDER_ATOMIC) || '1.0';
  const code = `cv2_getRotationMatrix2D(${center}, ${angle}, ${scale})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_getAffineTransform'] = function(block) {
  Python.addImport('import cv2');
  const srcPoints = Python.valueToCode(block, 'SRC_POINTS', Python.ORDER_ATOMIC) || 'None';
  const dstPoints = Python.valueToCode(block, 'DST_POINTS', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_getAffineTransform(${srcPoints}, ${dstPoints})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_getPerspectiveTransform'] = function(block) {
  Python.addImport('import cv2');
  const srcPoints = Python.valueToCode(block, 'SRC_POINTS', Python.ORDER_ATOMIC) || 'None';
  const dstPoints = Python.valueToCode(block, 'DST_POINTS', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_getPerspectiveTransform(${srcPoints}, ${dstPoints})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_perspectiveTransform'] = function(block) {
  Python.addImport('import cv2');
  const points = Python.valueToCode(block, 'POINTS', Python.ORDER_ATOMIC) || 'None';
  const matrix = Python.valueToCode(block, 'MATRIX', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_perspectiveTransform(${points}, ${matrix})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_getRectSubPix'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const patchSize = Python.valueToCode(block, 'PATCH_SIZE', Python.ORDER_ATOMIC) || '(0, 0)';
  const center = Python.valueToCode(block, 'CENTER', Python.ORDER_ATOMIC) || '(0, 0)';
  const code = `cv2_getRectSubPix(${image}, ${patchSize}, ${center})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_remap'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const map1 = Python.valueToCode(block, 'MAP1', Python.ORDER_ATOMIC) || 'None';
  const map2 = Python.valueToCode(block, 'MAP2', Python.ORDER_ATOMIC) || 'None';
  const interpolation = Python.valueToCode(block, 'INTERPOLATION', Python.ORDER_ATOMIC) || 'cv2_INTER_LINEAR';
  const borderMode = Python.valueToCode(block, 'BORDER_MODE', Python.ORDER_ATOMIC) || 'cv2_BORDER_CONSTANT';
  const code = `cv2_remap(${image}, ${map1}, ${map2}, ${interpolation}, borderMode=${borderMode})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_canny'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const threshold1 = Python.valueToCode(block, 'THRESHOLD1', Python.ORDER_ATOMIC) || '100';
  const threshold2 = Python.valueToCode(block, 'THRESHOLD2', Python.ORDER_ATOMIC) || '200';
  const code = `cv2_Canny(${image}, ${threshold1}, ${threshold2})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_sobel'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const ddepth = Python.valueToCode(block, 'DDEPTH', Python.ORDER_ATOMIC) || 'cv2_CV_64F';
  const dx = Python.valueToCode(block, 'DX', Python.ORDER_ATOMIC) || '1';
  const dy = Python.valueToCode(block, 'DY', Python.ORDER_ATOMIC) || '0';
  const ksize = Python.valueToCode(block, 'KSIZE', Python.ORDER_ATOMIC) || '5';
  const code = `cv2_Sobel(${image}, ${ddepth}, ${dx}, ${dy}, ksize=${ksize})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_laplacian'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const ddepth = Python.valueToCode(block, 'DDEPTH', Python.ORDER_ATOMIC) || 'cv2_CV_64F';
  const ksize = Python.valueToCode(block, 'KSIZE', Python.ORDER_ATOMIC) || '5';
  const code = `cv2_Laplacian(${image}, ${ddepth}, ksize=${ksize})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_houghLines'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const rho = Python.valueToCode(block, 'RHO', Python.ORDER_ATOMIC) || '1';
  const theta = Python.valueToCode(block, 'THETA', Python.ORDER_ATOMIC) || 'numpy.pi/180';
  const threshold = Python.valueToCode(block, 'THRESHOLD', Python.ORDER_ATOMIC) || '200';
  const code = `cv2_HoughLines(${image}, ${rho}, ${theta}, ${threshold})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_houghCircles'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const method = Python.valueToCode(block, 'METHOD', Python.ORDER_ATOMIC) || 'cv2_HOUGH_GRADIENT';
  const dp = Python.valueToCode(block, 'DP', Python.ORDER_ATOMIC) || '1';
  const minDist = Python.valueToCode(block, 'MIN_DIST', Python.ORDER_ATOMIC) || '20';
  const param1 = Python.valueToCode(block, 'PARAM1', Python.ORDER_ATOMIC) || '50';
  const param2 = Python.valueToCode(block, 'PARAM2', Python.ORDER_ATOMIC) || '30';
  const minRadius = Python.valueToCode(block, 'MIN_RADIUS', Python.ORDER_ATOMIC) || '0';
  const maxRadius = Python.valueToCode(block, 'MAX_RADIUS', Python.ORDER_ATOMIC) || '0';
  const code = `cv2_HoughCircles(${image}, ${method}, ${dp}, ${minDist}, param1=${param1}, param2=${param2}, minRadius=${minRadius}, maxRadius=${maxRadius})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_goodFeaturesToTrack'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const maxCorners = Python.valueToCode(block, 'MAX_CORNERS', Python.ORDER_ATOMIC) || '100';
  const qualityLevel = Python.valueToCode(block, 'QUALITY_LEVEL', Python.ORDER_ATOMIC) || '0.01';
  const minDistance = Python.valueToCode(block, 'MIN_DISTANCE', Python.ORDER_ATOMIC) || '10';
  const code = `cv2_goodFeaturesToTrack(${image}, ${maxCorners}, ${qualityLevel}, ${minDistance})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_calcOpticalFlowPyrLK'] = function(block) {
  Python.addImport('import cv2');
  const prevImg = Python.valueToCode(block, 'PREV_IMG', Python.ORDER_ATOMIC) || 'None';
  const nextImg = Python.valueToCode(block, 'NEXT_IMG', Python.ORDER_ATOMIC) || 'None';
  const prevPts = Python.valueToCode(block, 'PREV_PTS', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_calcOpticalFlowPyrLK(${prevImg}, ${nextImg}, ${prevPts}, None)`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_calcOpticalFlowFarneback'] = function(block) {
  Python.addImport('import cv2');
  const prevImg = Python.valueToCode(block, 'PREV_IMG', Python.ORDER_ATOMIC) || 'None';
  const nextImg = Python.valueToCode(block, 'NEXT_IMG', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_calcOpticalFlowFarneback(${prevImg}, ${nextImg}, None, 0.5, 3, 15, 3, 5, 1.2, 0)`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_cornerHarris'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const blockSize = Python.valueToCode(block, 'BLOCK_SIZE', Python.ORDER_ATOMIC) || '2';
  const ksize = Python.valueToCode(block, 'KSIZE', Python.ORDER_ATOMIC) || '3';
  const k = Python.valueToCode(block, 'K', Python.ORDER_ATOMIC) || '0.04';
  const code = `cv2_cornerHarris(${image}, ${blockSize}, ${ksize}, ${k})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_cornerSubPix'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const corners = Python.valueToCode(block, 'CORNERS', Python.ORDER_ATOMIC) || 'None';
  const winSize = Python.valueToCode(block, 'WIN_SIZE', Python.ORDER_ATOMIC) || '(10, 10)';
  const zeroZone = Python.valueToCode(block, 'ZERO_ZONE', Python.ORDER_ATOMIC) || '(-1, -1)';
  const criteria = Python.valueToCode(block, 'CRITERIA', Python.ORDER_ATOMIC) || '(cv2_TERM_CRITERIA_EPS + cv2_TERM_CRITERIA_MAX_ITER, 40, 0.001)';
  const code = `cv2_cornerSubPix(${image}, ${corners}, ${winSize}, ${zeroZone}, ${criteria})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_line'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const pt1 = Python.valueToCode(block, 'PT1', Python.ORDER_ATOMIC) || '(0, 0)';
  const pt2 = Python.valueToCode(block, 'PT2', Python.ORDER_ATOMIC) || '(0, 0)';
  const color = Python.valueToCode(block, 'COLOR', Python.ORDER_ATOMIC) || '(255, 0, 0)';
  const thickness = Python.valueToCode(block, 'THICKNESS', Python.ORDER_ATOMIC) || '1';
  const code = `cv2_line(${image}, ${pt1}, ${pt2}, ${color}, ${thickness})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_rectangle'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const pt1 = Python.valueToCode(block, 'PT1', Python.ORDER_ATOMIC) || '(0, 0)';
  const pt2 = Python.valueToCode(block, 'PT2', Python.ORDER_ATOMIC) || '(0, 0)';
  const color = Python.valueToCode(block, 'COLOR', Python.ORDER_ATOMIC) || '(255, 0, 0)';
  const thickness = Python.valueToCode(block, 'THICKNESS', Python.ORDER_ATOMIC) || '1';
  const code = `cv2_rectangle(${image}, ${pt1}, ${pt2}, ${color}, ${thickness})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_circle'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const center = Python.valueToCode(block, 'CENTER', Python.ORDER_ATOMIC) || '(0, 0)';
  const radius = Python.valueToCode(block, 'RADIUS', Python.ORDER_ATOMIC) || '10';
  const color = Python.valueToCode(block, 'COLOR', Python.ORDER_ATOMIC) || '(255, 0, 0)';
  const thickness = Python.valueToCode(block, 'THICKNESS', Python.ORDER_ATOMIC) || '1';
  const code = `cv2_circle(${image}, ${center}, ${radius}, ${color}, ${thickness})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_ellipse'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const center = Python.valueToCode(block, 'CENTER', Python.ORDER_ATOMIC) || '(0, 0)';
  const axes = Python.valueToCode(block, 'AXES', Python.ORDER_ATOMIC) || '(10, 5)';
  const angle = Python.valueToCode(block, 'ANGLE', Python.ORDER_ATOMIC) || '0';
  const startAngle = Python.valueToCode(block, 'START_ANGLE', Python.ORDER_ATOMIC) || '0';
  const endAngle = Python.valueToCode(block, 'END_ANGLE', Python.ORDER_ATOMIC) || '360';
  const color = Python.valueToCode(block, 'COLOR', Python.ORDER_ATOMIC) || '(255, 0, 0)';
  const thickness = Python.valueToCode(block, 'THICKNESS', Python.ORDER_ATOMIC) || '1';
  const code = `cv2_ellipse(${image}, ${center}, ${axes}, ${angle}, ${startAngle}, ${endAngle}, ${color}, ${thickness})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_putText'] = function(block) {
  Python.addImport('import cv2');
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_ATOMIC) || "''";
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const org = Python.valueToCode(block, 'ORG', Python.ORDER_ATOMIC) || '(10, 30)';
  const font = Python.valueToCode(block, 'FONT', Python.ORDER_ATOMIC) || 'cv2_FONT_HERSHEY_SIMPLEX';
  const scale = Python.valueToCode(block, 'SCALE', Python.ORDER_ATOMIC) || '1';
  const color = Python.valueToCode(block, 'COLOR', Python.ORDER_ATOMIC) || '(255, 255, 255)';
  const thickness = Python.valueToCode(block, 'THICKNESS', Python.ORDER_ATOMIC) || '2';
  const code = `cv2_putText(${image}, ${text}, ${org}, ${font}, ${scale}, ${color}, ${thickness})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_polylines'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const points = Python.valueToCode(block, 'POINTS', Python.ORDER_ATOMIC) || '[]';
  const isClosed = Python.valueToCode(block, 'IS_CLOSED', Python.ORDER_ATOMIC) || 'True';
  const color = Python.valueToCode(block, 'COLOR', Python.ORDER_ATOMIC) || '(255, 0, 0)';
  const thickness = Python.valueToCode(block, 'THICKNESS', Python.ORDER_ATOMIC) || '1';
  const code = `cv2_polylines(${image}, [${points}], ${isClosed}, ${color}, ${thickness})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_drawMarker'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const position = Python.valueToCode(block, 'POSITION', Python.ORDER_ATOMIC) || '(0, 0)';
  const color = Python.valueToCode(block, 'COLOR', Python.ORDER_ATOMIC) || '(255, 0, 0)';
  const markerType = Python.valueToCode(block, 'MARKER_TYPE', Python.ORDER_ATOMIC) || 'cv2_MARKER_CROSS';
  const markerSize = Python.valueToCode(block, 'MARKER_SIZE', Python.ORDER_ATOMIC) || '20';
  const thickness = Python.valueToCode(block, 'THICKNESS', Python.ORDER_ATOMIC) || '1';
  const code = `cv2_drawMarker(${image}, ${position}, ${color}, markerType=${markerType}, markerSize=${markerSize}, thickness=${thickness})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_erode'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const kernel = Python.valueToCode(block, 'KERNEL', Python.ORDER_ATOMIC) || 'None';
  const iterations = Python.valueToCode(block, 'ITERATIONS', Python.ORDER_ATOMIC) || '1';
  const code = `cv2_erode(${image}, ${kernel}, iterations=${iterations})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_dilate'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const kernel = Python.valueToCode(block, 'KERNEL', Python.ORDER_ATOMIC) || 'None';
  const iterations = Python.valueToCode(block, 'ITERATIONS', Python.ORDER_ATOMIC) || '1';
  const code = `cv2_dilate(${image}, ${kernel}, iterations=${iterations})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_morphologyEx'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const op = Python.valueToCode(block, 'OP', Python.ORDER_ATOMIC) || 'cv2_MORPH_OPEN';
  const kernel = Python.valueToCode(block, 'KERNEL', Python.ORDER_ATOMIC) || 'None';
  const iterations = Python.valueToCode(block, 'ITERATIONS', Python.ORDER_ATOMIC) || '1';
  const code = `cv2_morphologyEx(${image}, ${op}, ${kernel}, iterations=${iterations})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_getStructuringElement'] = function(block) {
  Python.addImport('import cv2');
  const shape = Python.valueToCode(block, 'SHAPE', Python.ORDER_ATOMIC) || 'cv2_MORPH_RECT';
  const size = Python.valueToCode(block, 'SIZE', Python.ORDER_ATOMIC) || '(5, 5)';
  const code = `cv2_getStructuringElement(${shape}, ${size})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_findContours'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const mode = Python.valueToCode(block, 'MODE', Python.ORDER_ATOMIC) || 'cv2_RETR_TREE';
  const method = Python.valueToCode(block, 'METHOD', Python.ORDER_ATOMIC) || 'cv2_CHAIN_APPROX_SIMPLE';
  const code = `cv2_findContours(${image}, ${mode}, ${method})[0]`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_drawContours'] = function(block) {
  Python.addImport('import cv2');
  const contours = Python.valueToCode(block, 'CONTOURS', Python.ORDER_ATOMIC) || '[]';
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const contourIdx = Python.valueToCode(block, 'CONTOUR_IDX', Python.ORDER_ATOMIC) || '-1';
  const color = Python.valueToCode(block, 'COLOR', Python.ORDER_ATOMIC) || '(0, 255, 0)';
  const thickness = Python.valueToCode(block, 'THICKNESS', Python.ORDER_ATOMIC) || '3';
  const code = `cv2_drawContours(${image}, ${contours}, ${contourIdx}, ${color}, ${thickness})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_contourArea'] = function(block) {
  Python.addImport('import cv2');
  const contour = Python.valueToCode(block, 'CONTOUR', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_contourArea(${contour})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_arcLength'] = function(block) {
  Python.addImport('import cv2');
  const contour = Python.valueToCode(block, 'CONTOUR', Python.ORDER_ATOMIC) || 'None';
  const closed = Python.valueToCode(block, 'CLOSED', Python.ORDER_ATOMIC) || 'True';
  const code = `cv2_arcLength(${contour}, ${closed})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_approxPolyDP'] = function(block) {
  Python.addImport('import cv2');
  const contour = Python.valueToCode(block, 'CONTOUR', Python.ORDER_ATOMIC) || 'None';
  const epsilon = Python.valueToCode(block, 'EPSILON', Python.ORDER_ATOMIC) || '1';
  const closed = Python.valueToCode(block, 'CLOSED', Python.ORDER_ATOMIC) || 'True';
  const code = `cv2_approxPolyDP(${contour}, ${epsilon}, ${closed})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_minEnclosingCircle'] = function(block) {
  Python.addImport('import cv2');
  const contour = Python.valueToCode(block, 'CONTOUR', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_minEnclosingCircle(${contour})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_boundingRect'] = function(block) {
  Python.addImport('import cv2');
  const contour = Python.valueToCode(block, 'CONTOUR', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_boundingRect(${contour})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_minAreaRect'] = function(block) {
  Python.addImport('import cv2');
  const contour = Python.valueToCode(block, 'CONTOUR', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_minAreaRect(${contour})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_boxPoints'] = function(block) {
  Python.addImport('import cv2');
  const rect = Python.valueToCode(block, 'RECT', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_boxPoints(${rect})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_fitEllipse'] = function(block) {
  Python.addImport('import cv2');
  const contour = Python.valueToCode(block, 'CONTOUR', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_fitEllipse(${contour})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_fitLine'] = function(block) {
  Python.addImport('import cv2');
  const points = Python.valueToCode(block, 'POINTS', Python.ORDER_ATOMIC) || 'None';
  const distType = Python.valueToCode(block, 'DIST_TYPE', Python.ORDER_ATOMIC) || 'cv2_DIST_L2';
  const param = Python.valueToCode(block, 'PARAM', Python.ORDER_ATOMIC) || '0';
  const reps = Python.valueToCode(block, 'REPS', Python.ORDER_ATOMIC) || '0.01';
  const aeps = Python.valueToCode(block, 'AEPS', Python.ORDER_ATOMIC) || '0.01';
  const code = `cv2_fitLine(${points}, ${distType}, ${param}, ${reps}, ${aeps})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_moments'] = function(block) {
  Python.addImport('import cv2');
  const contour = Python.valueToCode(block, 'CONTOUR', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_moments(${contour})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_pointPolygonTest'] = function(block) {
  Python.addImport('import cv2');
  const contour = Python.valueToCode(block, 'CONTOUR', Python.ORDER_ATOMIC) || 'None';
  const pt = Python.valueToCode(block, 'PT', Python.ORDER_ATOMIC) || '(0, 0)';
  const measureDist = Python.valueToCode(block, 'MEASURE_DIST', Python.ORDER_ATOMIC) || 'False';
  const code = `cv2_pointPolygonTest(${contour}, ${pt}, ${measureDist})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_inRange'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const lowerBound = Python.valueToCode(block, 'LOWER_BOUND', Python.ORDER_ATOMIC) || 'None';
  const upperBound = Python.valueToCode(block, 'UPPER_BOUND', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_inRange(${image}, ${lowerBound}, ${upperBound})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_bitwise_and'] = function(block) {
  Python.addImport('import cv2');
  const image1 = Python.valueToCode(block, 'IMAGE1', Python.ORDER_ATOMIC) || 'None';
  const image2 = Python.valueToCode(block, 'IMAGE2', Python.ORDER_ATOMIC) || 'None';
  const mask = Python.valueToCode(block, 'MASK', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_bitwise_and(${image1}, ${image2}, mask=${mask})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_bitwise_or'] = function(block) {
  Python.addImport('import cv2');
  const image1 = Python.valueToCode(block, 'IMAGE1', Python.ORDER_ATOMIC) || 'None';
  const image2 = Python.valueToCode(block, 'IMAGE2', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_bitwise_or(${image1}, ${image2})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_bitwise_xor'] = function(block) {
  Python.addImport('import cv2');
  const image1 = Python.valueToCode(block, 'IMAGE1', Python.ORDER_ATOMIC) || 'None';
  const image2 = Python.valueToCode(block, 'IMAGE2', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_bitwise_xor(${image1}, ${image2})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_bitwise_not'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_bitwise_not(${image})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_copyTo'] = function(block) {
  Python.addImport('import cv2');
  const src = Python.valueToCode(block, 'SRC', Python.ORDER_ATOMIC) || 'None';
  const dst = Python.valueToCode(block, 'DST', Python.ORDER_ATOMIC) || 'None';
  const mask = Python.valueToCode(block, 'MASK', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_copyTo(${src}, ${mask}, ${dst})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_subtract'] = function(block) {
  Python.addImport('import cv2');
  const image1 = Python.valueToCode(block, 'IMAGE1', Python.ORDER_ATOMIC) || 'None';
  const image2 = Python.valueToCode(block, 'IMAGE2', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_subtract(${image1}, ${image2})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_add'] = function(block) {
  Python.addImport('import cv2');
  const image1 = Python.valueToCode(block, 'IMAGE1', Python.ORDER_ATOMIC) || 'None';
  const image2 = Python.valueToCode(block, 'IMAGE2', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_add(${image1}, ${image2})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_convertScaleAbs'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const alpha = Python.valueToCode(block, 'ALPHA', Python.ORDER_ATOMIC) || '1';
  const beta = Python.valueToCode(block, 'BETA', Python.ORDER_ATOMIC) || '0';
  const code = `cv2_convertScaleAbs(${image}, alpha=${alpha}, beta=${beta})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_addWeighted'] = function(block) {
  Python.addImport('import cv2');
  const image1 = Python.valueToCode(block, 'IMAGE1', Python.ORDER_ATOMIC) || 'None';
  const alpha = Python.valueToCode(block, 'ALPHA', Python.ORDER_ATOMIC) || '0.5';
  const image2 = Python.valueToCode(block, 'IMAGE2', Python.ORDER_ATOMIC) || 'None';
  const beta = Python.valueToCode(block, 'BETA', Python.ORDER_ATOMIC) || '0.5';
  const gamma = Python.valueToCode(block, 'GAMMA', Python.ORDER_ATOMIC) || '0';
  const code = `cv2_addWeighted(${image1}, ${alpha}, ${image2}, ${beta}, ${gamma})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_resizeCanvas'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const size = Python.valueToCode(block, 'SIZE', Python.ORDER_ATOMIC) || '(0, 0)';
  const code = `cv2_resize(${image}, ${size})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_normalize'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const alpha = Python.valueToCode(block, 'ALPHA', Python.ORDER_ATOMIC) || '0';
  const beta = Python.valueToCode(block, 'BETA', Python.ORDER_ATOMIC) || '255';
  const norm_type = Python.valueToCode(block, 'NORM_TYPE', Python.ORDER_ATOMIC) || 'cv2_NORM_MINMAX';
  const code = `cv2_normalize(${image}, None, alpha=${alpha}, beta=${beta}, norm_type=${norm_type})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_equalizeHist'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_equalizeHist(${image})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_calcHist'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const channels = Python.valueToCode(block, 'CHANNELS', Python.ORDER_ATOMIC) || '[0]';
  const mask = Python.valueToCode(block, 'MASK', Python.ORDER_ATOMIC) || 'None';
  const histSize = Python.valueToCode(block, 'HIST_SIZE', Python.ORDER_ATOMIC) || '[256]';
  const ranges = Python.valueToCode(block, 'RANGES', Python.ORDER_ATOMIC) || '[0, 256]';
  const code = `cv2_calcHist([${image}], ${channels}, ${mask}, ${histSize}, ${ranges})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_compareHist'] = function(block) {
  Python.addImport('import cv2');
  const hist1 = Python.valueToCode(block, 'HIST1', Python.ORDER_ATOMIC) || 'None';
  const hist2 = Python.valueToCode(block, 'HIST2', Python.ORDER_ATOMIC) || 'None';
  const method = Python.valueToCode(block, 'METHOD', Python.ORDER_ATOMIC) || 'cv2_HISTCMP_CORREL';
  const code = `cv2_compareHist(${hist1}, ${hist2}, ${method})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_pyrDown'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_pyrDown(${image})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_pyrUp'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const code = `cv2_pyrUp(${image})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_buildPyramid'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const maxlevel = Python.valueToCode(block, 'MAX_LEVEL', Python.ORDER_ATOMIC) || '3';
  const code = `tuple(cv2_buildPyramid(${image}, ${maxlevel}))`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

for (const color of ['HSV', 'Lab', 'XYZ', 'YUV', 'YCrCb']) {
  Python.forBlock[`cv2_COLOR_${color}2BGR`] = function(block) {
    Python.addImport('import cv2');
    const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
    const code = `cv2_cvtColor(${image}, cv2_COLOR_${color}2BGR)`;
    return [code, Python.ORDER_FUNCTION_CALL];
  };
}

Python.forBlock['cv2_imreadmulti'] = function(block) {
  Python.addImport('import cv2');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_ATOMIC) || "''";
  const code = `cv2_imreadMulti(${path})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_imwritemulti'] = function(block) {
  Python.addImport('import cv2');
  const images = Python.valueToCode(block, 'IMAGES', Python.ORDER_ATOMIC) || '[]';
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_ATOMIC) || "''";
  return `cv2_imwriteMulti(${path}, ${images})\n`;
};

Python.forBlock['cv2_imshow'] = function(block) {
  Python.addImport('import cv2');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const windowName = Python.valueToCode(block, 'WINDOW_NAME', Python.ORDER_ATOMIC) || "'Image'";
  return `cv2_imshow(${windowName}, ${image})\n`;
};

Python.forBlock['cv2_waitkey'] = function(block) {
  Python.addImport('import cv2');
  const delay = Python.valueToCode(block, 'DELAY', Python.ORDER_ATOMIC) || '0';
  const code = `cv2_waitKey(${delay})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_destroyallwindows'] = function(block) {
  Python.addImport('import cv2');
  return 'cv2_destroyAllWindows()\n';
};

Python.forBlock['cv2_destroywindow'] = function(block) {
  Python.addImport('import cv2');
  const windowName = Python.valueToCode(block, 'WINDOW_NAME', Python.ORDER_ATOMIC) || "''";
  return `cv2_destroyWindow(${windowName})\n`;
};

Python.forBlock['cv2_videocapture'] = function(block) {
  Python.addImport('import cv2');
  const device = Python.valueToCode(block, 'DEVICE', Python.ORDER_ATOMIC) || '0';
  const code = `cv2_VideoCapture(${device})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_videowriter'] = function(block) {
  Python.addImport('import cv2');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_ATOMIC) || "'output.avi'";
  const codec = Python.valueToCode(block, 'CODEC', Python.ORDER_ATOMIC) || "'MJPG'";
  const fps = Python.valueToCode(block, 'FPS', Python.ORDER_ATOMIC) || '20.0';
  const size = Python.valueToCode(block, 'SIZE', Python.ORDER_ATOMIC) || '(640, 480)';
  const code = `cv2_VideoWriter(${path}, cv2_VideoWriter_fourcc(*${codec}), ${fps}, ${size})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_read'] = function(block) {
  Python.addImport('import cv2');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_ATOMIC) || "''";
  const code = `cv2_imread(${path})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['cv2_write'] = function(block) {
  Python.addImport('import cv2');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_ATOMIC) || "'output.png'";
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  return `cv2_imwrite(${path}, ${image})\n`;
};