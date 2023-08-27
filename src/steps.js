const email = process.env.EMAIL;
const password = process.env.PASSWORD;

const steps = [
    {
        name: "https://profit-pie.com/login.php",
        run: async (page) => {
            await page.goto('https://profit-pie.com/login.php', {waitUntil: 'load', timeout: 0});
            await page.waitForSelector('body');
        },
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
        name: "Submit login form",
        run: async (page) => {
            await page.waitForSelector('.btn-primary');
            await Promise.all([
                page.click('.btn-primary'),
                page.waitForNavigation()
            ]);
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
        name: "Recollection",
        run: async (page) => {
            let round = 0;
            console.log(`Starting recollection with ${ovens.length} oven`);
            while (round < 1000) {
                console.log(`Round ${round}`);
                for (const oven of ovens) {
                    try {
                        const ovenCode = oven.code;
                        console.log(`Running Recollection: ${ovenCode}`);

                        await page.waitForSelector(`#btnCollect_${ovenCode}`);
                        await page.$eval(`#btnCollect_${ovenCode}`, el => {
                            el.click();
                        });

                        await page.waitForSelector(`.swal2-confirm`);
                        await page.$eval(`.swal2-confirm`, el => {
                            el.click();
                        });

                        await page.waitForSelector(`[href="?bake=${ovenCode}"]`);
                        await page.$eval(`[href="?bake=${ovenCode}"]`, el => {
                            el.click();
                        });

                        await page.waitForSelector(`.swal2-confirm`);
                        await page.$eval(`.swal2-confirm`, el => {
                            el.click();
                        });
                    } catch (error) {
                        console.error("An error occurred:", error);
                    }
                }
                console.log("Waiting 5 second before next round");
                round++;
                await new Promise((resolve) => setTimeout(resolve, 5000));
            }
        }
    },
]

const minimal_args = [
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
];

const options = {
    headless: false,
    args: minimal_args
}

const items = [
    {
        search: "",
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
    {code: 11682},
    {code: 23104},
    {code: 23105},
    {code: 23106},
    {code: 23107},
    {code: 23108},
    {code: 23109},
    {code: 23110},
    {code: 23111},
    {code: 23112},
    {code: 23114},
    {code: 23115},
    {code: 23116},
    {code: 29484},
    {code: 29493},
    {code: 29495},
    {code: 29496},
    {code: 29497},
    {code: 29498},
    {code: 29500},
    {code: 29501},
    {code: 29503},
    {code: 29504},
    {code: 29505},
];

module.exports = {steps, options, items};