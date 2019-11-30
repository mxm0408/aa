#! /usr/bin/env node

var program = require("commander");
var package = require("./package.json")
const inquirer = require('inquirer');

const fs = require("fs");
const userlist = require("./userlist.json")

const promptList = [{
    type: 'input',
    message: '设置一个用户名:',
    name: 'name',
    default: "test_user" // 默认值
}, {
    type: 'input',
    message: '请输入年龄:',
    name: 'age'
}, {
    type: 'input',
    message: '请输入身份证号码:',
    name: 'number',
    // validate: function(val) {
    //     if(val.match(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/)) { // 校验位数
    //         return val;
    //     }
    //     return "请正确输入";
    // }
}];

inquirer.prompt(promptList).then(answers => {
    let { name, age, number } = answers
    let res = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    
    if (!res.test(number)) {
        console.log("身份证号码错误")
    } else {
        let index = userlist.findIndex(item => item.number == number)
        if (index === -1) {
            let obj = { name, age, number };
            userlist.push(obj);
            fs.writeFileSync("./userlist.json", JSON.stringify(userlist))
        } else {
            console.log("用户已存在!!!!")
        }
    }
})

// program
//     .version(package.version)
//     .command('my-cli <path>')
//     .option('-a,--add <filename>','add a file')
//     .action(function(path,cmd){
//         // console.log(path)
//         // console.log(cmd.add)
//     })

// program.parse(process.argv)



// program
//     .version(package.version)
//     .option('-a,--add','add something')
//     .option('-u,--update','update something')
//     .option('-r,--remove','remove somthing')
//     .parse(process.argv)

// console.log('You choose:');

// if(program.add) console.log(' add somthing')
// if(program.update) console.log(' update something')
// if(program.remove) console.log(' remove something')


// console.log(process.argv) 
// console.log("hello "+process.argv[2]+" !")

// program
//     .version(package.version,'-v,--version')
//     .parse(process.argv)


// program
//     .version('1.0.0')
//     .option('--add-file','add a file')
//     .parse(process.argv);
// if(program.addFile) console.log('add a file')


// program
//     .version('1.0.0')
//     .option('-a,--add','add a file')
//     .option('--no-add','not add a file')
//     .parse(process.argv)

// if(program.add) console.log('add a file')
// else console.log('not add a file')


// program
//     .version('1.0.0')
//     .option('-a,--add []','add a file')
//     .parse(process.argv)
// console.log('add a file named:'+program.add)