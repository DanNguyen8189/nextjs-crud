import { test, expect } from '@playwright/test';
// import TimeoutError from "@playwright/test";
// const playwright = require('playwright');


test('home page redirects to logs page', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Should be redirected to logs page
    await expect(page).toHaveURL('http://localhost:3000/logs')
});

test('click create new meltdown modal', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    await expect(page.getByText('New Meltdown')).toBeVisible();

    await page.getByText('New Meltdown').click();
    //await expect(page.locator("text=modal title")).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Submitnew' })).toBeVisible();
    await expect(page.getByPlaceholder('Title')).toBeVisible();
    //await expect(page.getByPlaceholder("Oh no what's happening?")).toBeVisible();
    //await page.getByRole('button', { name: /submit/i }).click();
});


// https://help.mantine.dev/q/portals-testing
test('new meltdown modal submit button not clickable until title filled', async ({ page }) => {
    await page.goto('http://localhost:3000/')

    await page.getByText('New Meltdown').click();

    const locator = page.getByRole('button', { name: 'submit' });
    await expect(locator).toBeDisabled();

    await page.getByPlaceholder('Title').fill('Title');
    await expect(locator).toBeEnabled();

});