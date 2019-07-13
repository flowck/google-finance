#!/bin/bash

# Build the project
npm run build

# Navigate to the build files
cd dist

# Deploy to surge 
surge