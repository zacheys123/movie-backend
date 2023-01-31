import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const adminSchema = mongoose.Schema(
	{
		firstname: { type: String },
		lastname: { type: String },
		username: { type: String },
		pic: { type: String },
		email: { type: String },
		package: { type: String },
		movies: [
			{
				user: { type: String },
				movie_name: { type: String },
				season: { type: String },
				episodes: { type: String },
				customer_name: { type: String },
				genre: { type: String },
				amount: { type: String },
				paid: { type: String },
				created_at: {
					type: String,
					required: true,
					default: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
				},
			},
		],
		latest: [
			{
				movie_name: { type: String },
				season: { type: String },
				episodes: { type: String },
				genre: { type: String },
				iscomplete: { type: Boolean, default: false },
			},
		],
		music: [
			{
				song_name: { type: String },
				music_type: { type: String },
				user: { type: String },
				amount: { type: String },
				paid: { type: String },
			},
		],
		suggested: [
			{
				suggest: { type: String },
			},
		],
		users: [
			{ username: { type: String }, phone: { type: String } },
			{ timestamps: true },
		],
		company: { type: String },
		phone: { type: String },
		password: { type: String },
		city: { type: String },
		occupation: { type: String },
		marital: { type: String },
		package: { type: String },
		isAdmin: { type: String, default: false },
	},
	{ timestamps: true },
);
adminSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}

	// generate a salt
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
