#!/bin/bash
# change chron to run this script every day
DATE=`date +%Y-%m-%d:%H:%M:%S`
sudo mongodump --db test --out ./backup/$DATE
