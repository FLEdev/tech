---
allowed-tools: Read, Edit, Write
description: Implement Lexical into NextJS application by running bash-script.sh
---

# IMPORTANT
# Drop previous State, Context and Memory!!!
# #Run following shell commands and expand/show each result output:
## $ set -e  # Exit on error
## $ ASSETS_DIR=~/.claude/commands/05-nextjs-lexical/assets
## $ echo "ASSET directory: ${ASSETS_DIR}"
## $ pnpm add lexical use-debounce @excalidraw/excalidraw @lexical/code @lexical/code-prism @lexical/code-shiki @lexical/html @lexical/link @lexical/list @lexical/mark @lexical/markdown @lexical/react @lexical/rich-text @lexical/selection @lexical/table @lexical/utils @lexical/yjs @libsql/client y-websocket html-react-parser react-syntax-highlighter
## $ cp -R "${ASSETS_DIR}/lexical" ./src/components/
## $ cp -R "${ASSETS_DIR}/LexicalTextarea.tsx" ./src/components/
## $ cp -R "${ASSETS_DIR}/LexicalDemoForm.tsx" ./src/components/