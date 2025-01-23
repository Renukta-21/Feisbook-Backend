const config = require('../config');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: config.cloud_name, 
    api_key: config.api_key, 
    api_secret: config.api_secret,
    secure:true
});

const uploadImage = async (filePath)=>{
    return await cloudinary.uploader.upload(filePath, {
        folder:'feisbook-profile'
    })
}

module.exports = {uploadImage}