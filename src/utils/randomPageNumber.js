function randomPageNumber() {
  const max = 40;
  const min = 5;

  const randomPage = Math.floor(Math.random() * (max - min + 1) + min);

  return randomPage;
}

module.exports = randomPageNumber;
