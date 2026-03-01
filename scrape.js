
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;
  const seeds = [10,11,12,13,14,15,16,17,18,19];

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`; 
    console.log(`Visiting ${url}`);

    await page.goto(url);
    await page.waitForSelector("table");

    const numbers = await page.$$eval("table td", cells =>
      cells.map(cell => parseFloat(cell.innerText))
           .filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed} sum: ${pageSum}`);

    totalSum += pageSum;
  }

  console.log("=================================");
  console.log("FINAL TOTAL:", totalSum);
  console.log("=================================");

  await browser.close();
})();









