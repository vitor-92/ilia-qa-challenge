import { test, expect } from '@playwright/test';

import { EditorPage } from '../pages/editorPage';

test.use({ storageState: '.auth/authentication.json' });

test('Publish an article', async ({ page }) => {
  page.on('response', async (response) => {
    if (response.request().url().includes('/editor')) {
      const contentType = response.headers()['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const responseBody = await response.json();
        expect(responseBody.status).toEqual(303);
      }
    }
  });

  const editorPage = new EditorPage(page);

  await editorPage.gotoPage();
  await editorPage.fillArticleData('Title', 'Description', 'Body', ['Tag01', 'Tag02']);
  await editorPage.publishArticle();

  await expect(editorPage.articleTitle).toHaveText('Title');
  await expect(editorPage.articleBody).toHaveText('Body');
  expect(await editorPage.articleTags.allInnerTexts()).toEqual(['Tag01', 'Tag02']);

  await editorPage.deleteArticle();
});

test('Delete an article', async ({ page }) => {
  page.on('response', async (response) => {
    if (response.request().url().includes('/deleteArticle')) {
      const contentType = response.headers()['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const responseBody = await response.json();
        expect(responseBody.status).toEqual(307);
      }
    }
  });

  const editorPage = new EditorPage(page);

  await editorPage.gotoPage();
  await editorPage.fillArticleData('To Delete', 'Description', 'Body', ['Delete']);
  await editorPage.publishArticle();

  await expect(editorPage.articleTitle).toHaveText('To Delete');

  await editorPage.deleteArticle();
});

test('Validate required fields', async ({ page }) => {
  const editorPage = new EditorPage(page);

  await editorPage.gotoPage();
  await editorPage.publishArticle();

  await expect(editorPage.errorMessage).toHaveText('title can\'t be blank');

  await editorPage.fillTitle('Validate required fields');
  await editorPage.publishArticle();

  await expect(editorPage.errorMessage).toHaveText('description can\'t be blank');

  await editorPage.fillDescription('Validate');
  await editorPage.publishArticle();

  await expect(editorPage.errorMessage).toHaveText('body can\'t be blank');
});

