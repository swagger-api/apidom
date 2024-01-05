FROM node:20.3.0-bookworm

# use bash as default shell
SHELL ["/bin/bash", "-c"]

# install emscripten
WORKDIR /tmp
RUN git clone --depth 1 --branch 2.0.24 https://github.com/emscripten-core/emsdk.git
WORKDIR emsdk
RUN ./emsdk install 2.0.24
RUN ./emsdk activate 2.0.24
ENV PATH="/tmp/emsdk:/tmp/emsdk/upstream/emscripten:${PATH}"
ENV EMSDK="/tmp/emsdk"

# setting CWD
WORKDIR /apidom
