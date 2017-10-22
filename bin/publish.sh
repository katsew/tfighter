#! /bin/sh

cd `dirname $0`
cd ../

ASSET_PATH=./ npm run build

cd dist/
git init 
git remote add origin git@github.com:katsew/tfighter.git
git checkout -b gh-pages
git add -A
git commit -m "Update Game"
git push origin gh-pages
