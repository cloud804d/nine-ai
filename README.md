# NineAI Docker

> [!NOTE]
> 本项目仅为NineAI提供Docker快捷部署，不负责NineAI项目维护

后台地址 `/nineai/admin`，超级管理员账号为 `super`，密码为 `nine-super`

### 远程镜像部署
```shell
# 拉取远程镜像
$ docker pull ghcr.io/cloud804d/nine-ai:latest

# 创建桥接网络
$ docker network create -d bridge nineai

# 启动mysql
$ docker run -d --name nine-ai-mysql --restart unless-stopped \
  -p 13306:3306 --network nineai \
  -e TZ=Asia/Shanghai -e MYSQL_ROOT_PASSWORD=chat-nine-ai-pass mysql:8.0

# 启动redis
$ docker run -d --name nine-ai-redis --restart unless-stopped \
  -p 16379:6379 --network nineai \
  -e TZ=Asia/Shanghai redis:6.0-alpine \
  redis-server --requirepass chat-nine-ai-pass

# 启动项目
$ docker run -d --name nine-ai --restart unless-stopped \
  -p 9520:9520 --network nineai \
  -e TZ=Asia/Shanghai \
  -e JWT_SECRET=chat-cooper \
  -e MYSQL_HOST=nine-ai-mysql \
  -e MYSQL_PORT=3306 \
  -e MYSQL_USERNAME=root \
  -e MYSQL_PASSWORD=chat-nine-ai-pass \
  -e MYSQL_DATABASE=chatgpt \
  -e REDIS_HOST=nine-ai-redis \
  -e REDIS_PORT=6379 \
  -e REDIS_PASSWORD=chat-nine-ai-pass \
  ghcr.io/cloud804d/nine-ai

# 查看日志
$ docker logs -f -n 100 nine-ai
```

其中，`-p 13306:3306` 表示将桥接网络中的 `3306` 端口映射到宿主机的 `13306` 端口，`-p 16379:6379` 和 `-p 9520:9520` 同理，可以根据需要进行修改。如已有mysql和redis服务，可跳过上述步骤中的启动mysql和启动redis，并自行修改 `MYSQL_HOST` 和 `REDIS_HOST` 确保容器内网络可访问。

### 本地构建部署
```shell
$ git clone --depth=1 https://github.com/cloud804d/nine-ai.git

$ DOCKER_BUILDKIT=1 docker compose up -d
```

### Zeabur云端部署
**自动部署**

[![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/3JBCWY?referralCode=cloud804d)

**手动部署**
1. 首先 fork 一份代码。
2. 进入 [Zeabur](https://zeabur.com?referralCode=cloud804d)，登录，进入控制台。
3. 新建一个 Project，在 Service -> Add Service 选择 Marketplace，新建两个 Service，分别选择 MySQL 和 Redis。
4. 然后在 Service -> Add Service，选择 Git（第一次使用需要先授权），选择你 fork 的仓库。
5. 进入下方 Domains，选择一个合适的域名前缀，如 `my-nine-ai`，最终域名为 `my-nine-ai.zeabur.app`，也可以 CNAME 自己的域名。
6. 等待部署完成，点击生成的域名进入 NineAI。


### 环境变量
```
# 自定义端口
PORT=9520

# jwt token
JWT_SECRET=chat-cooper
# jwt token 过期时间
JWT_EXPIRESIN=7d

# mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USERNAME=root
MYSQL_PASSWORD=chat-nine-ai-pass
MYSQL_DATABASE=chatgpt

# redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

#  mailer 邮件服务
MAILER_HOST=smtp.163.com
MAILER_PORT=465
MAILER_USER=
MAILER_PASS=
MAILER_FROM=

# mj并发数
MJ_CONCURRENCY=3
```
