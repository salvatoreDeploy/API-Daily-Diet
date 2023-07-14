import fastify from 'fastify'
import { usersRoutes } from './routes/users'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyCookie)

app.register(usersRoutes, { prefix: 'users' })
