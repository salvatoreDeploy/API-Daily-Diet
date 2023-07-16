import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../../db'
import { randomUUID } from 'crypto'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/signup', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    })

    const { name, email, password } = createUserBodySchema.parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 Dias
      })
    }

    await knex('users').insert({
      id: randomUUID(),
      name,
      email,
      password,
      sessionId,
    })

    return reply.status(201).send({ message: 'Successfully created user!' })
  })

  app.post('/login', async (request, reply) => {
    const authenticateUserBodySchema = z.object({
      email: z.string().email('Email must be valid'),
      password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password Password must be valid',
      }),
    })

    const _body = authenticateUserBodySchema.safeParse(request.body)

    if (_body.success === false) {
      const errorMessages = _body.error.flatten().fieldErrors
      return reply.status(400).send(errorMessages)
    }

    const { email, password } = _body.data

    const user = await knex('users').where({ email, password }).first()

    if (user) {
      return reply.status(200).send({ user })
    } else {
      return reply.status(401).send({ message: 'Invalid credentials' })
    }
  })
}
