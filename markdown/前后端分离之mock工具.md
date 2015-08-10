## 前后端分离之mock工具分享

#### 数云前端开发发展史
1. java web
	* 优点：前后端接口联调方便
	* 缺点：需要配置一大堆后端环境，前后端代码无法分离
2. wiremock
	* 优点：只写配置不写代码，前端接口不依赖后端，可以聊聊前后端分离的事了。
	* 缺点：我不想装JDK！__files是什么鬼！
3. express(当前现状)
	* 优点：nodejs才是我们的主场！
	* 缺点：
		* 以express框架为基础搭建静态服务器&mock服务器，需要copy一堆代码
		* mock行为是纯静态行为，无法与接口交互。PUT POST DELETE 接口动作无法持久化数据。
		* 与后端(第三方接口提供者)联调麻烦。每次联调之前还需要将web发布到某一台机器，通过机器(nginx服务器配置)提供相应接口调用环境。

#### 心路历程
1. json-server  
	* Done：
		* PUT等操作数据不能被持久化的问题(使用json作文件数据库)
	* Problems：
		* 无法指定静态文件服务器根路径(默认为public)，跟wiremock一样。
		* 不支持多级资源嵌套(支持的嵌套最大长度为```/users/1/roles```，```/users/1/roles/1```就不能正确解析了)
		* 不提供代理服务
2. json-mock
	* Done：
		* 支持多级资源嵌套（超过两级会有问题，但这也不是问题，因为资源嵌套超过两级说明你的api设计有问题）
	* Problems
		* 静态服务器跟代理服务依然不提供
3. [json-mock-server](https://github.com/kuitos/json-mock-server)
	* Done：
		* 静态服务器根目录可配置
		* 提供http代理服务
