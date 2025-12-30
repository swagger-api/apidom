FROM node:24.12.0-bookworm

# use bash as default shell
SHELL ["/bin/bash", "-c"]

# install emscripten
WORKDIR /tmp
RUN git clone --depth 1 --branch 3.1.64 https://github.com/emscripten-core/emsdk.git
WORKDIR emsdk
RUN ./emsdk install 3.1.64
RUN ./emsdk activate 3.1.64
ENV PATH="/tmp/emsdk:/tmp/emsdk/upstream/emscripten:${PATH}"
ENV EMSDK="/tmp/emsdk"

# setting CWD
WORKDIR /apidom
