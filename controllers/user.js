import Admin from '../models/admin.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

//  getting all users
export const getUsers = async (req, res) => {
	try {
		const response = await Admin.find({});
		res.status(200).json({ success: true, data: response });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

//  getting a single users
export const getUser = async (req, res) => {
	try {
		const { userId } = req.body;
		console.log(userId);
		const response = await Admin.findById(req.params.id);

		res.status(200).json({ success: true, result: response });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// user update and patch delete actions

export const update_user = async (req, res) => {
	let { userId, ...alldata } = req.body;

	let passw = alldata?.prevData?.current.password;

	if (userId === req.params.id || req.body.isAdmin) {
		if (passw) {
			try {
				const salt = await bcrypt.genSalt(10);
				passw = await bcrypt.hash(passw, salt);
			} catch (err) {
				return res.status(500).json(err);
			}
		}

		try {
			const user = await Admin.updateOne(
				{ _id: userId },

				{
					$set: {
						username: alldata?.prevData?.current.username,
						email: alldata?.prevData?.current.email,
						company: alldata?.prevData?.current.company,
						marital: alldata?.prevData?.current.marital,
						occupation: alldata?.prevData?.current.occupation,
						city: alldata?.prevData?.current.city,
						password: passw,
					},
				},
			);
			return res
				.status(200)
				.json({ message: 'Account is Updated', result: user });
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	} else {
		return res.status(403).json('Update your Account Only');
	}
};

export const delete_user = async (req, res) => {
	let { userId, ...alldata } = req.body;

	try {
		await Admin.findOneAndDelete({ _id: userId });
		res.status(200).json('User Deleted');
	} catch (error) {
		res.status(200).json({ message: error.stack });
	}
};

export const update_plan = async (req, res, next) => {
	const { userId, free } = req.body;
	console.log(req.body);
	try {
		const user = await Admin.updateOne(
			{ _id: userId },

			{
				$set: {
					package: free,
				},
			},
		);
		res.status(200).json({
			message: 'Successfully Chose A package',
			result: user,
		});
	} catch (error) {
		res.status(500).json(error);
	}
};
