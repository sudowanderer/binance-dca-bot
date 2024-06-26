#!/bin/sh

# Check if CRON_SCHEDULE is set
if [ -z "$CRON_SCHEDULE" ]; then
  echo "Error: CRON_SCHEDULE environment variable is not set."
  exit 1
fi

# Check if TIMEZONE is set, if not, warn the user and default to UTC
if [ -z "$TZ" ]; then
  echo "Warning: TZ environment variable is not set. Defaulting to UTC."
fi

# Debugging: Print current date and time to verify the timezone
echo "Current date and time:"
date

# Write the cron schedule to the crontab file
echo "$CRON_SCHEDULE /usr/src/app/run-app.sh >> /var/log/cron.log 2>&1" > /etc/crontabs/root

# Create the log file if it doesn't exist
touch /var/log/cron.log

# Ensure run-app.sh has execute permissions
chmod +x /usr/src/app/run-app.sh

# Start cron service in foreground with log level 8 (debug)
crond -f -l 8 &

# Debugging: List cron jobs
echo "Current cron jobs:"
crontab -l

# Tail the cron log file in the background
tail -F /var/log/cron.log &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?
