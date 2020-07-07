import { Server, Model } from "miragejs";

export function makeServer({ environment = "test" } = {}) {
  let server = new Server({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create("user", { name: "Bob" });
      server.create("user", { name: "Alice" });
    },

    routes() {
      this.namespace = "api";

      this.get("/users", (schema) => {
        return schema.users.all();
      });

      this.get("/validate", () => {
          console.log('regular validation')
          return { valid: true }
      }, { timing: 1000 });
    },
  });

  return server;
}
