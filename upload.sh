#!/usr/bin/env bash
npm run build
ssh -v kasun@jetson.knnect.com 'rm -R /home/kasun/testing/me/public/'
scp -v -r build/ kasun@jetson.knnect.com:/home/kasun/testing/me/public/