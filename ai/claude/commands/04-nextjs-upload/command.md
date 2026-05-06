---
allowed-tools: Read, Edit, Write
description: Execute Script and after that orchestrate based on Instructions.
---

# IMPORTANT
## Drop previous State, Context and Memory!!!
## Phase 1: Run following shell commands and show each result output:
### $ set -e  # Exit on error
### $ ASSETS_DIR=~/.claude/commands/04-nextjs-upload/assets
### $ pnpm add tus-js-client @tus/file-store @tus/server @uppy/compressor @uppy/core @uppy/dashboard @uppy/drag-drop @uppy/file-input @uppy/form @uppy/image-editor @uppy/progress-bar @uppy/react @uppy/remote-sources @uppy/screen-capture @uppy/status-bar @uppy/thumbnail-generator @uppy/transloadit @uppy/tus @uppy/url @uppy/webcam @uppy/xhr-upload @uppy/zoom
### $ mkdir -p src/app/api
### $ cp -R "${ASSETS_DIR}"/transloadit "${ASSETS_DIR}"/assets/xhr "${ASSETS_DIR}"/assets/tus src/app/api/
### $ cp -R "${ASSETS_DIR}"/upload src/components/