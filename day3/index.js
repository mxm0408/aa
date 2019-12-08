const Koa = require("koa");

const app = new Koa();

app.use(async (ctx, next) => {
    console.log(ctx.path)
    let startTime = new Date() * 1;

    console.log("第一层开始")

    await next();

    console.log("第一层结束")
    let endTime = new Date() * 1;
    let timer = endTime - startTime;


    if (ctx.path == "/mxm") {
        ctx.body = timer
    }
})

app.use(async (ctx, next) => {
    console.log("第二层开始")

    await next();

    console.log("第二层结束")
})

function delay() {
    return new Promise((resolve, reject) => {
       setTimeout(() => {
            resolve("------")
        }, 1000)
    })
}

app.use(async (ctx, next) => {
    console.log("第三层开始")
    let a = await delay();
    console.log(a)
})

app.listen(9000, () => {
    console.log("启动成功")
})