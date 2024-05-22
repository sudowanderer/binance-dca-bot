#!/bin/bash

set -e

# 检查是否传递了版本号
if [ -z "$1" ]; then
  echo "Usage: ./release.sh x.x.x"
  exit 1
fi

RAW_VERSION=$1
NEXT_VERSION="v$RAW_VERSION"

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
  echo "Please commit all your changes before releasing."
  exit 1
fi

echo "Releasing version $NEXT_VERSION..."

# 更新 package.json 中的版本号（去掉v前缀）
npm version $RAW_VERSION --no-git-tag-version

# 提交更改并创建标签
git commit -am "VAR: Bump version to $NEXT_VERSION."
git tag -a "$NEXT_VERSION" -m "Release $NEXT_VERSION."
git push origin main --tags

echo "Version $NEXT_VERSION released successfully."