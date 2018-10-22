const YAML = require('json2yaml')

function struct2openapischema(struct) {
    return YAML.stringify(struct);
}

module.exports = struct2openapischema;