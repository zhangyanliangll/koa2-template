1.安装：
npm install -g koa-generator
2.新建项目
koa2 -e [name]
3.npm install
npm install --update-binary
npm run dev

#插件
1.cross-env -D | 设置环境变量
  package.json -> scripts -> cross-env NODE_ENV=dev
2.mysql2 sequelize -D 
  下载mysql,sequelize模型建库
3.eslint，babel-eslint,pre-commit -D | 配置eslint及pre-commit结合使用
	scripts："lint": "eslint --ext .js ./src", | 配置elint检查命令
	"pre-commit":[   | 提交前进行验证
		"lint"
	]
4.jsonwebtoken -s | 加密和解密 token
5.koa-jwt -s | JSON Web Token 解决登录问题
6.koa-body -s | 文件上传
 