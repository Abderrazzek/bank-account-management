const { Builder, By, Key, until, Capabilities } = require("selenium-webdriver");

function getRandomId(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe("Accounts test", () => {
  let driver;

  beforeAll(() => {
    driver = new Builder()
      .usingServer(`http://localhost:3000/`)
      .withCapabilities(Capabilities.chrome())
      .build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("accounts redirection test", async () => {
    await driver.get("http://localhost:3000/");
    expect(
      await driver.findElement(By.css('a[href="/accounts"]')).getText()
    ).toBe("Accounts");
  }, 1000000);

  test("create new account test", async () => {
    await driver.get("http://localhost:3000/");
    await driver.findElement(By.css("#create-new-account-btn")).click();
    await driver.wait(until.elementLocated(By.css("#new-account-form")));
    await driver
      .findElement(By.css("#ownerId"))
      .sendKeys(getRandomId(1, 10000).toString());
    await driver.findElement(By.css("#firstName")).sendKeys("Alex");
    await driver.findElement(By.css("#lastName")).sendKeys("Wounder");
    await driver.findElement(By.css("#currency")).sendKeys("E", Key.ENTER);
    await driver.findElement(By.css("#balance")).sendKeys("1000");
    await driver.findElement(By.css("#submit-new-account-btn")).click();
  }, 1000000);
});
