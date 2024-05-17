# React / Express SAML Login (Using Okta)

![N|Solid](https://lh3.googleusercontent.com/a-/AOh14GglnMoBPixoeH-IwaCWx7SpehtvYTPowns21fVO=s200-k-no-rp-mo)

# Installation Process

Server side(localhost:2000) set up:
Installation:
-In the directory server,
-npm install express-session passport passport-saml
-npm install --save-dev @types/passport @types/passport-saml @types/express-session
-npm install -g ts-node-dev before running server.ts to set up server

Client side(localhost:3000) set up:
In the directory client:
-npm install axios

If program is working:
-On sign in click to OKTA should post to login call back and that returns to frontend
-Frontend then calls the whoami route again to get an object with user information


