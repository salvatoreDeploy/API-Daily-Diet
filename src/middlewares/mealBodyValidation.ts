import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { isDatePast } from '../utils/isPastDate'
import { isTimeWithinCurrentDate } from '../utils/isTimeWithinCurrentDate'
import { isDateCurrent } from '../utils/isDateCurrent'

export async function mealBodyValidation(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/

  const mealBodySchema = z
    .object({
      name: z.string({
        invalid_type_error: 'Name must be a string',
        required_error: 'Name is required',
      }),
      description: z.string({
        invalid_type_error: 'Name must be a string',
        required_error: 'Name is required',
      }),
      date: z
        .string({
          invalid_type_error: 'Date is required',
          required_error: 'Date must be a string',
        })
        .regex(dateRegex, 'Invalid date format. Please use dd/mm/yyyy.')
        .refine(isDatePast, { message: 'Date cannot be in the future.' }),
      time: z
        .string({
          invalid_type_error: 'Time is required',
          required_error: 'Time must be a string',
        })
        .regex(timeRegex, 'Invalid time format. Please use hh:mm.'),

      isInDiet: z.boolean({
        required_error: 'isInDiet is required',
        invalid_type_error: 'isInDiet must be a boolean',
      }),
    })
    .refine(
      (value) => {
        const currentDate = new Date()
        const isDateInPast = isDatePast(value.date)
        const isTimeValid = isTimeWithinCurrentDate(value.time, currentDate)

        if (isDateInPast && isDateCurrent(value.date)) {
          console.log(isTimeValid)
          return isTimeValid
        }

        return true
      },
      {
        message:
          'Invalid time. Must be equal to or earlier than the current time.',
      },
    )

  const _body = mealBodySchema.safeParse(request.body)

  if (_body.success === false) {
    const errorMesages = _body.error.flatten().fieldErrors
    const futureTimeError = _body.error?.message

    if (futureTimeError && Object.keys(errorMesages).length === 0) {
      const timeError = JSON.parse(futureTimeError)
      return reply.status(400).send({
        [timeError[0].path[0] ?? 'time']: [timeError[0].message],
      })
    }

    return reply.status(400).send(errorMesages)
  }
}
