const fs = require('fs');
const File = require('../models/file');
const path = process.env.FILES_PATH;

class FileService {
  createDir(file) {
    const filePath = `${path}\\${file.user}\\${file.path}`;
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          return resolve({ message: 'File was created' });
        } else {
          return reject({ message: 'File alredy exist' });
        }
      } catch (e) {
        return reject({ message: 'File error' });
      }
    });
  }
}

module.exports = new FileService();
