import fastify from 'fastify'

const app = fastify()

app.get('/hello', () => {
  return 'Hello Word'
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀🚀🚀 HTTP server running, listening on port 3333 🚀🚀🚀')
  })
