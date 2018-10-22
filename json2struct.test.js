const json2struct = require('./json2struct');

test('empty string should produce empty struct', () => {
    const output = {
        rootDocument: {
            type: 'object',
            properties: {}
        }
    }
    expect(json2struct('')).toEqual(output);
})

test('alphanumeric property should produce string type struct', () => {
    const input = '{"foo": "bar"}';
    const output = {
        rootDocument: {
            type: 'object',
            properties: {
                foo: {
                    type: 'string',
                    value: 'bar'
                }
            }
        }
    }
    expect(json2struct(input)).toEqual(output);
})

test('numeric property should produce number type struct', () => {
    const input = '{"foo": 42}';
    const output = {
        rootDocument: {
            type: 'object',
            properties: {
                foo: {
                    type: 'number',
                    value: 42
                }
            }
        }
    }
    expect(json2struct(input)).toEqual(output);
})

test('array property should produce array type struct', () => {
    const input = '{"foo": [1,2,3]}';
    const output = {
        rootDocument: {

            type: 'object',
            properties: {
                foo: {
                    type: 'array',
                    items: {
                        type: 'number',
                        value: 1
                    }
                }
            }
        }
    }
    expect(json2struct(input)).toEqual(output);
})

test('empty array property', () => {
    const input = '{"foo": []}';
    const output = {
        rootDocument: {

            type: 'object',
            properties: {
                foo: {
                    type: 'array',
                    items: {
                        type: 'undefined',
                        value: undefined
                    }
                }
            }
        }
    }
    expect(json2struct(input)).toEqual(output);
})

test('array of object should include object description', () => {
    const input = '{"foo": [{"bar": 42}]}';
    const output = {
        rootDocument: {
            type: 'object',
            properties: {
                foo: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            bar: {
                                type: 'number',
                                value: 42
                            }
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
        rootDocument: {
            type: 'object',
            properties: {
                foo: {
                    type: 'object',
                    properties: {
                        bar: {
                            type: 'string',
                            value: 'foobar'
                        }
                    }
                }
            }
        }
    }
    expect(json2struct(input)).toEqual(output);
})