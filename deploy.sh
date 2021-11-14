#!/usr/bin/env bash
npm run build
ssh -v kasun@i.knnect.com 'rm -R /home/kasun/projects/smartHome/public/'
scp -v -r build/ kasun@i.knnect.com:/home/kasun/projects/smartHome/public/