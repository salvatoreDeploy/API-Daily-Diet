import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'
import { knex } from '../../db'

export async function checkUserAlreadyExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createUserBodySchema = z.object({
    username: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    email: z.string({ invalid_type_error: 'E-mail must be a string' }),
  })

  const _body = createUserBodySchema.safeParse(request.body)

  if (_body.success === false) {
    const errorMensages = _body.error.flatten().fieldErrors
    return reply.status(400).send(errorMensages)
  }

  const { email } = _body.data

  const userExists = await knex('users').where({ email }).first()

  if (userExists) {
    return reply.status(400).send({ message: 'Email already exists' })
  }
}
