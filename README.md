#### 提交说明

    使用`git cz`代替`git commit`

#### 目录说明

目录名按照上面的命名规范，其中 components 组件用大写驼峰，其余除 components 组件目录外的所有目录均使用 kebab-case 命名。

Code

```
src                               源码目录
|-- api                              所有api接口
|-- assets                           静态资源，images, icons, styles等
|-- components                       公用组件
|-- config                           配置信息
|-- constants                        常量信息，项目所有Enum, 全局常量等
|-- directives                       自定义指令
|-- filters                          过滤器，全局工具
|-- utils                            外部引用的插件存放及修改文件
|-- styles                           样式
|-- plugins                          插件，全局使用
|-- router                           路由，统一管理
|-- store                            vuex, 统一管理
|-- themes                           自定义样式主题
|-- views                            视图目录
|   |-- role                             role模块名
|   |-- |-- role-list.vue                    role列表页面
|   |-- |-- role-add.vue                     role新建页面
|   |-- |-- role-update.vue                  role更新页面
|   |-- |-- index.less                      role模块样式
|   |-- |-- components                      role模块通用组件文件夹
|   |-- employee                         employee模块
```

##### router 与 store 目录

这两个目录一定要将业务进行拆分，不能放到一个 js 文件里。
router 尽量按照 views 中的结构保持一致
store 按照业务进行拆分不同的 js 文件

##### views 目录

- 命名要与后端、router、api 等保持一致
- components 中组件要使用 PascalCase 规则

Code

```
|-- views                            视图目录
|   |-- role                             role模块名
|   |   |-- role-list.vue                    role列表页面
|   |   |-- role-add.vue                     role新建页面
|   |   |-- role-update.vue                  role更新页面
|   |   |-- index.less                      role模块样式
|   |   |-- components                      role模块通用组件文件夹
|   |   |   |-- role-header.vue                        role头部组件
|   |   |   |-- role-modal.vue                         role弹出框组件
|   |-- employee                         employee模块
|   |-- behavior-log                      行为日志log模块
|   |-- code-generator                    代码生成器模块
```

#### 注释说明

整理必须加注释的地方

- 公共组件使用说明
- api 目录的接口 js 文件必须加注释
- store 中的 state, mutation, action 等必须加注释
- vue 文件中的 template 必须加注释，若文件较大添加 start end 注释
- vue 文件的 methods，每个 method 必须添加注释
- vue 文件的 data, 非常见单词要加注释
