function probabilityOf(percentage) {
  const randomNumber = Math.floor(Math.random() * 100);

  if (randomNumber <= percentage) return true;

  return false;
}

module.exports = probabilityOf;
