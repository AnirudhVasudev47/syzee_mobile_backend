const formidable = require("formidable");
const axios = require("axios");
const FormData = require('form-data');
const request = require('request');
const {mockUrl} = require("../config/constants");

exports.test = (req, res) => {
  return res.json({
    test: 'works',
  })
}

exports.signup = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  
  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(400).json({
        error: `An error occurred ${err}`
      });
    }
    
    const {name, email, phone, code, password} = fields;
    
    if (!name || !email || !phone || !code || !password) {
      
      return res.status(404).json({
        error: `All fields are mandatory`
      });
    }
    
    const regUrl = `${mockUrl}/login.php`;
    const options = {
      'method': 'POST',
      'url': regUrl,
      formData: {
        'action': 'RegisterCheck',
        'email': email,
        'phone': phone,
      }
    };
    request(options, function (error, checkRes) {
      if (error) {
        return res.status(500).json({
          error: error,
        });
      }
      if (checkRes.body === '0') {
        return res.json({
          data: 'Already registered',
        })
      } else {
        const options = {
          'method': 'POST',
          'url': regUrl,
          formData: {
            'action': 'Register',
            'name': name,
            'email': email,
            'phone': phone,
            'code': code,
            'password': password,
          }
        };
        request(options, (error, regRes) => {
          if (error) {
            return res.status(500).json({
              error: error,
            });
          }
          return res.json({
            data: 'Success'
          });
        });
      }
    });
  });
}

exports.checkUser = (req ,res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  
  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(400).json({
        error: `An error occurred ${err}`
      });
    }
    
    const {email, phone} = fields;
    
    if (!email || !phone) {
      
      return res.status(404).json({
        error: `All fields are mandatory`
      });
    }
    
    const regUrl = `${mockUrl}/login.php`;
    const options = {
      'method': 'POST',
      'url': regUrl,
      formData: {
        'action': 'RegisterCheck',
        'email': email,
        'phone': phone,
      }
    };
    request(options, function (error, checkRes) {
      if (error) {
        return res.status(500).json({
          error: error,
        });
      }
      if (checkRes.body === '0') {
        return res.json({
          data: 'Already registered',
        })
      } else {
        return res.json({
          data: 'Not registered'
        });
      }
    });
  });
}