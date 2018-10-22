function json2struct(jsonstring) {
    jsonstring = jsonstring || '{}';
    return traverse(JSON.parse(jsonstring));
}

function inferType(val) {
    let type = typeof val;
    if (Array.isArray(val)) {
        type = 'array';
    }

    return type;
}

function traverse(val, key) {

    key = key || 'rootDocument'
    const type = inferType(val)
    const handler = handlers[type] || handlers['primitive']

    return handler(key, type, val);
}

const handlers = {
    object: handleObject,
    array: handleArray,
    primitive: handlePrimitive
}

function handlePrimitive(key, type, val) {
    return {
        name: key,
        type: type,
        value: val
    };
}

function handleArray(key, type, val) {
    const result = {
        name: key,
        type: type,
        items: traverse(val[0], `${key}Item`)
    };
    return result;
}

function handleObject(key, type, val) {
    const result = {
        name: key,
        type: type,
        properties: {}
    };
    for (let k in val) {
        const v = val[k];
        result.properties[k] = traverse(v, k);
    }
    return result;
}

module.exports = json2struct;