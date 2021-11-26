#!/bin/sh -l
touch ../../.npmrc
echo "@${ORG_NAME}:registry=https://npm.pkg.github.com/${ORG_NAME}" > ../../.npmrc
echo "//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}" >> ../../.npmrc
