import { Router } from 'express'
import { makeSignupController } from '../factories/signup/signup'
import { adapRoute } from './adapters/express-routes'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/signup', adapRoute(makeSignupController()))
}
