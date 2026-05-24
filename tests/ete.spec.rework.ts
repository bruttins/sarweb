import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://bruttins.github.io/sarweb/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/SARweb/);
});

test('full form happy path', async ({ page }) => {
  await page.goto('https://bruttins.github.io/sarweb/');
  await page.getByRole('textbox', { name: 'Participant 1' }).click();
  await page.getByRole('textbox', { name: 'Participant 1' }).fill('Sabi');
  await page.getByRole('textbox', { name: 'Participant 2' }).fill('Reto');
  await page.getByRole('textbox', { name: 'Participant 3' }).fill('Charly');
  await page.getByRole('textbox', { name: 'Participant 4' }).fill('Isi');
  const createButton = page.getByRole('button', { name: 'Create Table' });
  await expect(createButton).toBeEnabled();
  await page.getByText('Click to add another name').click();
  await page.getByRole('textbox', { name: 'Participant 5' }).click();
  await page.getByRole('textbox', { name: 'Participant 5' }).fill('Roseline');
  await page.getByRole('button', { name: 'Create table' }).click();

  await expect(page.getByRole('columnheader', { name: 'Round' })).toBeVisible();
  await expect(page.getByText('Observer')).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Idle' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '5' })).toBeVisible();
});

test('assert fields and introtext', async ({ page }) => {
  await page.goto('https://bruttins.github.io/sarweb/');
  await expect(page.getByRole('heading', { name: 'SARweb' })).toBeVisible();
  await expect(page.getByText('Welcome to SARweb, your go-to')).toBeVisible();
  await expect(page.getByText('Enter (human) participant')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Participant 4' })).toBeVisible();
  await expect(page.locator('#name-form div').filter({ hasText: 'Click to add another name' })).toBeVisible();
});

test('create table not clickable at three fills', async ({ page }) => {
  await page.goto('https://bruttins.github.io/sarweb/');
  await page.getByRole('textbox', { name: 'Participant 1' }).click();
  await page.getByRole('textbox', { name: 'Participant 1' }).fill('Nina');
  await page.getByRole('textbox', { name: 'Participant 2' }).fill('Sabi');
  await page.getByRole('textbox', { name: 'Participant 3' }).fill('Peter');

  const createButton = page.getByRole('button', { name: 'Create Table' });
  await expect(createButton).toBeDisabled();
});

test('maximum of 7 fields appear', async ({ page }) => {
  await page.goto('https://bruttins.github.io/sarweb/');
  const addField = page.getByText('Click to add another name');
  await page.getByText('Click to add another name').click();
  await page.getByText('Click to add another name').click();
  await page.getByText('Click to add another name').click();
  await expect(addField).not.toBeVisible();
});