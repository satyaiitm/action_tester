const { chromium } = require('playwright');
const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=10',
  'https://sanand0.github.io/tdsdata/js_table/?seed=11',
  'https://sanand0.github.io/tdsdata/js_table/?seed=12',
  'https://sanand0.github.io/tdsdata/js_table/?seed=13',
  'https://sanand0.github.io/tdsdata/js_table/?seed=14',
  'https://sanand0.github.io/tdsdata/js_table/?seed=15',
  'https://sanand0.github.io/tdsdata/js_table/?seed=16',
  'https://sanand0.github.io/tdsdata/js_table/?seed=17',
  'https://sanand0.github.io/tdsdata/js_table/?seed=18',
  'https://sanand0.github.io/tdsdata/js_table/?seed=19'
];

(async () => {
  const totalSum = { seed10: 0, seed11: 0, seed12: 0, seed13: 0, seed14: 0, seed15: 0, seed16: 0, seed17: 0, seed18: 0, seed19: 0 };
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  
  for (const url of urls) {
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Wait for tables to load (dynamic content)
    await page.waitForSelector('table');
    
    // Extract all numbers from table cells
    const numbers = await page.evaluate(() => {
      const nums = [];
      document.querySelectorAll('table td, table th').forEach(cell => {
        const text = cell.textContent.trim();
        const num = parseFloat(text);
        if (!isNaN(num)) nums.push(num);
      });
      return nums;
    });
    
    const pageSum = numbers.reduce((a, b) => a + b, 0);
    const seed = url.match(/seed=(\d+)/)[1];
    totalSum[`seed${seed}`] = pageSum;
    
    console.log(`Seed ${seed} sum: ${pageSum}`);
    await page.close();
  }
  
  await browser.close();
  
  const grandTotal = Object.values(totalSum).reduce((a, b) => a + b, 0);
  console.log(`\n🎉 GRAND TOTAL SUM OF ALL TABLES: ${grandTotal}`);
  console.log('Email verification step: 22f3003016@ds.study.iitm.ac.in');
})();
