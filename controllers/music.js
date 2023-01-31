import e from 'express';
import Admin from '../models/admin.js';
// add music to database
export const createMusic = async (req, res) => {
	console.log(req.body);
	try {
		if (req.params.id) {
			if (
				req.body.user &&
				req.body.music_type &&
				req.body.amount &&
				req.body.paid
			) {
				const newUser = await Admin.findById(req.params.id);
				await newUser.updateOne({ $push: { music: req.body } });

				res.status(200).json({
					message: 'Music Successfully Added',
					result: newUser,
				});
			} else {
				res.status(400).json({ message: 'Some Fields are Empty' });
			}
		} else {
			res.status(403).json({ message: 'Update Your Account Only' });
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

export const getMusic = async (req, res) => {
	try {
		const newUser = await Admin.findById(req.params.id);
		const { music, ...alldata } = newUser._doc;
		res.status(200).json(music);
	} catch (error) {
		res.status(500).json(error);
	}
};
