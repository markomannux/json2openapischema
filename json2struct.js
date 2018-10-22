function json2struct(jsonstring) {
    jsonstring = jsonstring || '{}';
    const result = {
        rootDocument: traverse(JSON.parse(jsonstring))
    };
    return result;
}

function inferType(val) {
    let type = typeof val;
    if (Array.isArray(val)) {
        type = 'array';
    }

    return type;
}

function traverse(val) {

    const type = inferType(val);
    const handler = handlers[type] || handlers['primitive'];
    const res = handler(type, val);

    return res;
}

const handlers = {
    primitive: handlePrimitive,
    array: handleArray,
    object: handleObject
}

function handlePrimitive(type, val) {
    const result = {
        type: type,
        value: val
    };

    return result;
}

function handleArray(type, val) {
    const result = {
        type: type,
        items: traverse(val[0])
    };
    return result;
}

function handleObject(type, val) {
    const result = {
        type: type,
        properties: {}
    };
    for (let key in val) {
        result.properties[key] = traverse(val[key]);
    }
    return result;
}

module.exports = json2struct;