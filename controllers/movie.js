import Admin from '../models/admin.js';

export const createMovie = async (req, res) => {
	try {
		const newUser = await Admin.findById(req.params.id);
		await newUser.updateOne({ $push: { movies: req.body } });

		res.status(200).json('Movie Successfully Added');
	} catch (error) {
		res.status(500).json(error);
	}
};

export const getGame = async (req, res, next) => {
	try {
		if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
			const curr = await Admin.findById(req.params.id);

			return res.status(200).json({
				success: true,
				result: curr,
			});
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

// add new user for movies controller
export const addUser = async (req, res, next) => {
	console.log(req.body);
	try {
		if (req.params.id) {
			if (req.body.username || req.body.phone) {
				const newUser = await Admin.findById(req.params.id);
				await newUser.updateOne({
					$push: { users: req.body },
				});

				res.status(200).json({ message: 'User Successfully Added' });
			} else {
				res.status(403).json({ message: 'All fields must entered' });
			}
		} else {
			res.status(404).json({ message: 'Update Your Account Only' });
		}
	} catch (error) {
		res.status(500).json(error);
	}
};
// add new user for movies controller
export const addSuggested = async (req, res, next) => {
	console.log(req.body);
	try {
		if (req.params.id) {
			if (req.body.suggested) {
				const newUser = await Admin.findById(req.params.id);
				await newUser.updateOne({
					$push: { suggested: req.body },
				});

				res.status(200).json({ message: 'User Successfully Added' });
			} else {
				res.status(403).json({ message: 'All fields must entered' });
			}
		} else {
			res.status(404).json({ message: 'Update Your Account Only' });
		}
	} catch (error) {
		res.status(500).json(error);
	}
};
