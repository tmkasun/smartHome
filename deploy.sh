#!/usr/bin/env bash
npm run build
ssh -v nvidia@jetson.knnect.com 'rm -R /home/nvidia/projects/smartHome/public/'
scp -v -r build/ nvidia@jetson.knnect.com:/home/nvidia/projects/smartHome/public/