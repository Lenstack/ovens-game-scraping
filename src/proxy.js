const PROXIES = [
    //'http://localhost:8080',
];

module.exports = {
    PROXY: PROXIES[Math.floor(Math.random() * PROXIES.length)]
};