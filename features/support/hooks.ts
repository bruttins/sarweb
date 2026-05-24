import { BeforeAll, AfterAll, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import type { Browser, BrowserContext } from '@playwright/test';
import { TableGenerationPage } from '../pages/table_generation_page.ts';

setDefaultTimeout(10000);

let browser: Browser;

BeforeAll(async function () {
    browser = await chromium.launch({ headless: true });
});

Before(async function (this: any) {
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
    this.tableGenerationPage = new TableGenerationPage(this.page);
});

After(async function (this: any) {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
});

AfterAll(async function () {
    if (browser) await browser.close();
});