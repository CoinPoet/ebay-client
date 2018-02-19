import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'

export function initChai() : Chai.ExpectStatic {
  chai.use(chaiAsPromised)
  if (!process.env.AWS_REGION) {
    process.env.AWS_REGION = 'LOCAL'
  }
  return chai.expect
}
