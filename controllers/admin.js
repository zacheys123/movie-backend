import Admin from '../models/admin.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
export const register = async (req, res) => {
	const { firstname, lastname, email, company, phone, password } =
		req.body;

	if (!email || !password)
		return res.status(400).json({
			success: false,
			message: 'Password and email are required',
		});

	if (password.length < 6) {
		return res.status(400).json({
			success: false,
			message: 'Password should be at least 6 characters long',
		});
	}

	const user1 = await Admin.findOne({ company }); //
	const user = await Admin.findOne({ email });
	//  finding user in db
	if (user)
		return res.status(400).json({
			message: 'Email/username already in use',
		});
	if (user1)
		return res.status(400).json({
			message: 'Company name already Exist',
		});

	const newUser = new Admin({
		username: `${firstname}${lastname}`,
		email,
		company,
		phone,
		password,
	});
	// hashing the password

	const savedAdmin = await newUser.save();

	if (savedAdmin) {
		const token = jwt.sign(
			{ email: savedAdmin.username, id: savedAdmin._id },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRE },
		);
		// const {
		// 	password,
		// 	movies,
		// 	latest,
		// 	suggested,
		// 	users,
		// 	upddatedAt,
		// 	createdAt,
		// 	...rest
		// } = savedAdmin._doc;
		return res.status(200).json({
			message: 'Successfully registered',
			result: savedAdmin,
			token,
		});
	}
};
export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const result = await Admin.findOne({ email: email });

		if (!result) {
			res.status(404).json({ message: 'User Not Found' });
		}
		let matchpass = await bcrypt.compare(password, result.password);
		if (matchpass) {
			return jwt.sign(
				{ username: result.username, id: result._id },
				process.env.JWT_SECRET,
				{ expiresIn: process.env.JWT_EXPIRE },
				(err, token) => {
					res.status(200).json({
						success: true,
						message: 'You have logged in successfully',
						result,
						token,
					});
				},
			);
		} else {
			return res
				.status(400)
				.json({ success: false, message: 'Invalid password' });
		}
	} catch (error) {
		console.log(error.message);
	}
};
export const getAdmins = async () => {};
