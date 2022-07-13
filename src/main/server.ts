
import env from './config/env'
import { MongoHelper } from '../infra/db/mongodb/helper/mongo-helper'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import ('./config/app')).default
    app.listen(env.port, () => {
      console.log('Server running on port 5050, at http://localhost:5050')
    })
  })
  .catch(console.error)
