import nodemailer from 'nodemailer';

export const sendEmail = async (
	subject,
	send_to,
	send_from,
	message,
) => {
	let transporter = nodemailer.createTransport({
		service: 'Outlook365',
		host: process.env.EMAIL_HOST,
		port: '587',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD,
		},
		attachments: { filename: 'neflix.mp4', path: './neflix.mp4' },

		tls: { rejectUnauthorized: false },
	});

	let mailOptions = {
		from: send_from,
		to: email,

		subject: subject,
		html: message,
	};
	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log(err);
		}
		console.log('Email Sent!!!');
	});
};
