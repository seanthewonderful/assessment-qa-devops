
import { Builder, Capabilities, By } from "selenium-webdriver"
import { findAncestor } from "typescript"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://localhost:3000/')
})

afterAll(async () => {
    driver.quit()
})

test('Title shows up when page loads', async () => {
    // const title = await driver.findElement(By.id('title'))
    // const displayed = await title.isDisplayed()
    const displayed = await (driver.findElement(By.id('title'))).isDisplayed()
    expect(displayed).toBe(true)
    await driver.sleep(1000)
})

test('Make sure all bots appear when button clicked', async () => {
    let allBtn = await driver.findElement(By.id('see-all'))
    await allBtn.click()
    let displayedBots = await driver.findElement(By.xpath('(//div[@id="all-bots"]/div[@class="bot-card outline"])[1]'))
    // const displayed = await displayedBots.isDisplayed()
    // expect(displayed).toBe(true) 
    // merged above 2 lines into one below
    expect(await displayedBots.isDisplayed()).toBe(true)
    await driver.sleep(2000)
})

test('When bot is removed from duo, it goes back to "choices"', async () => {
    let choices = driver.findElement(By.id('choices'))
    await (driver.findElement(By.id('drawBtn')).click())
    let bot1 = driver.findElement(By.xpath('(//button[text()="Remove from Duo"])'))
    await bot1.click()
    let putBack = driver.findElement(By.xpath('(//button[text()="Remove from Duo"])'))
    await putBack.click()
    expect(choices).toContain(bot1)
})

//Check that clicking the Draw button displays the div with id = “choices”
// test("draw button displays div with id='choices'", async () => {
//     await driver.findElement(By.xpath("//button[@id='draw']")).click()
//     const displayed = await driver.findElement(By.xpath("//div[@id='choices']"))
//     expect(displayed).toBe(true)
//     await driver.sleep(4000)
// })