import fastify, {FastifyInstance} from "fastify"

class App {
    public app: FastifyInstance
    public appPort: number = 8080

    constructor(appInit: { plugins: any, routes: any}) {
        this.app = fastify({ logger: true})
        this.routes(appInit.routes)
    }

    public routes(routes: { forEach: (arg0: (routes: any) => void) => void }) {
        routes.forEach((route) => {
            let router = new route()
            this.app.register(router.routes, { prefix: router.prefix_route })
        })

        this.app.get('/healthcheck', async (request, reply) => { reply.send({healthcheck: "server is alive"}) })
    }


    public listen() {
        this.app.listen({port: this.appPort})
    }
}

export default App