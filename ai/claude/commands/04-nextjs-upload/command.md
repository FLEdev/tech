---
allowed-tools: Read, Edit, Write
description: Execute Script and after that orchestrate based on Instructions.
---

# IMPORTANT
# Drop previous State, Context and Memory!!!
# Each step is important, if not applicable or failed, stop the execution and ask for instructions. Use a Transaction log in order to revert changes if any Step would fail.
# Run following shell commands and expand/show each result output:
## $ set -e  # Exit on error
## $ ASSETS_DIR=~/.claude/commands/04-nextjs-upload/assets
## $ echo "ASSET directory: ${ASSETS_DIR}"
## $ pnpm add tus-js-client @tus/file-store @tus/server @uppy/compressor @uppy/core @uppy/dashboard @uppy/drag-drop @uppy/file-input @uppy/form @uppy/image-editor @uppy/progress-bar @uppy/react @uppy/remote-sources @uppy/screen-capture @uppy/status-bar @uppy/thumbnail-generator @uppy/transloadit @uppy/tus @uppy/url @uppy/webcam @uppy/xhr-upload @uppy/zoom
## $ mkdir -p src/app/api
## $ cp -R "${ASSETS_DIR}"/transloadit "${ASSETS_DIR}"/xhr "${ASSETS_DIR}"/tus src/app/api/
## $ cp -R "${ASSETS_DIR}"/upload src/components/