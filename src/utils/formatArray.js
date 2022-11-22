function formatArray(scores) {
  let sqlArray = "{";
  for (let i = 0; i < scores.length; i++) {
    if (i == 0) {
      sqlArray += `${scores[i]}`;
    } else {
      sqlArray += `,${scores[i]}`;
    }
  }
  sqlArray += "}";

  return sqlArray;
}

module.exports = formatArray;
