import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { knex } from '../../db'

export async function checkIdUserExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findUserQuerySchema = z.object({
    userId: z
      .string({
        invalid_type_error: 'UserId must be a string',
        required_error: 'UserId is required',
      })
      .uuid(),
  })

  const _query = findUserQuerySchema.safeParse(request.query)

  if (_query.success === false) {
    const errorMessages = _query.error.flatten().fieldErrors
    return reply.status(400).send(errorMessages)
  }

  const { userId } = _query.data

  const existsId = knex('users').where({ id: userId }).first()

  if (!existsId) {
    return reply.status(404).send({ message: 'User not found!' })
  }
}
