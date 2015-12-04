'use strict';

exports.port = process.env.PORT || 3000;
exports.mongodb = {
  uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/adminmodule'
  //uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://arunchandrika:Arun0404@ds031651.mongolab.com:31651/comevents'
};
//exports.companyName = 'SBECT, Inc.';
//exports.projectName = 'SBECT';
//exports.systemEmail = 'reddyarunkumar@gmail.addy';
exports.cryptoKey = 'k3yb0ardc4t';
//exports.loginAttempts = {
//  forIp: 50,
//  forIpAndUser: 7,
//  logExpiration: '20m'
//};
//exports.requireAccountVerification = false;
//exports.smtp = {
//  from: {
//    name: process.env.SMTP_FROM_NAME || exports.projectName +' Community Events',
//    address: process.env.SMTP_FROM_ADDRESS || 'reddyarunkumar@gmail.com'
//  },
//  credentials: {
//    user: process.env.SMTP_USERNAME || 'reddyarunkumar@gmail.com',
//    password: process.env.SMTP_PASSWORD || '',
//    host: process.env.SMTP_HOST || 'smtp.gmail.com',
//    ssl: true
//  }
//};
