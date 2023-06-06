import { chromium } from '@playwright/test';
import { expect } from '@playwright/test';
import { SignPage } from './pages/signInPage';

const authStorageState = '.auth/authentication.json'

import { email, validPassword, name } from './users/user.json';

export default async () => {
  const loginUrl = 'https://realworld.svelte.dev/login';

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const signIn = new SignPage(page);

  await signIn.gotoPageWithPath(loginUrl);
  await signIn.signIn(email, validPassword);
  expect(await signIn.isSignedIn(name)).toBeTruthy();
  await page.context().storageState({
    path: authStorageState,
  });
  await browser.close();
};