#!/bin/sh

# Log the start of the script
echo "Running run-app.sh at $(date)" >> /var/log/cron.log

# Change to the application directory
cd /usr/src/app

# Start the Node.js application using the built files in the dist directory
node dist/app.js >> /var/log/cron.log 2>&1