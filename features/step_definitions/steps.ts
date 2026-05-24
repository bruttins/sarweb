import { Given, When, Then } from '@cucumber/cucumber';

Given ('I navigate to the SARweb home page', async function (this: any) {
    await this.tableGenerationPage.navigate();
})

Then ('the page title should contain {string}', async function (this: any, expectedTitle: string) {
    await this.tableGenerationPage.verifyPageTitle(expectedTitle);
})

When ('I enter the participant names:', async function (this: any, dataTable) {
    const participants = dataTable.raw().map((row: string[]) => row[0]);
    await this.tableGenerationPage.enterParticipantNames(participants);
    await this.tableGenerationPage.verifyCreateButtonEnabled();
})

When ('I create the table', async function (this:any) {
    await this.tableGenerationPage.createTable();
})

Then ('I should see a table generated for {int} participants', async function (this: any, numParticipants: number) {
    await this.tableGenerationPage.verifyRowCount(numParticipants);
})

Then ('the table should display the columns {string}, {string}, and {string}', async function (this: any, col1: string, col2: string, col3: string) {
    await this.tableGenerationPage.verifyColumns([col1, col2, col3]);
})