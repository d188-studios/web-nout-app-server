function randomScore() {
  const max = 10;
  const min = 0;

  return Math.floor(Math.random() * (max - min + 1) + min) / 2;
}

module.exports = randomScore;
