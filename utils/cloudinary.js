import cloudinaryModule from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinaryModule.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async (image) => {
	cloudinaryModule.uploader.upload(image, (err, result) => {
		if (result && result.secure_url) {
			console.log(result.secure_url);
			return result.secure_url;
		}
		console.log(err.message);
	});
};
