const json2struct = require('./json2struct');

test('empty string should produce empty struct', () => {
    expect(json2struct('')).toEqual({});
})

test('alphanumeric property should produce string type struct', () => {
    const input = '{"foo": "bar"}';
    const output = {
        foo: {
            name: 'foo',
            type: 'string',
            value: 'bar'
        }
    }
    expect(json2struct(input)).toEqual(output);
})

test('numeric property should produce number type struct', () => {
    const input = '{"foo": 42}';
    const output = {
        foo: {
            name: 'foo',
            type: 'number',
            value: 42
        }
    }
    expect(json2struct(input)).toEqual(output);
})

test('array property should produce array type struct', () => {
    const input = '{"foo": [1,2,3]}';
    const output = {
        foo: {
            name: 'foo',
            type: 'array',
            value: [1,2,3]
        }
    }
    expect(json2struct(input)).toEqual(output);
})

test('object property should produce object type struct', () => {
    const input = '{"foo": {"bar": "foobar"}}';
    const output = {
        foo: {
            name: 'foo',
            type: 'object',
            value: {
                bar: {
                    name: 'bar',
                    type: 'string',
                    value: 'foobar'
                }
            }
        }
    }
    expect(json2struct(input)).toEqual(output);
})