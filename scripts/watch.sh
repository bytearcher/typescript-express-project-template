#!/usr/bin/env bash

# Common header
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
. "$DIR/common.sh"
cd "$DIR/.."


npm run clean

# Start
export DEBUG="*"
grunt --base . --gruntfile scripts/watch-Gruntfile.js
