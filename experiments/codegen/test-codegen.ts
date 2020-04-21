import * as source from './shub-login.json'
import Curl from './curl'

import Codegen from './codegen'

const codegen = new Codegen
const definition = JSON.stringify(source)

// codegen.register('curl', Curl)
// const output = codegen.generate('curl', definition, {outputResponseCode: false})

const apiDom = codegen.parse(definition)
const output = Curl(apiDom, {})


console.log(output.raw)
