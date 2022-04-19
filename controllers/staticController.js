const multiparty = require('multiparty');
const nodemailer = require('nodemailer');

const home_get = (req, res) => {
  res.render('index', {
    title: 'Home',
  });
};

const about_get = (req, res) => {
  res.render('about', {
    title: 'About Us',
  });
};

const contact_get = (req, res) => {
  res.render('contact', {
    title: 'Contact Us',
  });
};

const send_contact_data_post = (req, res) => {
  // Setup the email client
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  // verify email client(nodemailer) connection configuration
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });

  const form = new multiparty.Form();
  const data = {};

  form.parse(req, function (err, fields) {
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    const mail = {
      from: data['full-name'],
      to: process.env.GMAIL_ID,
      // as of now, we are sending the mail from our account to ourselves.
      // But, after setting up with a dedicated email for this purpose we can use that
      subject: 'Message sent via medicare contact form',
      text: `${data['full-name']} <${data.email}> \n${data.message}`,
    };

    transporter.sendMail(mail, (err, data) => {
      res.header('Content-Type', 'text');
      if (err) {
        console.log(err);
        res.status(500).send('Something went wrong.');
      } else {
        console.log('mail sent successfully');
        res.status(200).send('Email successfully sent to recipient!');
      }
    });
  });
};

module.exports = { home_get, about_get, contact_get, send_contact_data_post };
