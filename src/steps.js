const email = process.env.EMAIL;
const password = process.env.PASSWORD;

const steps = [
    {
        name: "https://profit-pie.com/ovens.php",
        run: async (page) => {
            await page.goto('https://profit-pie.com/ovens.php');
        },
    },
    {
        name: "Go to login page",
        run: async (page) => {
            await page.waitForSelector('.content_buttons [href="login.php"]');
            await Promise.all([
                page.click('.content_buttons [href="login.php"]'),
                page.waitForNavigation()
            ]);
        }
    },
    {
        name: "Fill in login form",
        run: async (page) => {
            await page.waitForSelector('[name="email"]:not([disabled])');
            await page.type('[name="email"]', email);
        }
    },
    {
        name: "Fill in password form",
        run: async (page) => {
            await page.waitForSelector('[name="password"]:not([disabled])');
            await page.type('[name="password"]', password);
            await page.waitForSelector('.btn-primary');
        }
    },
    {
        name: "wait 15 seconds",
        run: async (page) => {
            await page.waitForTimeout(15000);
        }
    },
    {
        name: "Submit login form",
        run: async (page) => {
            await page.waitForSelector('.btn-primary');
            await page.click('.btn-primary');
        }
    },
    {
        name: "Go to ovens page",
        run: async (page) => {
            await page.waitForSelector('.col:nth-child(3) .fw-bold');
            await Promise.all([
                page.click('.col:nth-child(3) .fw-bold'),
                page.waitForNavigation()
            ]);
        }
    },
    {
        name: "Take Screenshot",
        run: async (page) => {
            await page.screenshot({path: `screenshots/${new Date().valueOf()}.png`});
        },
    },
    {
        name: "Recollection",
        run: async (page) => {
            while (true) {
                for (let i = 0; i < ovens.length; i++) {
                    const oven = ovens[i];
                    console.log(`Running step: ${oven.code}`);

                    // Click on <a> "Collect 1 pies" and await navigation
                    await page.waitForSelector(`#btnCollect_${oven.code}`);
                    await Promise.all([
                        page.click(`#btnCollect_${oven.code}`),
                        page.waitForNavigation()
                    ]);

                    // Click on <button> "OK"
                    await page.waitForSelector(`.swal2-confirm`);
                    await page.click(`.swal2-confirm`);

                    // Click on <a> "Bake 1 pies" and await navigation
                    await page.waitForSelector(`[href="?bake=${oven.code}"]`);
                    await Promise.all([
                        page.click(`[href="?bake=${oven.code}"]`),
                        page.waitForNavigation()
                    ]);

                    // Click on <button> "OK"
                    await page.waitForSelector(`.swal2-confirm`);
                    await page.click(`.swal2-confirm`);
                }
                console.log("Waiting 1 minute");
                await new Promise((resolve) => setTimeout(resolve, 65 * 1000));
            }
        }
    },
    {
        name: "Take Screenshot",
        run: async (page) => {
            await page.screenshot({path: `screenshots/${new Date().valueOf()}.png`});
        },
    },
]
const options = {
    headless: false,
    slowMo: 20,
}

const items = [
    {
        search: "Gotou Hitori",
    },
]

const ovens = [
    {code: 10906},
    {code: 11130},
    {code: 11131},
    {code: 11132},
    {code: 11133},
    {code: 11134},
    {code: 11135},
    {code: 11136},
    {code: 11138},
    {code: 11139},
    {code: 11140},
    {code: 11141},
    {code: 11143},
    {code: 11144},
    {code: 11145},
    {code: 11146},
    {code: 11147},
    {code: 11148},
    {code: 11149},
    {code: 11150},
    {code: 11151},
    {code: 11152},
    {code: 11153},
    {code: 11157},
    {code: 11677},
    {code: 11678},
    {code: 11679},
    {code: 11680},
    {code: 11682}
];

module.exports = {steps, options, items};