const randomPageNumber = require("./randomPageNumber");

test("randomPageNumber", () => {
  for (let i = 0; i < 1000; i++) {
    const n = randomPageNumber();

    expect(n).toBeGreaterThanOrEqual(5);
    expect(n).toBeLessThanOrEqual(40);
  }
});
