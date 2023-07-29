const puppeteer = require("puppeteer");
const scrapper = async (steps, options, items) => {
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setViewport({width: 1920, height: 1080});

    try {
        console.log("Starting");
        for (const item of items) {
            for (const step of steps) {
                console.log(`Running step: ${step.name}`);
                await step.run(page, item);
            }
        }
        console.log("Finished");
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        await browser.close();
    }
}
module.exports = scrapper;