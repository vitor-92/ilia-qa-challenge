import { test, expect } from '@playwright/test';

import { SignPage } from '../pages/signInPage';

import { email, validPassword, name, invalidPassword } from '../users/user';

test('Sign In - Valid user credentials', async ({ page }) => {
  const signPage = new SignPage(page);

  await signPage.gotoPage();
  await signPage.signIn(email, validPassword);

  expect(await signPage.isSignedIn(name)).toBeTruthy();
});

test('Sign In - Invalid user credentials', async ({ page }) => {
  const signPage = new SignPage(page);

  await signPage.gotoPage();
  await signPage.signIn(email, invalidPassword);
  
  await expect(signPage.loginErrorMessage).toHaveText('Something went wrong');
});

