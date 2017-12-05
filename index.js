const _ = require('lodash')
const jc = require('json-cycle')

const Sls = require('serverless/lib/Serverless')
const Service = require('serverless/lib/classes/Service')

const s = new Sls()

const service = {
    service: 'my-service',
    provider: {
        name: 'aws',
    },
    custom: {
        item9: '${self:custom.item7}',
        item7: '${self:custom.item5}',
        item5: '${self:custom.item3}',
        item3: '${self:custom.item1}',
        item1: '${self:custom.val}',
        item2: '${self:custom.item1}',
        item4: '${self:custom.item3}',
        item6: '${self:custom.item5}',
        item8: '${self:custom.item7}',
        val: '${file(async.load.js):}',
    },
}

s.config.servicePath = __dirname
s.variables.service = service
service.provider.variableSyntax = '\\${([ ~:a-zA-Z0-9._\'",\\-\\/\\(\\)]+?)}' // default
s.variables.loadVariableSyntax()
delete service.provider.variableSyntax
s.variables.populateObject(service)
    .then((populatedObject) => {
        console.log(jc.stringify(populatedObject, null, 2))
    })
