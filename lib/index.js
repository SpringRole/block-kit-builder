const Accessory = require("./Accessory");
const Blocks = require("./Blocks");
const Button = require("./Button");
const Input = require("./Input");
const Attachment = require("./Attachment");
const View = require("./View");
const Select = require('./Select');

const blocks = {
  Accessory,
  Attachment,
  Blocks,
  Button,
  Input,
  View,
  Select
};

exports = module.exports = blocks;
exports.BlockKitBuilder = blocks;
