import fs from 'fs';
import passport from 'passport';
import { Strategy } from 'passport-saml';
import config from './config';
import logging from './logging';

//array of express user provided by express session
const savedUsers: Express.User[] = [];

//a call back with the done function
passport.serializeUser<Express.User>((expressUser, done) => {
    logging.info(expressUser, 'Serialize User');
    
    done(null, expressUser);
});

passport.deserializeUser<Express.User>((expressUser, done) => {
    logging.info(expressUser, 'Deserialize User');

    done(null, expressUser);
});
//Passport authentication
passport.use(
    //a new strategy
    new Strategy(
        {
            //object block
            //options for passport
            issuer: config.saml.issuer,
            //https for ssl
            protocol: 'http://',
            //path that server side will hit once it authenticates
            path: '/login/callback',
            
            entryPoint: config.saml.entryPoint,
            //utf-8 encoding sync
            cert: fs.readFileSync(config.saml.cert, 'utf-8')
        },
        //call back function
        //need any interface for typescript to work
        (expressUser: any, done: any) => {
            //check to see if the user is already a saved user
            if (!savedUsers.includes(expressUser)) {
                //if not in, push it
                savedUsers.push(expressUser);
            }
            //return done
            return done(null, expressUser);
        }
    )
);
