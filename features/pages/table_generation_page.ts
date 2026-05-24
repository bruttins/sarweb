import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class TableGenerationPage {
    private page: Page;
    private addNameButton: Locator;
    private createTableButton: Locator;
    private tableRows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addNameButton = page.getByText('Click to add another name');
        this.createTableButton = page.getByRole('button', { name: 'Create Table' });
        this.tableRows = page.locator('tr');
    }

    async navigate() {
        await this.page.goto('https://bruttins.github.io/sarweb/');
    }

    async verifyPageTitle(expectedTitle: string) {
        await expect(this.page).toHaveTitle(new RegExp(expectedTitle));
    }

    async enterParticipantNames(participants: string[]) {
        for (let i = 0; i < participants.length; i++) {
            const label = `Participant ${i + 1}`;
            if (i >= 4) {
                await this.addNameButton.click();
            }
            await this.page.getByRole('textbox', { name: label }).fill(participants[i]);
        }
    }

    async verifyCreateButtonEnabled() {
        await expect(this.createTableButton).toBeEnabled();
    }

    async createTable() {
        await this.createTableButton.click();
    }

    async verifyRowCount(expectedCount: number) {
        await expect(this.tableRows).toHaveCount(expectedCount + 1);
    }

    async verifyColumns(columns: string[]) {
        for (const column of columns) {
            await expect(this.page.getByRole('columnheader', { name: column })).toBeVisible();
        }
    }
}