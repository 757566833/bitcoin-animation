const path = require('path');
const Koa = require('koa');
const send = require('koa-send');
const Router = require('koa-router');

const app = new Koa();

const router = new Router();
router.get(['/', '/**'], async (ctx) => {
  const url = ctx.path;
  if (url.includes('.')) {
    await send(ctx, ctx.path, {
      root: path.join(__dirname, 'dist'),
      maxAge: 365 * 24 * 60 * 60 * 1000
    });
  }else{
    await send(ctx, 'index.html', {
      root: path.join(__dirname, 'dist'),
      maxAge: 0
    });
  }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(10001);
