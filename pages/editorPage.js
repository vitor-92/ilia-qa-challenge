export class EditorPage {
    /**
     * @param {import('@playwright/test').Page} page
     */

    constructor(page) {
        this.page = page;
        this.inputArticleTitle = page.locator('[name="title"]');
        this.inputArticleDescription = page.locator('[name="description"]');
        this.inputArticleBody = page.locator('[name="body"]');
        this.inputArticleTags = page.getByPlaceholder('Enter tags');
        this.btnSubmit = page.locator('button', { hasText: 'Publish Article' });
        this.btnDeleteArticle = page.getByRole('button', { name: 'Delete Article' });
        this.articleTitle = page.locator('.banner').locator('h1');
        this.articleBody = page.locator('.article-content').locator('p');
        this.articleTags = page.locator('.tag-list').locator('.tag-pill');
        this.btnEditArticle = page.locator('.article-meta').locator('.btn-outline-secondary');
        this.errorMessage = page.locator('.error-messages');
    }

    async gotoPage() {
        await this.page.goto('/editor');
    }

    async gotoTag(tagName) {
        await this.page.goto(`?tag=${tagName}`);
    }

    async fillTitle(title) {
        await this.inputArticleTitle.type(title);
    }

    async fillDescription(description) {
        await this.inputArticleDescription.type(description);
    }

    async fillBody(body) {
        await this.inputArticleBody.type(body);
    }

    async fillTags(tags) {
        for (let i = 0; i < tags.length; i++) {
            await this.inputArticleTags.type(tags[i]);
            await this.inputArticleTags.press('Enter');
        }
    }

    async fillArticleData(title, description, body, tags) {
        await this.fillTitle(title);
        await this.fillDescription(description);
        await this.fillBody(body);
        await this.fillTags(tags);
    }

    async publishArticle() {
        await this.btnSubmit.click();
    }

    async deleteArticle() {
        await this.btnDeleteArticle.click();
    }
}