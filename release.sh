#!/bin/bash

set -e

# 检查是否传递了版本号
if [ -z "$1" ]; then
  echo "Usage: ./release.sh x.x.x"
  exit 1
fi

NEXT_VERSION=$1

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
  echo "Please commit all your changes before releasing."
  exit 1
fi

echo "Releasing version $NEXT_VERSION..."

# 更新 package.json 中的版本号
npm version $NEXT_VERSION --no-git-tag-version

# 更新 .env 文件中的版本号
if grep -q "APPLICATION_VERSION=" .env; then
  sed -i '' "s/^APPLICATION_VERSION=.*/APPLICATION_VERSION=$NEXT_VERSION/" .env
else
  echo "APPLICATION_VERSION=$NEXT_VERSION" >> .env
fi

# 提交更改并创建标签
git commit -am "VAR: Bump version to $NEXT_VERSION."
git tag -a "$NEXT_VERSION" -m "Release $NEXT_VERSION."

echo "Version $NEXT_VERSION released successfully."