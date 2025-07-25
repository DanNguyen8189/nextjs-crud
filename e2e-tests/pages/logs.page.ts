import type { Page } from '@playwright/test'

export class LogsPage {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }
    async goto() {
        await this.page.goto('http://localhost:3000/logs')
        await this.page.waitForURL('http://localhost:3000/logs')
    }

    async filllog() {
        await this.page.getByText('New Meltdown').click();

        const locator = this.page.getByRole('button', { name: 'submit' });

        await this.page.getByPlaceholder('Title').fill('Title');
    }
}