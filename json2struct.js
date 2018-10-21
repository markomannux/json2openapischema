function json2struct(jsonstring) {
    jsonstring = jsonstring || '{}';
    return traverse(JSON.parse(jsonstring));
}

function traverse(parsed) {
    let struct = {};
    for (let key in parsed) {
        const val = parsed[key];
        const type = typeof val;
        struct[key] = {
            name: key,
            type: type,
        };
        
        if (type === 'object') {
            if (Array.isArray(val)) {
                struct[key].type = 'array';
                struct[key].value = val;
            } else {
                struct[key].value =  traverse(val, struct[key]);
            }
            
        } else {
            struct[key].value = val;
        }
    }
    
    return struct;
}

module.exports = json2struct;