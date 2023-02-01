import Admin from '../models/admin.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import cloudinary from '../utils/cloudinary.js';
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

		const response = await Admin.findById(req.params.id);

		res.status(200).json({ success: true, result: response });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// user update and patch delete actions

export const update_user = async (req, res) => {
	let { userId, ...alldata } = req.body;

	if (userId === req.params.id || req.body.isAdmin) {
		try {
			// const uploadres = await cloudinary(req?.body?.form?.image);

			// console.log(req.body.form.image);

			const user = await Admin.updateOne(
				{ _id: userId },

				{
					$set: {
						pic: '',
						firstname: alldata?.form?.prevData?.current.firstname,
						lastname: alldata?.form?.prevData?.current.lastname,
						username: alldata?.form?.prevData?.current.username,
						email: alldata?.form?.prevData?.current.email,
						company: alldata?.form?.prevData?.current.company,
						marital: alldata?.form?.prevData?.current.marital,
						occupation: alldata?.form?.prevData?.current.occupation,
						city: alldata?.form?.prevData?.current.city,
						password: passw,
					},
				},
			);
			return res.status(200).json({
				message: 'Account is Updated Successfully',
				result: user,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	} else {
		return res.status(403).json('Update your Account Only');
	}
};

// update password authentication controller

// user update and patch delete actions

export const update_pass = async (req, res) => {
	let { userId, ...alldata } = req.body;

	let passw = alldata?.prevAuth?.current.password;

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
			if (
				alldata?.prevAuth?.current.password &&
				alldata?.prevAuth?.current.confirmpassword
			) {
				if (
					alldata?.prevAuth?.current.password ===
					alldata?.prevAuth?.current.confirmpassword
				) {
					const user = await Admin.updateOne(
						{ _id: userId },

						{
							$set: {
								password: passw,
							},
						},
					);
					return res.status(200).json({
						message: 'Password Changed Successfuly',
						result: user,
					});
				} else {
					return res.status(400).json({
						sucess: false,
						message:
							'Both passwords should match,confirm password and try again',
					});
				}
			} else {
				return res.status(400).json({
					message: 'All fields should be entered',
					success: false,
				});
			}
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	} else {
		return res.status(403).json('Update your Account Only');
	}
};

//
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
