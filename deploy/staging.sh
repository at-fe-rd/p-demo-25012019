#!/bin/bash

set -e -o pipefail

ssh asiantech@172.16.110.40 "bash AT-Portal-FE/deploy/run.sh $1 $2"
