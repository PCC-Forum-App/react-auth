import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logging from './config/logging';

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    // loading for authentication purposes
    const [loading, setLoading] = useState<boolean>(true);
    // email to grab the email from OKTA SAML integration
    const [email, setEmail] = useState<string>('');
    //
    useEffect(() => {
        //just console log to check
        logging.info('Initiating SAML check.', 'SAML');

        axios({
            method: 'GET',
            //get url from backend
            url: 'http://localhost:2000/whoami',
            //the whoami route gets the credentials
            //with this, axios can tell backend to activate credentials
            //section for passport and express to authenticate
            withCredentials: true
        })
            //if authorized will go to the then block
            .then((response) => {
                logging.info(response.data.user, 'SAML');
                //response.data.user.nameID has an email
                //this is sent from express
                if (response.data.user.nameID) {
                    setEmail(response.data.user.nameID);
                    setLoading(false);
                } else {
                    //don't have a nameID, then redirect to login
                    RedirectToLogin();
                }
            })
            .catch((error) => {
                logging.error(error, 'SAML');
                RedirectToLogin();
            });
    }, []);

    const RedirectToLogin = () => {
        //check to see if authenticated or not. if not redirect to
        //backend(2000) and authenticate //2000 is the login page like OKTA
        window.location.replace('http://localhost:2000/login');
    };

    if (loading) return <p>loading ...</p>;

    return <p>Hello {email}!</p>;
};

export default Application;
