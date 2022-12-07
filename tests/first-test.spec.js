import {test, expect} from "@playwright/test";

test.describe('My first test suite', () => {

    test("Simple basic test", async ({page}) => {

        //Visit site
        await page.goto("https://www.example.com")

        //Set locator to page
        const pageTitle = await page.locator('h1')
        await expect(pageTitle).toContainText('Example Domain')

    })

    test('Clicking elements', async ({page}) => {

        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
        await page.click('text=Sign in')

        const errorMessageError = await page.locator('.alert-error')
        await expect(errorMessageError).toContainText('Login and/or password are wrong.')

    })

    test.skip("Selectors", async ({page}) => {
        //by text
        await page.click('text=some text')

        //by css selector
        await page.click('button')
        await page.click('#id')
        await page.click('.class')

        //only visible css selector
        await page.click('submit-button:visible')

        //combo
        await page.click('#username .first')

        //xpath
        await page.click('//button')

    })

    test('Working with inputs', async ({page}) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')

        await page.type("#user_login", 'some username')
        await page.type("#user_password", 'somepassword')

        await page.click('text=Sign in')

        const errorMessageError = await page.locator('.alert-error')
        await expect(errorMessageError).toContainText('Login and/or password are wrong.')
    })

    //npx playwright test --grep[-invert]=@customTag
    test('Assertions @customTag', async ({page}) => {
        await page.goto("https://www.example.com")
        await expect(page).toHaveURL('https://www.example.com')
        await expect(page).toHaveTitle('Example Domain')

        const element = await page.locator('h1')
        await expect(element).toBeVisible()
        await expect(element).toHaveText("Example Domain")
        await expect(element).toHaveCount(1)

        const nonExistingElement = await page.locator('h5')
        await expect(nonExistingElement).not.toBeVisible()
    })

    test('Screenshot @screen', async ({page}) => {
        await page.goto("https://www.example.com")
        await page.screenshot({path: 'screenshot.png', fullPage: true})
    })

})
