import { FileFilterCallback, diskStorage } from 'multer';

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public');
  },
  filename: function (req, file: Express.Multer.File, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // file.fieldname + '-' +
    console.log('file', file);

    // cb(null, uniqueSuffix + file.originalname.split('.').pop());
  },
});

const fileFilter = (
  request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
): void => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

export const multerOption = {
  storage,
  fileFilter,
};
