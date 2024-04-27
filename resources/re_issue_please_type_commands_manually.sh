#!/bin/bash

set -x
set -e

sudo cp /etc/nginx/sites-available/default ./
sudo systemctl stop nginx
sudo apt-get purge nginx nginx-common nginx-full
sudo apt-get install nginx
sudo rm /etc/nginx/sites-available/default
sudo cp nginx_default_config /etc/nginx/sites-available/default
cd ~/.acme.sh/ && sudo ./acme.sh --issue -d superbbenchmark.org --nginx --force
sudo cp default_config /etc/nginx/sites-available/default
sudo mkdir -p /etc/nginx/ssl/superbbenchmark.org/
sudo cp ~/.acme.sh/superbbenchmark.org/fullchain.cer /etc/nginx/ssl/superbbenchmark.org/
sudo cp ~/.acme.sh/superbbenchmark.org/superbbenchmark.org.cer /etc/nginx/ssl/superbbenchmark.org/
sudo cp ~/.acme.sh/superbbenchmark.org/superbbenchmark.org.key /etc/nginx/ssl/superbbenchmark.org/
sudo systemctl restart nginx
