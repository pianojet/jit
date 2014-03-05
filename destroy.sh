#!/bin/bash
kill -9 `ps -ef | grep "jit-server.js" | grep -v grep | awk '{print $2}'`
