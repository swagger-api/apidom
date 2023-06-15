FROM node:20.3.0-bookworm

# use bash as default shell
SHELL ["/bin/bash", "-c"]

# install emscripten
WORKDIR /tmp
RUN git clone https://github.com/emscripten-core/emsdk.git
WORKDIR emsdk
RUN ./emsdk install latest
RUN ./emsdk activate latest
ENV PATH="/tmp/emsdk:/tmp/emsdk/upstream/emscripten:${PATH}"
ENV EMSDK = /tmp/emsdk

# setting CWD
WORKDIR /apidom

