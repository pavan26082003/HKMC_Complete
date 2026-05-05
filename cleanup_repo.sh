#!/bin/bash

# Script to safely remove unwanted files from git tracking
# Run this script when no other git processes are running

echo "Cleaning up repository..."

# Wait for any git processes to finish
sleep 2

# Remove the lock file if it exists
if [ -f ".git/index.lock" ]; then
    echo "Removing stale lock file..."
    rm -f .git/index.lock
fi

# Stage the changes
echo "Staging changes..."
git add .gitignore
git add HKMC-main/

# Remove dist folder from git tracking (keeps local files)
echo "Removing dist folder from git tracking..."
git rm -r --cached dist 2>/dev/null || echo "dist already removed or not tracked"

# Remove .vscode from git tracking (optional)
echo "Removing .vscode folder from git tracking..."
git rm -r --cached .vscode 2>/dev/null || echo ".vscode already removed or not tracked"

# Show status
echo ""
echo "Current status:"
git status

echo ""
echo "If everything looks good, commit with:"
echo "git commit -m 'chore: remove unwanted files and folders from tracking'"
echo "git push"
