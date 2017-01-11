#!/usr/bin/env bash

if [[ "${TRAVIS_NODE_VERSION}" != 4.* ]] ; then
    # Remap coverage report back to typescript files
    npm install remap-istanbul
    # needs node 6 or later
    remap-istanbul -i ./coverage/coverage.json -o ./coverage/coverage-remapped.json || true
    istanbul report --include ./coverage/coverage-remapped.json text lcovonly || true
    Send to coveralls
    npm install coveralls
    cat ./coverage/lcov.info | coveralls
fi