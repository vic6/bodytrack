// metric units
const calculateBodyFat = (height, waist, neck, hip, sex) => {
  let bodyFat;
  if (sex === 'm') {
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log(waist - neck) + 0.15456 * Math.log(height)) - 450;
  } else if (sex === 'w') {
    bodyFat =
      495 / (1.29579 - 0.35004 * Math.log(waist + hip - neck) + 0.221 * Math.log(height)) - 450;
  }
  return bodyFat;
};

export default calculateBodyFat;
