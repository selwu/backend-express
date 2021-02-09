const File = require('../models/file');
const User = require('../models/user');
const fileService = require('../services/fileService');

class FileController {
  async createDir(req, res) {
    try {
      const { name, type, parent } = req.body;
      const file = new File({ name, type, parent, user: req.user._id });

      const parentFile = await File.findOne({ _id: parent });
      if (!parentFile) {
        file.path = name;
        await fileService.createDir(file);
      } else {
        file.path = `${parentFile.path}\\${file.name}`;
        await fileService.createDir(file);
        parentFile.childs.push(file._id);
        await parentFile.save();
        return res.json(file);
      }
      await file.save();
      return res.send(file);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  async getFiles(req, res) {
    try {
      const files = await File.find({ user: req.user._id, parent: req.query.parent });
      return res.send(files);
    } catch (e) {
      console.log(e);
      return res.status(500).send({ message: 'Cannot get files' });
    }
  }
}

module.exports = new FileController();
