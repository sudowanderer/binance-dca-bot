# 第一阶段：构建阶段
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装所有依赖项，包括开发依赖项
RUN npm install --verbose

# 复制应用代码
COPY . .

# 构建应用
RUN npm run build

# 第二阶段：最终镜像
FROM node:20-alpine

# 安装必要的软件包
RUN apk add --no-cache bash busybox-suid tzdata

# 设置工作目录
WORKDIR /usr/src/app

# 从构建阶段复制构建产物和依赖项
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

# 定义环境变量
ENV NODE_ENV=production

# 复制脚本文件
COPY run-app.sh /usr/src/app/run-app.sh
COPY entrypoint.sh /usr/src/app/entrypoint.sh

# 创建日志目录
RUN mkdir -p /var/log

# 设置脚本权限
RUN chmod +x /usr/src/app/run-app.sh /usr/src/app/entrypoint.sh

# 设置入口点
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]