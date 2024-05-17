const config = {
    saml: {
        cert: './source/config/saml.pem', //whenn you build
        entryPoint: 'https://trial-2732474.okta.com/app/trial-2732474_samldemo_1/exkecnkxk9otUUj7s697/sso/saml',
        issuer: 'http://localhost:2000',
        options: {
            failureRedirect: '/login',
            failureFlash: true
        }
    },
    server: {
        port: 2000
    },
    session: {
        resave: false,
        secret: 'supersecretamazingpassword', //can put anything i like
        saveUninitialized: true
    }
};

export default config;
