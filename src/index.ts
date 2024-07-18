import { Elysia } from 'elysia';

const plugin = new Elysia({ name: 'test' }).derive({ as: 'global' }, () => {
  return {
    test: 'test',
  };
});

const app = new Elysia()
  .use(plugin)
  .onError(({ test }) => {
    console.log(test);
  })
  .get('/', ({ test }) => {
    throw new Error(test);
  })
  .listen(7003);

console.log(`http://${app.server?.hostname}:${app.server?.port}`);
