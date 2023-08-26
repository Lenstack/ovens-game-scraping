const PROXIES = [
    //'http://localhost:3000',
];

module.exports = {
    PROXY: PROXIES[Math.floor(Math.random() * PROXIES.length)]
};