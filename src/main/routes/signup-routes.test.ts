import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('should return an account on sucess', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Matheus',
        email: 'any@mail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
