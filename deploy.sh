#!/bin/bash
node jit-server.js > /var/log/node/jit-access.log 2> /var/log/node/jit-error.log &
