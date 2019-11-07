## base-framework template
基于vue的前端多页应用框架模板

## 模板包含
* 使用element-ui,axios, vue-router
* 提供相对合理的项目组织结构
* 提供通用的网络请求处理机制
* 提供和后台实时信息交互机制（socket.io）
* 抽取多页之间共享的全局公共样式
* 提供多页应用构建机制
* 提供模块化的构建脚本
* 提供debug构建机制
* 提供前端配置文件
* 提供开发环境和线上环境的一些配置自动切换（如服务器地址，url_prefix等）
* 提供vue router history模式的路由问题解决方案（包含线上环境和开发环境）
* 提供相对合理的代码分割，压缩优化机制
* 提供相对高效的构建配置（如多线程转译，多线程压缩代码等）

## 使用方法
1.安装了@vue/cli
```bash
npm install -g @vue/cli
```
2.创建工程
```bash
vue create my-project --preset kuangch/vue-preset-base-framework
```
