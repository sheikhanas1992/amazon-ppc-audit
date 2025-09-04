#!/usr/bin/env bash
set -e

# Usage:
#   ./git-init-and-push.sh <git-remote-url>
# Example:
#   ./git-init-and-push.sh git@github.com:YOUR_USERNAME/amazon-ppc-audit.git

REPO_URL="$1"  # e.g. git@github.com:USERNAME/amazon-ppc-audit.git

if [ -z "$REPO_URL" ]; then
  echo "Usage: $0 <git-remote-url>"
  exit 1
fi

# If .git exists, ask user to confirm (prevent accidental overwrite)
if [ -d ".git" ]; then
  echo ".git already exists in this directory."
  read -p "Do you want to continue and overwrite remote 'origin'? (y/N): " yn
  case "$yn" in
    [Yy]* ) echo "Proceeding...";;
    * ) echo "Aborting."; exit 1;;
  esac
fi

# Initialize repo if needed
if [ ! -d ".git" ]; then
  git init
  git checkout -b main
else
  # ensure branch exists locally
  git checkout -B main
fi

# Add files and initial commit (skip if no changes to commit)
git add .

# Commit only if there are staged changes
if git diff --cached --quiet; then
  echo "No changes to commit."
else
  git commit -m "chore: initial commit — Amazon PPC Audit SaaS (UX-ready scaffold)"
fi

# Add or update remote
if git remote get-url origin >/dev/null 2>&1; then
  git remote remove origin
fi
git remote add origin "$REPO_URL"

# Push to remote
git push -u origin main

# Push tags if any
git push origin --tags || true

echo "Pushed to $REPO_URL"
