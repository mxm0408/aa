const Koa = require("koa")
const static = require("koa-static")
const router = require("koa-router")()
const query = require("./bd/index")
const bodyparser = require("./middleware/bodyparser")
const path = require("path")

const app = new Koa()
app.use(bodyparser())
app.use(router.routes())
app.use(static(path.join(__dirname, "public")))

// 分页
router.get("/api/litlist", async (ctx) => {
    let { pagenum = 1, limit = 2 } = ctx.query;

    let total = await query("select count(*) from list")//总个数
    let start = (pagenum - 1) * limit
    try {
        let list = await query(`select * from list limit ${start},${limit}`)
        ctx.body = {
            code: 1,
            list,
            total:total[0]["count(*)"]
        }
    } catch (e) {
        ctx.body = {
            code: 0,
            msg: e
        }
    }
})

// getlist
router.get("/api/getlist",async(ctx)=>{
    try{
        let list=await query("select * from list")
        ctx.body = {
            code: 1,
            list
        }
    }catch(e){
        ctx.body = {
            code: 0,
            msg: e
        }
    }
})

// delete
router.get("/api/del",async(ctx)=>{
    let {id}=ctx.query
    if(id){//传没传
        let obj=await query("select * from list where id=?",[id])
        if(obj.length){
            try{
                await query("delete from list where id=?",[id])
                ctx.body = {
                    code: 1,
                    msg:"删除成功"
                }
            }catch(e){
                ctx.body = {
                    code: 0,
                    msg: e
                }
            }
        }else{
            ctx.body = {
                code: 2,
                msg: "该用户不存在"
            }
        }
    }else{
        ctx.body = {
            code: 2,
            msg: "请输入正确ID"
        }
    }
})

// add
router.post("/api/add",async(ctx)=>{
    let {name,pwd,phone}=ctx.request.body
    if(name&&pwd&&/^\d{4}$/.test(pwd)){
        try{
            let obj=await query("select * from list where name=?",[name])
            if(!obj.length){
                await query("insert into list (name,pwd,phone) values (?,?,?)",[name,pwd,phone])
                ctx.body = {
                    code: 1,
                    msg: "添加成功"
                }
            }else{
                ctx.body = {
                    code: 2,
                    msg: "用户名已存在"
                }
            }
        }catch(e){
            ctx.body = {
                code: 0,
                msg: e
            }
        }
    }else{
        ctx.body = {
            code: 2,
            msg: "请正确输入"
        }
    }
})

// change
router.post("/api/change",async(ctx)=>{
    
})

app.listen(3000, () => {
    console.log("服务开启成功")
})