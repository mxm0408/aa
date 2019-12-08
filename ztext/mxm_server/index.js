const Koa = require('koa');
const router = require('koa-router')();
const static = require('koa-static');
const query = require("./db/index")
const path = require('path');
const bodyParser = require('koa-bodyparser');

var app = new Koa();
app.use(bodyParser());
app.use(router.routes());
app.use(static(path.join(__dirname, "public")))

// 查找
router.get("/api/getlist", async (ctx) => {
    try {
        let list = await query("select * from mxmlist")
        ctx.body = {
            code: 1,
            list
        }
    } catch (e) {
        ctx.body = {
            code: 0,
            msg: e
        }
    }
})

// 删除
router.get("/api/del", async (ctx) => {
    let { id } = ctx.query;
    if (id) {
        let obj = await query("select * from mxmlist where id=?", [id])
        if (obj.length) {
            try {
                await query("delete from mxmlist where id=?", [id])
                ctx.body = {
                    code: 1,
                    msg: "删除成功"
                }
            } catch (e) {
                ctx.body = {
                    code: 0,
                    msg: e
                }
            }
        } else {
            ctx.body = {
                code: 2,
                msg: "该用户不存在"
            }
        }
    } else {
        ctx.body = {
            code: 2,
            msg: "请输入ID"
        }
    }
})

// 添加
router.post("/api/add", async (ctx) => {
    let { name, date, msg, pwd } = ctx.request.body;

    if (name && date && msg && pwd) {
        try {
            await query("insert into mxmlist (name,date,msg,pwd) values (?,?,?,?)",
                [name, date, msg, pwd])
            ctx.body = {
                code: 1,
                msg: "添加成功"
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                msg: e
            }
        }
    } else {
        ctx.body = {
            code: 2,
            msg: "请输入完整"
        }
    }
})

// 修改密码&&年龄
router.post("/api/chg", async (ctx) => {
    let { pwd, newpwd, age, name } = ctx.request.body;

    if (pwd && newpwd) {
        try {
            await query("update mxmlist set pwd=? where name=?",
                [newpwd, name])
            ctx.body = {
                code: 1,
                msg: "修改成功"
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                msg: e
            }
        }
    } else if (age) {
        try {
            await query("update mxmlist set age=? where name=?",
                [age, name])
            ctx.body = {
                code: 1,
                msg: "修改成功"
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                msg: e
            }
        }
    } else {
        ctx.body = {
            code: 2,
            msg: "请输入参数"
        }
    }
})

// 登录
router.get("/api/login", async(ctx) => {
    // 非空校验在前端写
    let { name, pwd } = ctx.query;

    let obj = await query("select * from mxmlist where name=?", [name])
    if(obj.length){
        if (obj[0].name==name&&obj[0].pwd==pwd){
            ctx.body = {
                code: 1,
                msg: "登录成功"
            }
        }else{
            ctx.body = {
                code: 0,
                msg: "用户名和密码不正确"
            }
        }
    }else{
        ctx.body = {
            code: 2,
            msg: "该用户不存在"
        }
    }
})

// 注册
router.get("/api/sign", async(ctx) => {
    // 非空校验在前端写
    let { name } = ctx.query;

    let obj = await query("select * from mxmlist where name=?", [name])
    if (!obj.length){
        ctx.body = {
            code: 1,
            msg: "注册成功"
        }
    }else{
        ctx.body = {
            code: 0,
            msg: "用户名已存在"
        }
    }
})

app.listen(3000, () => {
    console.log("服务开启")
})