import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../../db'
import { randomUUID } from 'crypto'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/signup', async (request, reply) => {
    const createUserBodySchema = z.object({
      username: z.string(),
      email: z.string().email(),
    })

    const { username, email } = createUserBodySchema.parse(request.body)

    /* let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 Dias
      })
    } */

    await knex('users').insert({
      id: randomUUID(),
      username,
      email,
    })

    return reply.status(201).send({ message: 'Successfully created user!' })
  })

  app.post('/signin', async (request, reply) => {
    const authenticateUserBodySchema = z.object({
      email: z.string().email('Email must be valid'),
      username: z.string({
        required_error: 'Username is required',
        invalid_type_error: 'Username must be valid',
      }),
    })

    const _body = authenticateUserBodySchema.safeParse(request.body)

    if (_body.success === false) {
      const errorMessages = _body.error.flatten().fieldErrors
      return reply.status(400).send(errorMessages)
    }

    const { email, username } = _body.data

    const user = await knex('users').where({ email, username }).first()

    if (user) {
      let sessionId = request.cookies.sessionId

      if (!sessionId) {
        sessionId = randomUUID()

        reply.cookie('sessionId', sessionId, {
          path: '/',
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 Dias
        })

        await knex('users').where({ email }).update('sessionId', sessionId)
      }

      return reply.status(200).send({ message: 'Login successful!' })
    } else {
      return reply.status(401).send({ message: 'Invalid credentials' })
    }
  })
}
