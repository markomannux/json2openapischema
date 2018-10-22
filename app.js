const json2struct = require('./json2struct');
const struct2openapischema = require('./struct2openapischema');

console.log(struct2openapischema(json2struct('{"foo": [{"bar": 42}]}')));