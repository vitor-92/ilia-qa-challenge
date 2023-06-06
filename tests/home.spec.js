import { test, expect } from '@playwright/test';

import { readFileSync } from 'fs';

import { HomePage } from '../pages/homePage';

test.use({ storageState: '.auth/authentication.json' });

test('Check article structure in global feed', async ({ page }) => {
  const data = readFileSync('responseData/oneArticle.json', 'utf8');

  await page.route('**/__data.json?x-sveltekit-invalidated=_1', (route) => {
    route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      contentType: 'application/json',
      body: data,
    });
  });

  const homePage = new HomePage(page);

  await homePage.gotoTag('welcome');
  await homePage.brand.click();

  expect(await homePage.articlesCount()).toEqual(1);
  await expect(homePage.feedArticleAuthor).toHaveText('Gerome');
  await expect(homePage.feedArticleDate).toHaveText('Wed Nov 24 2021');
  await expect(homePage.feedArticleBtnLike).toHaveText('3157');
  await expect(homePage.feedArticleTitle).toHaveText('Welcome to RealWorld project');
  await expect(homePage.feedArticleDescription).toHaveText('Exemplary fullstack Medium.com clone powered by React, Angular, Node, Django, and many more');
  await expect(homePage.feedArticleReadMore).toBeVisible();
  await expect(homePage.checkTag('Welcome')).toBeVisible();
  await expect(homePage.checkTag('introduction')).toBeVisible();
});

test('Check popular tags', async ({ page }) => {
  const data = readFileSync('responseData/oneArticle.json', 'utf8');

  await page.route('**/__data.json?x-sveltekit-invalidated=_1', (route) => {
    route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      contentType: 'application/json',
      body: data,
    });
  });

  const homePage = new HomePage(page);

  await homePage.gotoTag('welcome');
  await homePage.brand.click();

  expect(await homePage.articlesCount()).toEqual(1);
  expect(await page.locator('.sidebar').locator('.tag-pill').allTextContents()).toEqual(["implementations", "welcome", "introduction", "codebaseShow", "ipsum", "qui", "et", "cupiditate", "quia", "deserunt"]);
});

test('Check articles count by page', async ({ page }) => {
  const data = readFileSync('responseData/allArticlesFeed.json', 'utf8');

  await page.route('**/__data.json?x-sveltekit-invalidated=_1', (route) => {
    route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      contentType: 'application/json',
      body: data,
    });
  });

  const homePage = new HomePage(page);

  await homePage.gotoTag('welcome');
  await homePage.brand.click();
  await page.waitForLoadState('networkidle');
  
  expect(await homePage.articlesCount()).toEqual(10);
});



