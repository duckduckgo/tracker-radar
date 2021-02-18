const assert = require('assert')
const fs = require('fs')
const Ajv = require('ajv').default
const ajv = new Ajv()
const schema = require('./../test/schema.js')

describe('Domain schema', () => {
    it('should have the correct schema', () => {
        const regions = fs.readdirSync('domains')
        for (const region of regions) {
            for (const file of fs.readdirSync(`domains/${region}`)) {
                const data = JSON.parse(fs.readFileSync(`domains/${region}/${file}`, 'utf8'))
                ajv.validate(schema.domain, data)
                assert.strictEqual(ajv.errors, null)
            }
        }
    })
})

describe('Entity schema', () => {
    it('Entities should have the correct schema', () => {
        const entities = fs.readdirSync('entities')
        for (const file of entities) {
            const data = JSON.parse(fs.readFileSync(`entities/${file}`, 'utf8'))
            assert.equal(ajv.validate(schema.entity, data), true, `${file}`)
        }
    })
})
