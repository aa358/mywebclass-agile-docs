// Task 1: Create learning modules for each topic, including text-based content, interactive exercises, and assignments.

const { test, expect } = require('@playwright/test');

test('Create learning module', async ({ page }) => {
  await page.goto('https://mywebclass.org');

  // Navigate to the create module page
  await page.click('text=Create Module');

  // Fill out module form
  await page.fill('#title', 'Introduction to Software Engineering');
  await page.fill('#description', 'Learn the basics of software engineering and the software development process.');
  await page.click('#add-topic');
  await page.fill('#topic-1', 'Introduction to programming');
  await page.fill('#content-1', 'In this module, you will learn the basics of programming.');
  await page.fill('#exercise-1', 'Write a program that prints "Hello World" to the console.');
  await page.fill('#assignment-1', 'Create a simple calculator program.');

  // Submit the module form
  await page.click('text=Submit');

  // Verify that the module was created
  expect(await page.isVisible(`text=Introduction to Software Engineering`)).toBeTruthy();
});

// Task 2: Build a search feature that allows users to easily find learning modules based on topic, level, or keyword.

const { test, expect } = require('@playwright/test');

test('Search for learning module', async ({ page }) => {
  await page.goto('https://mywebclass.org');

  // Enter search term and submit
  await page.fill('#search', 'programming');
  await page.click('#search-submit');

  // Verify that search results are displayed
  expect(await page.isVisible(`text=Introduction to Software Engineering`)).toBeTruthy();
  expect(await page.isVisible(`text=Introduction to programming`)).toBeTruthy();
});

//Task 3: Implement a recommendation feature that displays recommended learning modules on the user's dashboard or on relevant pages.

const { test, expect } = require('@playwright/test');

test('Display recommended modules', async ({ page }) => {
  await page.goto('https://mywebclass.org');

  // Login with user account
  await page.click('text=Login');
  await page.fill('#username', 'myusername');
  await page.fill('#password', 'mypassword');
  await page.click('text=Submit');

  // Verify that recommended modules are displayed
  expect(await page.isVisible(`text=Recommended Modules`)).toBeTruthy();
  expect(await page.isVisible(`text=Introduction to Algorithms`)).toBeTruthy();
});

// Task 4: Provide users with the ability to provide feedback on the recommendations they receive to further improve the recommendation feature.

const { test, expect } = require('@playwright/test');

test('Provide feedback on recommended modules', async ({ page }) => {
  await page.goto('https://mywebclass.org');

  // Login with user account
  await page.click('text=Login');
  await page.fill('#username', 'myusername');
  await page.fill('#password', 'mypassword');
  await page.click('text=Submit');

  // Provide feedback on recommended module
  await page.click(`text=Introduction to Algorithms`);
  await page.selectOption('#feedback', 'Not interested');
  await page.fill('#comments', 'I prefer more practical topics.');

  // Submit feedback
  await page.click('text=Submit');

  // Verify that feedback was submitted successfully
  expect(await page.isVisible(`text=Thank you for your feedback!`)).toBeTruthy();
});

// Task 5: Set up Google Analytics on the website and ensure that it is properly tracking user behavior and website performance.
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to website
  await page.goto('https://mywebclass.org');

  // Set up Google Analytics tracking code
  await page.evaluate(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_TRACKING_ID');
  });

  // Click around and perform actions to generate user behavior
  await page.click('#nav-about');
  await page.click('#module-1');
  await page.type('#assignment-1', 'Code solution');
  await page.click('#submit-assignment');

  // Wait for some time to let Google Analytics track user behavior
  await page.waitForTimeout(5000);

  // Check that Google Analytics is properly tracking user behavior
  const gaRequests = await page.waitForRequest(req => req.url().includes('google-analytics.com'), {timeout: 10000});
  expect(gaRequests.length).toBeGreaterThan(0);

  await browser.close();
})();
