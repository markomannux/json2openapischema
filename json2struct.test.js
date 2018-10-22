const json2struct = require('./json2struct');

test('empty string should produce empty struct', () => {
    const output = {
        name: 'rootDocument',
        type: 'object',
        properties: {}
    }
    expect(json2struct('')).toEqual(output);
})

test('alphanumeric property should produce string type struct', () => {
    const input = '{"foo": "bar"}';
    const output = {
        name: 'rootDocument',
        type: 'object',
        properties: {
            foo: {
                name: 'foo',
                type: 'string',
                value: 'bar'
            }
        }
    }
    expect(json2struct(input)).toEqual(output);
})

test('numeric property should produce number type struct', () => {
    const input = '{"foo": 42}';
    const output = {
        name: 'rootDocument',
        type: 'object',
        properties: {
            foo: {
                name: 'foo',
                type: 'number',
                value: 42
            }
        }
    }
    expect(json2struct(input)).toEqual(output);
})

test('array property should produce array type struct', () => {
    const input = '{"foo": [1,2,3]}';
    const output = {
        name: 'rootDocument',
        type: 'object',
        properties: {
            foo: {
                name: 'foo',
                type: 'array',
                items: {
                    name: 'fooItem',
                    type: 'number',
                    value: 1
                }
            }
        }
    }
    expect(json2struct(input)).toEqual(output);
})

test('empty array property', () => {
    const input = '{"foo": []}';
    const output = {
        name: 'rootDocument',
        type: 'object',
        properties: {
            foo: {
                name: 'foo',
                type: 'array',
                items: {
                    name: 'fooItem',
                    type: 'undefined',
                    value: undefined
                }
            }
        }
    }
    expect(json2struct(input)).toEqual(output);
})

test('array of object should include object description', () => {
    const input = '{"foo": [{"bar": 42}]}';
    const output = {
        name: 'rootDocument',
        type: 'object',
        properties: {
            foo: {
                name: 'foo',
                type: 'array',
                items: {
                    name: 'fooItem',
                    type: 'object',
                    properties: {
                        bar: {
                            name: 'bar',
                            type: 'number',
                            value: 42
                        }
                    }
                }
            }
        }
    }
    expect(json2struct(input)).toEqual(output);
})

test('object property should produce object type struct', () => {
    const input = '{"foo": {"bar": "foobar"}}';
    const output = {
        name: 'rootDocument',
        type: 'object',
        properties: {
            foo: {
                name: 'foo',
                type: 'object',
                properties: {
                    bar: {
                        name: 'bar',
                        type: 'string',
                        value: 'foobar'
                    }
                }
            }
        }
    }
    expect(json2struct(input)).toEqual(output);
})