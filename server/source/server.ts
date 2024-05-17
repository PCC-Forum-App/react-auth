import http from 'http';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import logging from './config/logging';
import config from './config/config';
import './config/passport';

const router = express();

/** Server Handling */
const httpServer = http.createServer(router);

/** Log the request */
router.use((req, res, next) => {
    logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

/** Parse the body of the request / Passport */
router.use(session(config.session));
router.use(passport.initialize());
router.use(passport.session());
router.use(express.urlencoded({ extended: false })); // Replaces Body Parser
router.use(express.json()); // Replaces Body Parser

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.header('origin'));
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // v to pass credential back and forth
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Passport & SAML Routes */
// pass in request response and next functions
router.get('/login', passport.authenticate('saml', config.saml.options), (req, res, next) => {
    //redirect user to client side after user authenticated
    return res.redirect('http://localhost:3000');
});
//for not authenticate with okta, this route will not be used
router.post('/login/callback', passport.authenticate('saml', config.saml.options), (req, res, next) => {
    //what okta(IDP) will call to help with log in
    return res.redirect('http://localhost:3000');
});
//what to do after the authentication route
router.get('/whoami', (req, res, next) => {
    if (!req.isAuthenticated()) {
        logging.info('User not authenticated');
        //return 401 for axios to boot back to login page
        return res.status(401).json({
            message: 'Unauthorized'
        });
    } else {
        //if authenticated
        logging.info('User authenticated');
        logging.info(req.user);
        //return 200 and retrun user as a json return
        return res.status(200).json({ user: req.user });
    }
});

/** Health Check */
router.get('/healthcheck', (req, res, next) => {
    return res.status(200).json({ messgae: 'Server is running!' });
});

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

httpServer.listen(config.server.port, () => logging.info(`Server is running on port ${config.server.port}`));
