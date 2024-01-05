ARG VARIANT="20-bookworm"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:1-${VARIANT}

# Install 20.3.0 version of Node.js using nvm
ARG EXTRA_NODE_VERSION="20.3.0"
RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

## install emscripten
WORKDIR /tmp
RUN git clone --depth 1 --branch 2.0.24 https://github.com/emscripten-core/emsdk.git
WORKDIR emsdk
RUN ./emsdk install 2.0.24
RUN ./emsdk activate 2.0.24
RUN set PATH="/tmp/emsdk:/tmp/emsdk/upstream/emscripten:${PATH}"
RUN set EMSDK = /tmp/emsdk
