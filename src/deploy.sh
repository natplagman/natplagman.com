#!/bin/bash

# Build
echo -e "\033[0;32mCompiling Typescript...\033[0m"
tsc
echo -e "\033[0;32mBuilding Hugo...\033[0m"
hugo -s hugo -d public --config config.toml -t ""

# Publish
git submodule update
cd hugo/public

echo -e "\033[0;32mDeploying updates to GitHub from $(pwd)...\033[0m"

git checkout master
git add .

msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

git push origin master

# Return
cd ../..