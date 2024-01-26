
> https://juejin.cn/post/7247059220143177783?searchId=2023122919554640BCCCE5C2F2DFFD15E8

# Features

- [x] user - crud operation
- [x] support mysql
- [x] support class-validator
- [x] support log4js
- [x] support swagger
- [x] support jwt

## Todo
- [ ] redis
- [ ] config .env .env.test .env.dev .env.prod
- [ ] full package deploy: server + front
- [ ] design ui



问题：
1. 全局的声明文件怎么自动识别
2. nestjs设置alias path

## 其他
1. pnpm 科学节省磁盘空间
  * 建议使用pnpm安装依赖
  * 查看全局`pnpm store`仓库地址是否有效
  ```
    pnpm config get store-dir

    // 如果没有的话，需要指定才会正常生效
    pnpm config set store-dir ~/.pnpm-store // 设置后需要重启系统
  ```
  ? 为什么设置后node_modules还是很大





