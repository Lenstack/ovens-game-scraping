const {steps, options, items} = require("./steps");
const scrapper = require("./scrapper");

(async () => {
    await scrapper(steps, options, items);
})()