'use strict';

class MailService {
  constructor() {

    /**
     * Create reusable transporter object
     * using the default SMTP transport.
     */

    const nodemailer = require('nodemailer');

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'admin@lazypixel.co.uk',
        pass: 'projectBook0.3mm'
      }
    });
  }

  sendRegistrationEmail(user, returnUrl) {

    const self = this;

    return new Promise((resolve, reject) => {

      const React = require('react');
      const EmailTemplate = require('../views/emails/RegistrationEmail.jsx');
      const ReactDOMServer = require('react-dom/server');

      /**
       * Setup email data with unicode symbols
       */

      const content = ReactDOMServer.renderToStaticMarkup(React.createElement(
        EmailTemplate, {
          user: user,
          returnUrl: returnUrl
        })
      );

      const mailOptions = {
        from: 'tpkiddle@hotmail.com',
        to: user.auth.email,
        subject: 'CryptoMe Registration',
        text: '',
        html: content
      };

      /**
       * Send mail with defined transport object
       */

      self.transporter.sendMail(mailOptions)
        .then((info) => {
          resolve(info);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = MailService;