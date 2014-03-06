#!/bin/bash

ENV_STAGE=$1
ARG=$2

APP="jit"
APP_ENV="$APP-$ENV_STAGE"
SERVER="$APP_ENV-server.js"
LOG=/var/log/node
ACCESSLOG=$LOG/$APP_ENV-access.log
ERRORLOG=$LOG/$APP_ENV-error.log
PMT=" $APP_ENV> "



function print {
	echo " $PMT> $1"
}

function halt {
	local P="`ps -ef | grep "$SERVER" | grep -v grep | awk '{print $2}'`"
    if [ "$P" != "" ]; then
		kill -9 $P
		print "Existing server process $P killed"
		return 0
	fi
    return 1
}

if [ ! -z "$ARG" -a ! -z "$ENV_STAGE" ]; then
	if [ "$ARG" == "stop" ]; then
		halt
		if [ $? -ne 0 ]; then
			print "Server not running"
		fi
		exit 0
	elif [ "$ARG" == "start" ]; then
		halt
		node $SERVER > $ACCESSLOG 2> $ERRORLOG &
		if [ $? -ne 0 ]; then
			print "Error:"
			tail -n10 $ERRORLOG
		else
			P="`ps -ef | grep "$SERVER" | grep -v grep | awk '{print $2}'`"
			echo " $APP> Deployed, process $P"
		fi
		exit 0
	fi
fi

echo "USAGE:  deploy.sh [ start | stop ]"