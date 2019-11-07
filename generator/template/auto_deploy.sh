#!/bin/bash

echo "node: `node -v`"
echo "npm: `npm -v`"

# change directory according your physical truth
SCRIPT_PATH=$(cd `dirname $0`; pwd)
gitDir="/opt/repos/<%= rootOptions.projectName %>"

echo -e "\033[32m [AUTO SYNC] sync demo start \033[0m"
cd $gitDir

echo -e "\033[32m [AUTO SYNC] git pull...  \033[0m"
pullResult=`git pull origin master`
fast=`echo $pullResult |grep '^Updating.*Fast-forward'`

if [ "$fast"x != ""x ];then
    echo -e "\033[34m fast-forward \033[0m"
    echo -e "\033[32m [AUTO SYNC] cd to work dir \033[0m"
    cd $SCRIPT_PATH

    echo -e "\033[32m [AUTO SYNC] npm install... \033[0m"
    npm install

    echo -e "\033[32m [AUTO SYNC] npm run build... \033[0m"
    npm run build

    echo -e "\033[32m [AUTO SYNC] sync finish \033[0m"
else
    new=`echo $pullResult |grep '^Already up-to-date'`
    if [ "$new"x != ""x ];then
        echo -e "\033[33m code is newest \033[0m"
    else
        echo -e "\033[31m pull code error \033[0m"
    fi
fi
