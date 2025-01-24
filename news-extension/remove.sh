#!/bin/bash

# List of files and directories to remove
files_to_remove=(
    "src/app/auth/page.tsx"
    "src/app/api/auth/[...nextauth]"
    "src/app/providers.tsx"
    "src/app/layout.tsx"
    "src/app/page.tsx"
    "src/components/icons/google.tsx"
    "src/app"  # Remove the entire app directory after removing its contents
)

# Remove each file/directory
for file in "${files_to_remove[@]}"; do
    if [ -e "$file" ]; then
        echo "Removing: $file"
        rm -rf "$file"
    else
        echo "Already removed or not found: $file"
    fi
done

echo "Cleanup completed!"