# Open Source Team Management tool. Yokk! beta
 
Yokk! is a service which helps you manage your team. In general, the first version is an aggregator of time-tracking systems. Yokk! can fetch time-entries from services e.g. Redmine or Upwork and shows all data in one place. Service is very helpful for managers or teamleaders.

### Installation
First of all you should clone files from the git, then create .env file in root folder. Here is sample configuration:

    MONGO_URL = mongodb://localhost/eop
    COLLECTION = eop
    PORT = 5000
    SESSION_SECRET = secret
    MAIL_USERNAME = bot@gmail.com
    MAIL_PASS = password

Install all modules via npm

    npm install

Run webpack 

    webpack

Start an application

    npm start
