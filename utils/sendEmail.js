import nodemailer from 'nodemailer';

export const sendEmail = async (
	subject,
	send_to,
	send_from,
	message,
) => {
	let transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: '500',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD,
		},
		tls: { rejectUnauthorized: false },
	});
	let mailOptions = {
		from: send_from,
		to: send_to,
		subject: subject,
		html: message,
		attachments: {
			filename: 'neflix.mp4',
			path: './neflix.mp4',
		},
	};
	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log(err);
		}
		console.log('Email Sent!!!');
	});
};
