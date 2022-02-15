const Accessory = require('./Accessory');
const Blocks = require('./Blocks');
const Button = require('./Button');
const Input = require('./Input');
const Attachment = require('./Attachment')
const View = require('./View');

const blocks = {
    Accessory,
    Attachment,
    Blocks,
    Button,
    Input,
    View
};

exports = module.exports = blocks;
exports.BlockKitBuilder = blocks;
