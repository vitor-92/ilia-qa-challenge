export class HomePage {
    /**
     * @param {import('@playwright/test').Page} page
     */

    constructor(page) {
        this.page = page;
        this.articles = page.locator('div.article-preview');
        this.pageItem = page.locator('page-item');
        this.brand = page.locator('.navbar-brand');
        this.feedArticleAuthor = page.locator('.author');
        this.feedArticleDate = page.locator('.date');
        this.feedArticleBtnLike = page.locator('.article-meta').locator('button');
        this.feedArticleTitle = page.locator('.article-preview').locator('h1');
        this.feedArticleDescription = page.locator('.article-preview').locator('p');
        this.feedArticleReadMore = page.locator('.article-preview').locator('span', { hasText: 'Read more...' });
        this.feedArticleTags = page.locator('.article-preview').locator('.tag-list');
    }

    async gotoPage() {
        await this.page.goto('/');
    }

    async gotoTag(tagName) {
        await this.page.goto(`?tag=${tagName}`);
    }

    async articlesCount() {
        return this.articles.count();
    }

    checkTag(name) {
        return this.feedArticleTags.filter({ hasText: name });
    }
}