
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
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    expect(displayed).toBe(true)
    await driver.sleep(4000)
})

//Check that clicking the Draw button displays the div with id = “choices”
test("draw button displays div with id='choices'", async () => {
    await driver.findElement(By.xpath("//button[@id='draw']")).click()
    const displayed = await driver.findElement(By.xpath("//div[@id='choices']"))
    expect(displayed).toBe(true)
    await driver.sleep(4000)
})