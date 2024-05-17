const config = {
    //saml assertion code block for passport
    saml: {
        //certificate
        //for build './build/config...'
        //cmt for saml.pem - put X509 certificate in that file
        cert: './source/config/saml.pem', //whenn you build
        //entry point
        entryPoint: 'https://trial-2732474.okta.com/app/trial-2732474_samldemo_1/exkecnkxk9otUUj7s697/sso/saml',
        //issuer
        issuer: 'http://localhost:2000',
        //options block settings for saml setup
        options: {
            //if failed redirect to /login
            failureRedirect: '/login',
            //set to true
            failureFlash: true
        }
    },
    server: {
        //sever side
        port: 2000
    },
    session: {
        //express session settings
        resave: false,
        secret: 'supersecretamazingpassword', //can put anything i like
        saveUninitialized: true
    }
};

export default config;
