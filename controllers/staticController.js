const Appointment = require('../models/Appointment');
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

const book_appointment_get = (req, res) => {
  res.render('book-appointment');
};

const confirm_appointment_post = async (req, res) => {
  const { fullName, phoneNum, date, time, symptoms } = req.body;
  console.log(fullName, phoneNum, date, time, symptoms);

  try {
    // the user is a patient if he/she doesn't have a medicare(company / hospital
    // - in this case) email id
    // const isPatient = !email.endsWith('@medicare.com');
    // const user = await User.create({ email, password, isPatient });
    const appointment = await Appointment.create({
      fullName,
      phoneNum,
      date,
      time,
      symptoms,
    });
    const token = createToken(user._id);
    console.log('Appointment Confirmed!');

    // res.cookie('jwt', token, {
    //   httpOnly: true,
    //   maxAge: 1000 * maxAge,
    // });

    res.status(201).json({ user: user._id });
  } catch (err) {
    // throw err;
    // const errors = handleErrors(err);
    res.status(400).send('Error');
  }
};

const doctor_get = (req, res) => {
  res.render('doctor');
};

const patient_get = (req, res) => {
  res.render('patient');
};

const final_payment_get = (req, res) => {
  res.render('final-payment');
};

const contact_consultancy_get = (req, res) => {
  res.render('contact-consultancy');
};

const chat_get = (req, res) => {
  res.render('chat', {
    title: 'Chat',
  });
};

module.exports = {
  home_get,
  about_get,
  contact_get,
  send_contact_data_post,
  book_appointment_get,
  confirm_appointment_post,
  doctor_get,
  patient_get,
  final_payment_get,
  contact_consultancy_get,
  chat_get,
};
