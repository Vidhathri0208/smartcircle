import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  try {
    await page.goto('http://localhost:3000/', { waitUntil: 'load', timeout: 10000 });
    await new Promise(r => setTimeout(r, 2000));
  } catch (e) {
    console.log('GOTO ERROR:', e.message);
  }
  await browser.close();
})();
