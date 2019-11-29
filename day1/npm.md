# npm
###### npm (node package manager) 是node包管理器

<br>
<br>

#### 创建
> 1. 新建文件夹
> 2. npm init （-y） 生成package.json包描述文件

<br>
<br>

#### 下载 & 卸载
######   本地下载/本地卸载

1. 安装本地开发依赖 （存在于 devDependencies 字段内）
>  下载 （ npm i 包名 --save-dev / -D ）

```
下载 npm i 包 --save-dev //或 npm i 包 -D
```

> 卸载

```
 npm uninstall 包 -D 
```


2.  安装本地线上依赖 （存在于 dependencies 字段内）

>  下载 （ npm i 包名 --save / -S ）

```
npm i 包 --save //或 npm i 包 -S
```

>  卸载

```
 npm uninstall 包 -S
```

<br>

######   全局下载/全局卸载

>  下载 （ npm i 包名 -g ）

```
npm i 包 -g 
```

>  卸载

```
 npm uninstall 包 -g
```

<br>

######   更新
>  npm update 包名 -g / -D / -S

```
 npm update 包 -g /
 
 npm update 包 -D /
 
 npm update 包 -S 
```

<br>
<br>

#### #node.js 
###### node.js 使用 commonjs 规范 （一个js就是一个模块）


引入模块 | 抛出模块
---|---
 require ( 默认找 <br>module.exports抛出的内容 ) | module.exports 后设覆盖，多个抛出内容时可以对象形式 <br>exports 使用对象属性抛出，可写多个
 

<br>
<br>

#### #npm 包查找规则
######  require(模块标识)

模块标识：
1. 包名

<html>
&nbsp;&nbsp;&nbsp;&nbsp;先找node_modules<br><br>
&nbsp;&nbsp;如果当前文件夹没有找到node_modules，就一层一层往上找，直到磁盘根目录,如果还没有，就在全局路径查找，找不到就报错( Error : Cannot find module '包名' )，找到就返回。 <br><br>
&nbsp;&nbsp;&nbsp;&nbsp;再找对应的包名文件夹<br><br>
&nbsp;&nbsp;如果找到对应的包名文件夹，找package.json中的main字段，如果找不到，找index.js。<br><br>
</html>


2. 路径

```
相对路径  ./  表示当前 文件夹 目录内开始

绝对路径   /  表示当前 磁盘 目录内开始
```



<br>
<br>

#### #git 生成公钥和秘钥
######  GitHub支持两种协议： https 和 ssh

https | ssh
---|---
每次提交代码，<br> 都需要输入用户名和密码 | 配置公钥和秘钥

代码实现：ssh-keygen



<br>
<br>

#### 设置镜像源
>  国外：http://registry.npmjs.org/  <br>
>  淘宝：https://registry.npm.taobao.org

设置镜像源地址 | 查看镜像源地址
---|---
npm config set registry 地址 | npm config get registry

<br>
<br>

#### 下载包的步骤
1. 对应的镜像源查看是否存在执行包
2. 把指定的压缩包下载到指定的缓存目录下 （ npm config get cache）
3. 把压缩包解压到指定目录

<br>
设置全局解压目录：npm config set prefix 绝对路径<br> 
获取全局解压目录：npm config set prefix <br> 


<br>
<br>

#### 发包条件

```
1. npm 镜像源必须是国外的 （ npm config get registry）

2. 必须要有 package.json 包描述文件 （ npm init -y ）

3. 新建入口文件，编写文件 （ package.json 中的 main ）

4. npm login

5. npm publish

6. npm unpublish 包名 --force(强制) （24小时内可删）
```


<br>
<br>

#### npm常用的命令

```
npm -v                       查看版本号

npm init                     生成包描述文件

npm install                  下载包

npm search <包名>            搜索包是否存在 

npm config list              npm配置总览

npm config get/set registry  查看/设置当前的镜像源

npm root -g                  查看全局文件

npm config get/set prefix    查看/设置全局包的安装位置

npm config get cache         查看缓存目录

npm cache clean -f           清除缓存
```

