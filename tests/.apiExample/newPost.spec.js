//API test is not possible in this demo
//Here an example of structure of an api test in playwright     

import { test, expect } from '@playwright/test';

let apiContext;

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        baseURL: 'https://realworld.svelte.dev/',
        extraHTTPHeaders: {
            'Accept': 'application/json',
            'Authorization': `token ${process.env.API_TOKEN}`,
        },
    });
})

test.afterAll(async ({ }) => {
    await apiContext.dispose();
});

test('New Post verification', async () => {
    const newPost = await apiContext.post(`/editor`, {
        form: {
            title: "title",
            description: "description",
            body: "body",
            tag: "tag01"
        }
    });
    expect(newPost.ok()).toBeTruthy();
    expect(newPost.type).toEqual(303);
    expect(newPost.status).toEqual("redirect");
    expect(newPost.location).toContain("/article/title-");
});