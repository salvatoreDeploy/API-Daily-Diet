import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { knex } from '../../db'

export async function checkMealExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findMealExistsSchema = z.object({
    id: z
      .string({
        required_error: 'id is required.',
        invalid_type_error: 'id must be a string.',
      })
      .uuid('id must be an valid uuid.'),
  })

  const _params = findMealExistsSchema.safeParse(request.params)

  if (_params.success === false) {
    const errorMessages = _params.error.flatten().fieldErrors
    return reply.status(400).send(errorMessages)
  }

  const { id } = _params.data

  const mealExists = knex('meals').where({ id }).first()

  if (!mealExists) {
    return reply.status(404).send({ message: 'Meal not found!' })
  }
}
