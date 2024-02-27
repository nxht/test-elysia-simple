import { Elysia } from "elysia";


class AClass {
  run() {
    return 1
  }
}


const p = new Elysia().decorate('a', new AClass()).resolve(({a}) => {
  const b = a.run()
  return {b}
})


const app = new Elysia().use(p)
  .get("/", ({b}) => `hi, ${b}`)
  .listen(3000);

console.log(
  `http://${app.server?.hostname}:${app.server?.port}`
);
