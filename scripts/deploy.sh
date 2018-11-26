#!/bin/bash

yarn ws:theme storybook:build

npm install now --no-save

cp now.json packages/smartuies-theme/public

now packages/smartuies-theme/public --token="$NOW_TOKEN" --team="fadioit"

now alias --token="$NOW_TOKEN" --team="fadioit"

now rm smartuies --safe --yes --token="$NOW_TOKEN" --team="fadioit"
