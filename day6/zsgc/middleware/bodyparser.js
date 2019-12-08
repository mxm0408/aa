
const qs = require("querystring")

function bodyparser(ctx) {
    return new Promise((resolve, reject) => {
        let str = ''
        ctx.req.on("data", (chunk) => {
            str += chunk
        })
        ctx.req.on("end", () => {
            resolve(qs.parse(str))
        })
    })
}


module.exports = () => {
    return async (ctx, next) => {
        ctx.request.body = await bodyparser(ctx)
        await next()
    }
}