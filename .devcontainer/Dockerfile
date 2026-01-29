ARG VARIANT="24-bookworm"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:1-${VARIANT}

# Install 24.13.0 version of Node.js using nvm
ARG EXTRA_NODE_VERSION="24.13.0"
RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

## install emscripten
WORKDIR /home/node
RUN su node -c "git clone --depth 1 --branch 3.1.64 https://github.com/emscripten-core/emsdk.git"
WORKDIR emsdk
RUN su node -c "./emsdk install 3.1.64"
RUN su node -c "./emsdk activate 3.1.64"
