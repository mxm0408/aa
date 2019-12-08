#! /usr/bin/env  node


const Koa = require("koa")

const router = require("koa-router")()

const bodyParser = require("koa-bodyparser")

const static = require("koa-static")

const path = require("path")

let query = require("./db/query")

let app = new Koa()


app.use(static(path.join(__dirname, "public")))

app.use(bodyParser())

app.use(router.routes())

app.use(router.allowedMethods())

//数据库的查找数据
router.get("/api/list", async (ctx) => {
    try {
        let list = await query('select * from 1706e')
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
//数据库的增加数据
router.post("/api/add", async (ctx) => {
    console.log(ctx.request.body)
    let { username, pas } = ctx.request.body

    if (username && pas) {
        //判断用户是否已经存在
        let user=await query('select * from 1706e where username=?',[username])
        if(user.length){
            ctx.body={
                code:2,
                mag:"此用户已经存在,请勿重复添加"
            } 
        }else{
            //不存在将添加
            try {
                await query('insert into 1706e (username,pas) values (?,?)', [username, pas])
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
        }
       
    } else {
        ctx.body = {
            code: 2,
            msg: "添加失败,信息未填写完整"
        }
    }

})

//数据库的删除

router.get("/api/del",async (ctx)=>{
    let {id}=ctx.query
    if(id){
        await query("delete from 1706e where id=?",[id])
        ctx.body={
            code:0,
            msg:"删除成功"
        }
    }else{
        ctx.body={
            code:2,
            msg:"缺少你删除的条件"
        }
    }
})
app.listen(3000, () => {
    console.log("服务开启了")
})