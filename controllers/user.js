import Admin from '../models/admin.js';

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
