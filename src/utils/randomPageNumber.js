function randomPageNumber() {
  const randomPage = Math.floor(Math.random() * 40);

  if (randomPage <= 5) randomPageNumber();
  return randomPage;
}

for (let i = 0; i <= randomPageNumber(); i++) {
  console.log(i);
}
module.exports = randomPageNumber;
