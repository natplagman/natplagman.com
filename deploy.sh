#!/bin/bash
cd $(dirname $0)

# Extract
tar -xzf package.tgz
rm package.tgz

cp www/.htaccess dist/.htaccess

rm -rf www_old
mv www www_old
mv dist www
rm -r dist
