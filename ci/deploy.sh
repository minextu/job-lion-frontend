#!/bin/bash
if [ $1 == "staging" ]; then
    server="deploy@job-lion.et.tc"
    folder="/var/www/et.tc/job-lion/staging/frontend"
#elif [ $1 == "production" ]; then
#    server="deploy@et.tc"
#    folder="/var/www/et.tc/Root"
else
    echo "Not implemented, yet"
    exit
fi

# install dependencies
apt-get update -yqq
apt-get install rsync -yqq

# install ssh key
[[ -f /.dockerenv ]] && eval $(ssh-agent -s)
[[ -f /.dockerenv ]] && ssh-add <(echo "$SSH_PRIVATE_KEY")

# add server host keys
mkdir -p ~/.ssh
[[ -f /.dockerenv ]] && echo "$SSH_SERVER_HOSTKEYS" > ~/.ssh/known_hosts

# build static files
npm install
npm run build

# sync static files to server
rsync --delete -ave "ssh" build/ $server:$folder
