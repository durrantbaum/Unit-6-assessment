const { Builder, Browser, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

let driver;

beforeEach(async function init() {
  let options = new chrome.Options();
  driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
});

afterEach(async function quit() {
  if (driver) {
    await driver.quit();
  };
});

describe("Duel Duo tests", () => {
  test("page loads with title", async () => {
    await driver.get("http://localhost:8000");
    await driver.wait(until.titleIs("Duel Duo"), 1000);
  });

  test('Clicking draw button displays div w/ id = “choices”', () => {
    document.body.innerHTML = `
      <div id="choices" style="display: none;"></div>
      <button id="draw-btn"></button>
    `;
    const drawBtn = document.getElementById('draw-btn');
    const choicesDiv = document.getElementById('choices');
    drawBtn.click();
    expect(choicesDiv.style.display).toBe('block');
  });

  test('Clicking "Add to Duo" button displays div w/ id = “player-duo”', () => {
    document.body.innerHTML = `
      <div id="player-duo" style="display: none;"></div>
      <button class="add-to-duo-btn"></button>
    `;
    const addToDuoBtn = document.querySelector('.add-to-duo-btn');
    const playerDuoDiv = document.getElementById('player-duo');
    addToDuoBtn.click();
    expect(playerDuoDiv.style.display).toBe('block');
  });
});
