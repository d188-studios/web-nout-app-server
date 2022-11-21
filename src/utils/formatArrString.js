function formatArrString(stringArray) {
  let sqlArray = "[";
  for (let i = 0; i < stringArray.length; i++) {
    if (i == 0) {
      sqlArray += `"${stringArray[i]}"`;
    } else {
      sqlArray += `,"${stringArray[i]}"`;
    }
  }
  sqlArray += "]";

  return sqlArray;
}

module.exports = formatArrString;
