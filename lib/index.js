const Accessory = require('./Accessory');
const Blocks = require('./Blocks');
const Button = require('./Button');
const Input = require('./Input');

const blocks = {
    Accessory,
    Blocks,
    Button,
    Input
};

exports = module.exports = blocks;
exports.BlockKitBuilder = blocks;
