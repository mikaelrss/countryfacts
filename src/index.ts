import fastify from 'fastify'

const app = fastify({logger: true});

(async () => {
  try {
    await app.listen({
      port: 3000
    })
  } catch (e) {
    app.log.error(e)
    process.exit(1)
  }
})()
