function randomProfesion() {
  const profesions = ["Maestro", "Alumno", "Otro"];
  const max = 2;
  const min = 0;

  const n = Math.floor(Math.random() * (max - min + 1) + min);

  return profesions[n];
}

module.exports = randomProfesion;
