const randomScore = require("./randomScore");

test("randomPageNumber", () => {
  for (let i = 0; i < 1000; i++) {
    const n = randomScore();
    expect([0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]).toContain(n);
  }
});
