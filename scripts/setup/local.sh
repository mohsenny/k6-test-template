#!/bin/bash

# Install k6 (assuming Homebrew is used on macOS)
brew install k6

# Set environment variables
export MY_HOSTNAME="https://jsonplaceholder.typicode.com"
export RUN_TYPE="performance"

# Install npm dependencies
npm install

# Compile Typescript tests into Javascript under dist/
tsc