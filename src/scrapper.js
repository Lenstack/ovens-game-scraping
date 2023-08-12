const puppeteer = require("puppeteer");
const PCR = require("puppeteer-chromium-resolver");

const scrapper = async (steps, options, items) => {
    const stats = await PCR({});
    const browser = await puppeteer.launch({...options, executablePath: stats.executablePath});
    const page = await browser.newPage();
    await page.setViewport({width: 1920, height: 1080});
    await page.setRequestInterception(true);

    const rejectRequestPattern = [
        "googlesyndication.com",
        "/*.doubleclick.net",
        "/*.amazon-adsystem.com",
        "/*.adnxs.com",
    ];
    const blockList = [];

    page.on("request", (request) => {
        if (rejectRequestPattern.find((pattern) => request.url().match(pattern))) {
            blockList.push(request.url());
            request.abort();
        } else request.continue();
    });

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