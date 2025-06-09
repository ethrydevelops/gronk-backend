// TODO: socket.io later

const { createServer } = require('node:http');
const { createServer: createSecureServer } = require('node:https');
const path = require("path");
const fs = require('fs');
const logging = require("./console.js");
const colors = require("colors");

require("dotenv").config();

let proto;

const server = (app) => {
    let srv;

    if (process.env.HTTPS === "true") {
        if (!(process.env.HTTPS_KEY_PATH && process.env.HTTPS_CERT_PATH)) {
            logging.error("HTTPS_KEY_PATH and HTTPS_CERT_PATH must be populated with valid SSL certificate and private key.");
            throw new Error("HTTPS_KEY_PATH and HTTPS_CERT_PATH must be populated with valid SSL certificate and private key.");
        }

        const keyPath = path.resolve(__dirname, '..', process.env.HTTPS_KEY_PATH);
        const certPath = path.resolve(__dirname, '..', process.env.HTTPS_CERT_PATH);

        if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
            const sslOptions = {
                key: fs.readFileSync(keyPath),
                cert: fs.readFileSync(certPath),
            };
            srv = createSecureServer(sslOptions, app);
            logging.info("Protocol: 🔒 HTTPS");

            proto = "https";
        } else {
            throw new Error(`HTTPS key or certificate file not found at ${keyPath}, ${certPath}`)
        }
    } else {
        srv = createServer(app);
        logging.info("Protocol: HTTP" + colors.red(" *insecure*"));

        proto = "http";
    }

    return {
        listen: (port, callback) => srv.listen(port, callback),
        proto
    };
};

module.exports = { server };
