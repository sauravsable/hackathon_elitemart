const { PutObjectCommand, S3Client, DeleteObjectCommand} = require("@aws-sdk/client-s3");
const { v4:uuid } = require("uuid");

// AWS S3 configuration 
const s3 = new S3Client({ region: 'ap-southeast-2' });
const { getSignedUrl } = require ("@aws-sdk/s3-request-presigner");
const BUCKET = process.env.BUCKET;

// function to upload image to s3 bucket
const uploadToS3 = async (avatar) => {
  const key = `${uuid()}`;
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: avatar.buffer,
    ContentType: avatar.mimetype, 
  });

  try {
    await s3.send(command);
    const imageUrl = `https://${BUCKET}.s3.amazonaws.com/${key}`;
    return { key,imageUrl};
  } catch (error) {
    console.log(error);
    return { error };
  }
};

// function to delete image from bucket
const deleteFromS3 = async (deletekey) => {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: deletekey,
  });

  try {
    await s3.send(command);
    return { success: true, message: 'File deleted successfully' };
  } catch (error) {
    console.log(error);
    return { error };
  }
};


module.exports = {uploadToS3,deleteFromS3};
  
