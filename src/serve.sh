#!/bin/bash
# -D  Include drafts
# -w  watch
rm -rf ../dist
hugo server -wD -s ./hugo -d ../dist