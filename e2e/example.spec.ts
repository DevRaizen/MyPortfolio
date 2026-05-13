import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://devraizen.github.io/MyPortfolio/');
});

test('should load the homepage', async ({ page }) => {
  await expect(page.getByText('Shawn Michael Bulos')).toBeVisible();
});

test('should scroll to skills section', async ({ page }) => {
  await page.getByRole('button', { name: 'Skills' }).click();
  await expect(page.locator('#skills')).toBeVisible();
});

test('should scroll to projects section', async ({ page }) => {
  await page.getByRole('button', { name: 'Projects' }).click();
  await expect(page.locator('#projects')).toBeVisible();
});

test('should scroll to contact section', async ({ page }) => {
  await page.getByRole('button', { name: 'Contact' }).click();
  await expect(page.locator('#contact')).toBeVisible();
});

test('should open chat widget', async ({ page }) => {
  await page.getByText('Chat with Shawn').click();
  await expect(page.getByPlaceholder('Type a message...')).toBeVisible();
});

test('should send a message in chat', async ({ page }) => {
  await page.getByText('Chat with Shawn').click();
  await page.getByPlaceholder('Type a message...').fill('Hello');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.getByText('Hello')).toBeVisible();
});

test('should toggle mobile menu', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByText('☰').click();
  await expect(page.getByRole('button', { name: 'Home' })).toBeVisible();
});

test('should send a message in chat and wait for gemini response', async ({
  page,
}) => {
  await page.getByText('Chat with Shawn').click();

  // Count existing messages before sending
  const before = await page.locator('.bg-white\\/10').count();

  await page.getByPlaceholder('Type a message...').fill('Hello');
  await page.getByRole('button', { name: 'Send' }).click();

  // Wait until a new bot message appears
  await expect(page.locator('.bg-white\\/10')).toHaveCount(before + 1, {
    timeout: 15000,
  });
});