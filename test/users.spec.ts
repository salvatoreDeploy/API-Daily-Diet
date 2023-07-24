import { afterAll, beforeAll, beforeEach, it, describe, expect } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'
import { execSync } from 'node:child_process'

describe('Users Route', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('Should be able to create a new user', async () => {
    const user = {
      username: 'user',
      email: 'user@email.com',
    }

    const response = await request(app.server)
      .post('/users/signup')
      .send(user)
      .expect(201)

    expect(response.body).contain({
      message: 'Successfully created user!',
    })
  })

  it('Should be able to login user', async () => {
    const user = {
      username: 'user',
      email: 'user@email.com',
    }

    await request(app.server).post('/users/signup').send(user).expect(201)

    const response = await request(app.server)
      .post('/users/signin')
      .send({
        username: user.username,
        email: user.email,
      })
      .expect(200)

    expect(response.body).contain({ message: 'Login successful!' })
  })

  it('should not be able to login with wrong email', async () => {
    const response = await request(app.server)
      .post('/users/signin')
      .send({
        username: 'teste',
        email: 'teste@email.com',
      })
      .expect(401)

    expect(response.body).contain({ message: 'Invalid credentials' })
  })

  it('should not be possible to create an account with an existing email', async () => {
    const user = {
      username: 'user',
      email: 'user@email.com',
    }

    await request(app.server).post('/users/signup').send(user).expect(201)

    const response = await request(app.server)
      .post('/users/signup')
      .send({
        username: 'user',
        email: 'user@email.com',
      })
      .expect(400)

    expect(response.body).contain({ message: 'Email already exists' })
  })
})
