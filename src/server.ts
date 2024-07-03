import fastify from "fastify";
import cors from "@fastify/cors"

const server = fastify({ logger: true });

server.register(cors, {
  origin: "*",
})

const teams = [
  {id: 1, name: "ferrari", base: "maranelo, italy"},
  {id: 2, name: "mc laren", base: "woking, united kingdom"},
  {id: 3, name: "mercedes", base: "brackley, united kingdom"},
  {id: 4, name: "red bull", base: "milton keynes, united kingdom"},
]

const drivers = [
  {id: 1, name: "max verstappen"},
  {id: 2, name: "lewis hamilton"},
  {id: 3, name: "lando norris"},
  {id: 3, name: "carlo sainz"},
]

server.get("/teams", async(request, response) => {
  response.type("application/json").code(200)

  return {teams}
});

server.get("/drivers", async(request, response) => {
  response.type("application/json").code(200);

  return {drivers}
})

interface DriverPrams {
  id: string
}

server.get<{Params: DriverPrams}>("/drivers/:id", async(request, response) => {
  const id = parseInt(request.params.id);
  const driver = drivers.find(d => d.id === id);

  if (!driver) {
    response.type("application/json").code(404);
    return {message: "Driver not found!"}
  } else {
    response.type("application/json").code(200);
    return { driver }
  }
})

server.listen({ port: 3333}, () => {
  console.log("Server init....")
})
