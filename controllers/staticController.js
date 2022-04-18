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

module.exports = { home_get, about_get, contact_get };
