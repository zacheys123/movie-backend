import cloudinaryModule from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinaryModule.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async (image) => {
	const uploadres = await cloudinaryModule.uploader.upload(image, {
		upload_preset: 'movie',
	});
	console.log(uploadres);
};
