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

			return res
				.status(200)
				.json({
					success: true,
					message: 'Movie Added',
					result: curr,
				});
		}
	} catch (error) {
		res.status(500).json(error);
	}
};
