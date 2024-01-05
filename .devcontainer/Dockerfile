ARG VARIANT="20-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:1-${VARIANT}

# Install 20.3.0 version of Node.js using nvm
ARG EXTRA_NODE_VERSION="20.3.0"
RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"
