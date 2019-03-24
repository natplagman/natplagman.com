#!/bin/bash
rm -rf ../dist
hugo server -w -s ./hugo -d ../dist --config ./hugo/local.toml