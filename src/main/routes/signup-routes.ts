import { Router } from 'express'
import { adapRoute } from './adapters/express-routes'
import { makeSignupController } from '../factories/signup'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/signup', adapRoute(makeSignupController()))
}
