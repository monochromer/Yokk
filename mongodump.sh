#!/bin/bash
# change chron to run this script every day
DATE=`date +%Y-%m-%d:%H:%M:%S`
mongodump --db test --host 46.101.195.41:27017 --out /home/max/backup/$DATE
