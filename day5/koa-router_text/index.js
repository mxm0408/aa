
const Koa = require("koa");
const router = require("koa-router")();
const static = require("koa-static");
const bodyparser = require("koa-bodyparser");
const query = require("./db/index");
const path = require("path")

const app = new Koa();

// console.log(__dirname)
// console.log(process.cwd())
app.use(static(path.join(__dirname, "public")))
app.use(bodyparser())
app.use(router.routes())
// app.use(router.allowedMethods());

router.get("/api/findlist", async (ctx) => {
    try {
        let list = await query("select * from list") //异步
        ctx.body = {
            code: 1,
            data: list
        }
    } catch (e) {
        ctx.body = {
            code: 0,
            msg: e
        }
    }
})

router.post("/api/add", async (ctx) => {
    let { name, pwd, phone } = ctx.request.body
    if (name && pwd) {
        let user = await query("select * from list where name=?", [name])

        if (user.length) {
            ctx.body = {
                code: 2,
                msg: "用户名已存在"
            }
        } else {
            try {
                await query("insert into list (name,pwd,phone) values (?,?,?)", [name, pwd, phone])
                ctx.body = {
                    code: 1,
                    msg: "添加成功"
                }
            } catch (e) {
                ctx.body = {
                    code: 0,
                    msg: "添加失败"
                }
            }
        }
    } else {
        ctx.body = {
            code: 2,
            msg: "缺失参数"
        }
    }
})

router.get("/api/del", async (ctx) => {
    let { id } = ctx.query;
    if (id) {   //容错处理
        let user = await query("select * from list where id=?", [id])

        try {
            if (user.length) {
                await query("delete from list where id=?", [id])
                ctx.body = {
                    code: 1,
                    msg: "删除成功"
                }
            } else {
                ctx.body = {
                    code: 2,
                    msg: "用户名不存在"
                }
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                msg: e
            }
        }
    } else {
        ctx.body = {
            code: 0,
            msg: "请输入正确ID"
        }
    }
})

router.get("/api/limit", async (ctx) => {
    let { pagenum = 1, limit = 2 } = ctx.query;

    let pages = await query("select count(*) from list")//总页数
    let start = (pagenum - 1) * limit
    try {
        let list = await query(`select * from list limit ${start},${limit}`)
        ctx.body = {
            code: 1,
            msg: list,
            pages: pages[0]['count(*)']
        }
    } catch (e) {
        ctx.body = {
            code: 0,
            msg: e
        }
    }
})

router.post("/api/chg", async (ctx) => {
    let { name, pwd, phone, id } = ctx.request.body
    let obj = await query("select * from list where id=?", [id])

    if (obj.length) {//是我的用户
        let aa = { name, pwd, phone };
        let newaa = {}
        for (item in aa) {
            if (aa[item]) {//排除undefined
                newaa[item] = aa[item]
            }
        }

        try {
            for (item in newaa) {
                if (item == "name" && newaa[item] == obj[0].name) {//用户名去重
                    ctx.body = {
                        code: 2,
                        msg: "用户名已存在"
                    }
                } else {
                    await query(`update list set ${item}=? where id=?`, [newaa[item], id])
                    ctx.body = {
                        code: 1,
                        msg: "修改成功"
                    }
                }
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                msg: e
            }
        }

    } else {
        ctx.body = {
            code: 0,
            msg: "请输入正确的用户ID"
        }
    }
})

app.listen(3000, () => {
    console.log("服务启动")
})