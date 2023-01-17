import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const adminSchema = mongoose.Schema(
	{
		username: { type: String },
		profilepic: { type: String },
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
