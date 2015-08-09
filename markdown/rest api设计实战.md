## rest api设计实战

#### 前言
* 不深入细节[数云rest接口规范](http://wiki.yunat.com/pages/viewpage.action?pageId=22972519)，只分享一些要点及个人对restful api设计的一些理解及心得
* 对于前端工程师而言，良好的api设计至关重要
* angular搭配restful api可以做很多有意思的事情(后面具体讲)

#### rest简介

> In computing, Representational State Transfer (REST) is a software architecture style for building scalable web services.[1][2] REST gives a coordinated set of constraints to the design of components in a distributed hypermedia system that can lead to a higher performing and more maintainable architecture.[3]


#### 设计要点
rest不是规范，只是一种设计风格(这也是经常引起争论的原因)。我们不谈哪种是规范的，因为没有规范，我们只说哪种是目前最通用的解决方案(或者说是符合团队、公司规范的)。

1. 具有统一前缀，通常为```{服务名}/{版本号}```。如 ```/channel/1.0```
2. url代表的就是一个资源。目的就是让调用者通过url就能大致知道接口是干嘛的，如```/users```表示的就是一个user集合
3. 资源采用名词复数的形式，禁止url中出现动词，错误示例：```/users/1/delete```。 名词单数只有一种场景，即操作某个资源的某一属性，如 ```PUT /users/1/name```
4. 通过Request Method区分对资源的不同操作
	
	| Request Method | 作用 | 示例 | 特别说明 |  
	| ------ | ------------ | -----------| ----- | 
	| GET    | 获取 单个个资源/资源列表 |```GET /users``` ```GET /users/1``` | 如果我们获取的是一个资源列表(url以资源复数形式结尾)，则返回结果必须为数组，如果是单个资源，则为单一对象 |
	| POST   | 创建一个新的资源 | ```POST /users``` | 所有的创建行为都是往一个资源列表中插入新数据，所以url必须是复数结尾的(资源集合)
	| PUT    | 修改 单个资源/资源列表 | ```PUT /users/1``` | 
	| PATCH  | 修改 单个资源/资源列表 (部分属性) | ```PATCH /users/1``` |
	| DELETE | 删除 单个个资源/资源列表 | ```DELETE /users/1``` |
5. 资源命名风格。 

	|风格|说明|
	|------|------|
	|驼峰|语言相关，大部分服务端语言(Java、C#)均采用驼峰式命名。如 ```userName``` |
	|下划线分隔|语言无关，json-api标准。如 ```user_name```|
	这一点无强制要求，两种风格都可以，如果服务提供商想表明接口与语言无关，则需要采用下划线分隔法。

6. 接口响应状态由状态码控制。接口中返回```success:true```之类的信息没有任何意义  
	常用的一些状态码  
	**成功：**
	
	| 状态码 | 状态码短语 | 适用的请求 |
	| ---------- | ------- | ------ |
	| 200 | OK | GET PUT/PATCH DELETE|
	| 201 | Created | POST |
	| 204 | No Content | POST PUT/PATCH DELETE|
	**失败：**
	
	| 状态码 | 状态码短语 | 含义 |
	| ---------- | ------- | ------ |
	| 400 | Bad Request | 参数列表错误 |
	| 401 | Unauthorized | 未授权 |
	| 404 | Not Found | 资源未找到 |
	| 409 | Conflict | 资源冲突 |
	
	其他 500 502
	
7. 接口有两种，一种是面向服务的，一种是面向web的。面向服务的接口自然是细粒度度的，但是面向web的接口很多时候必须是聚合的。这也是前后端关于接口最容易不统一的地方。

#### 规范的restful接口对于前端的意义
* 更好的编码体验，更优雅的代码。 angular(ngResource)，react(GraphQL) 
* 前端缓存 [angular-utils](https://github.com/kuitos/angular-utils)
* 可以跟后端同学愉快的PK啦😂(当然前提是你对rest足够熟悉有足够的理论依据) 
