# Examenopdracht Front-end Web Development / Web Services

> Schrap hierboven wat niet past

- Student: Musa Israilov
- Studentennummer: 079094mi
- E-mailadres: musa.israilov@student.hogent.be

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)




## Opstarten
Front-end Web Development: 

In de opdracht van front end moet je mijn my-app folder als de root folder zien ipv de 2223-frontendweb-misrailov folder.
Als je dus bijvoorbeeld de repo hebt gecloned is de eerste stap die je uitvoert:

-cd 2223-frontendweb-misrailov/my-app

Je moet uit deze folder eigenlijk alles uitvoeren

Dan installeer je alle modules:

-yarn install

Eenmaal dat je alle packages hebt kan je beginnen met de .env file aan te maken (in my-app natuurlijk).


### .env (frontend):
- NODE_ENV=development
- REACT_APP_AUTH0_DOMAIN={domain}
- REACT_APP_AUTH0_CLIENT_ID = {client ID}
- REACT_APP_AUTH0_AUDIENCE={audience} (zonder "\" op einde!)
- REACT_APP_API_URL={ website (localhost:9000 bij local db)/api}






Web Services:

Als je de repo hebt gecloned kan je direct al in de 2223-webservices-misrailov folder gaan.

- cd 2223-webservices-misrailov
- yarn install (modules installeren)

Dan moet je natuurlijk de env file aanmaken:

### .env (backend):
- NODE_ENV = development
- DATABASE_CLIENT = "mysql2"
- DATABASE_NAME = {naam van de database}
- DATABASE_USERNAME = {username waarmee je op de database kan inloggen}
- DATABASE_PASSWORD = {wachtwoord van de user waarmee je inlogt}
- DATABASE_HOST = {host van database dus bv localhost:3306}
- DATABASE_PORT = {database port}
- PORT = {PORT van je server: 9000 }
- AUTH_JWKS_URI= "https://{TENANT}/.well-known/jwks.json"
- AUTH_AUDIENCE= "{API-IDENTIFIER}"(zeker geen "/" op het einde)
- AUTH_ISSUER= "https://{TENANT}"
- AUTH_USER_INFO= "https://{TENANT}/userinfo"



## Testen



Web Services: Je moet een .env.test bestand aanmaken. Hierin zal je enkele dingen steken die ik zal opsommen.
### .env.test:
- AUTH_JWKS_URI= "https://{TENANT}/.well-known/jwks.json"
- AUTH_AUDIENCE= "{API-IDENTIFIER}"
- AUTH_ISSUER= "https://{TENANT}"
- AUTH_USER_INFO= "https://{TENANT}/userinfo"
- AUTH_TOKEN_URL= "https://{TENANT}/oauth/token"
- AUTH_CLIENT_ID= "{YOUR-CLIENT-ID}}"
- AUTH_CLIENT_SECRET= "{YOUR-CLIENT-SECRET}"
- AUTH_TEST_USER_ID= "{YOUR-TEST-USERS-AUTH0ID}"
- AUTH_TEST_USER_USERNAME= "{YOUR-TEST-USER-USERNAME}"
- AUTH_TEST_USER_PASSWORD= "{YOUR-TEST-USER-PASSWORD}"

Front-end Web Development: Om de testen uit te voeren in de front end moet je een file aanmaken genaamd cypress.emv.json. Hierin steek je enkele dingen die ik nu ga opsommen (de inhoud moet in haakjes {} ):

### cypress.env.json:
- "auth_audience": {AUDIENCE}(zeker geen "/" op het einde)
- "auth_url": {ISSUER}/oauth/token
- "auth_client_id": {CLIENT ID}
- "auth_client_secret": {CLIENT SECRET}
- "auth_username": {AUTH_TEST_USER_USERNAME}
- "auth_password": {AUTH_TEST_USER_PASSWORD}