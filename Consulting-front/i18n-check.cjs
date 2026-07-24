const { chromium } = require('playwright');

const BASE = 'http://localhost:5176';
const pages = ['/', '/business', '/direito', '/tech', '/join', '/about'];

async function switchToEnglish(page) {
  // hover over lang wrap to open menu, then click EN (exact match to avoid
  // matching substrings like "Engenharia")
  const langCurrent = page.getByText('PT', { exact: true }).first();
  await langCurrent.hover();
  await page.waitForTimeout(300);
  const enOpt = page.getByText('EN', { exact: true }).first();
  await enOpt.click({ force: true });
  await page.waitForTimeout(300);
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`${page.url()} :: ${msg.text()}`);
  });
  page.on('pageerror', (err) => {
    consoleErrors.push(`${page.url()} :: pageerror :: ${err.message}`);
  });

  for (const route of pages) {
    const url = BASE + route;
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(500);

    const slug = route === '/' ? 'home' : route.replace(/\//g, '');

    // PT screenshot (default)
    await page.screenshot({ path: `screenshots/${slug}-pt.png`, fullPage: false });

    // grab body text to scan for raw i18n keys like "tech.hero.title"
    const bodyText = await page.evaluate(() => document.body.innerText);
    const rawKeyMatches = bodyText.match(/\b[a-zA-Z]+(\.[a-zA-Z0-9]+){2,}\b/g) || [];

    // Toggle to English
    try {
      await switchToEnglish(page);
    } catch (e) {
      console.log(`[${route}] could not toggle language: ${e.message}`);
    }
    await page.waitForTimeout(500);
    await page.screenshot({ path: `screenshots/${slug}-en.png`, fullPage: false });

    const bodyTextEn = await page.evaluate(() => document.body.innerText);
    const rawKeyMatchesEn = bodyTextEn.match(/\b[a-zA-Z]+(\.[a-zA-Z0-9]+){2,}\b/g) || [];

    console.log(`=== ${route} ===`);
    console.log('PT raw-key-like matches:', rawKeyMatches.slice(0, 10));
    console.log('EN raw-key-like matches:', rawKeyMatchesEn.slice(0, 10));
  }

  console.log('=== CONSOLE ERRORS ===');
  console.log(consoleErrors.length ? consoleErrors.join('\n') : 'none');

  await browser.close();
})();
