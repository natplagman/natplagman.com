#!/bin/bash
export SSHPASS=$DEPLOY_PASS
tar -czf package.tgz dist
sshpass -e scp package.tgz $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
sshpass -e scp deploy.sh $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
sshpass -e ssh $DEPLOY_USER@$DEPLOY_HOST $DEPLOY_PATH/deploy.sh 
