#!/bin/bash

# Check for NVM existence
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
    source "$NVM_DIR/nvm.sh"
    nvm use 20 || { echo "Failed to switch to Node version 20"; exit 1; }
else
    echo "NVM is not installed. Please install NVM and try again."
    exit 1
fi

# Check for .env file and source it
if [ -f ".env" ]; then
    set -a 
    source .env
    set +a
else
    echo "Warning: .env file not found. Skipping environment variables setup."
fi

# Create a new branch for testing
NEW_BRANCH="test-deploy-$(date +%Y%m%d%H%M%S)"
git checkout -b "$NEW_BRANCH"

# Pull latest changes from the develop branch
if git pull origin develop; then
    echo "Successfully pulled latest changes from develop into $NEW_BRANCH."
else
    echo "Failed to pull changes from develop. Please check your connection or permissions."
    exit 1
fi

# Install dependencies
if npm ci; then
    echo "Dependencies installed successfully."
else
    echo "Failed to install dependencies. Please check the npm logs."
    exit 1
fi

# Build the project
if npm run build; then
    echo "Project built successfully."
else
    echo "Build failed. Please check the build logs."
    exit 1
fi

# Assuming tests are successful, merge the new branch into develop
git checkout develop
if git merge "$NEW_BRANCH" --no-ff; then
    echo "Successfully merged $NEW_BRANCH into develop."
else
    echo "Failed to merge $NEW_BRANCH into develop. Please check for conflicts or permissions."
    exit 1
fi

# Restart the PM2 process
if pm2 restart taxnet-frontend-v2; then
    echo "Successfully restarted the PM2 process for taxnet-frontend-v2."
else
    echo "Failed to restart the PM2 process. Please check the PM2 logs."
    exit 1
fi

# Cleanup: delete the temporary branch
git branch -d "$NEW_BRANCH"