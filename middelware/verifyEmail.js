const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport'); // this is important

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	auth: {
		user: 'piyushj1998@gmail.com',
		pass: 'trilokchandjain@1234'
	},tls:{
		rejectUnauthorized:false
	}
  }));
  
exports.mailSend = function (from, to, subject, html)
{
	// send mail with defined transport object
	// visit https://nodemailer.com/ for more options
	return transporter.sendMail({
		from: from, // sender address e.g. no-reply@xyz.com or "Fred Foo 👻" <foo@example.com>
		to: to, // list of receivers e.g. bar@example.com, baz@example.com
		subject: subject, // Subject line e.g. 'Hello ✔'
		//text: text, // plain text body e.g. Hello world?
		html: html // html body e.g. '<b>Hello world?</b>'
	});
};
