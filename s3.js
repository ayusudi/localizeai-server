const dotenv = require('dotenv')
const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

dotenv.config()

const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY } = process.env

const s3Client = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY
    }
})

function uploadFile(fileBuffer, fileName, mimetype) {
    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype,
    }
    return s3Client.send(new PutObjectCommand(uploadParams))
}

function deleteFile(fileName) {
    const deleteParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: fileName,
    }
    return s3Client.send(new DeleteObjectCommand(deleteParams))
}

async function getObjectSignedUrl(key) {
    const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: key
    }
    const command = new GetObjectCommand(params)
    const seconds = 60
    const url = await getSignedUrl(s3Client, command, { expiresIn: seconds })
    return url
}

module.exports = {
    uploadFile,
    deleteFile,
    getObjectSignedUrl
}
