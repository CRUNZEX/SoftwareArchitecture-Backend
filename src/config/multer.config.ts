import multer from 'multer';

export default multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 32 * 1024 * 1024,
    },
});
