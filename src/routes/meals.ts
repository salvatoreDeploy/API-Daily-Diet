import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'

import { z } from 'zod'
import { knex } from '../../db'

interface Metrics {
  inDietPercentage: number
  bestSequency: number
  total: number
  totalInDiet: number
  totalOutDiet: number
}

const mealBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  date: z.string(),
  time: z.string(),
  isInDiet: z.boolean(),
})

/* const userQuerySchema = z.object({
  userId: z.string(),
}) */

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const { name, description, date, time, isInDiet } = mealBodySchema.parse(
      request.body,
    )

    // const { userId } = userQuerySchema.parse(request.query)

    const sessionId = request.cookies.sessionId

    await knex('meals').insert({
      id: randomUUID(),
      name,
      description,
      date,
      time,
      isInDiet,
      userId: sessionId,
    })

    return reply.status(201).send({ message: 'Successfully created meal!' })
  })
}
