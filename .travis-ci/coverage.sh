#!/usr/bin/env bash

if [[ "$( node --version ) " != v4.* ]] ; then
    # Remap coverage report back to typescript files
    npm install remap-istanbul
    # needs node 6 or later
    remap-istanbul -i ./coverage/coverage.json -o ./coverage/coverage-remapped.json || exit 1
    istanbul report --include ./coverage/coverage-remapped.json text lcovonly || exit 1
    # Send to coveralls
    npm install coveralls
    ( cat ./coverage/lcov.info | coveralls ) || exit 1
fi