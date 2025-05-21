#!/bin/bash

# 1. 최신 organization 코드 가져오기
echo "🔄 Pull from origin (조직: BTS-Frontend)"
git checkout main
git pull origin main

# 2. 개인 레포지토리에 업데이트된 코드 푸시하기
echo "🚀 Push to personal (개인: bts-frontend)"
git push personal main

echo "✅ 동기화 완료: 조직 → 개인 → Vercel"