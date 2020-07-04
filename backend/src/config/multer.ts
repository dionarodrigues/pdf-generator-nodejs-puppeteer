import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import { extname } from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.join(process.cwd(),'public','uploads','images'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err, '');
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};


