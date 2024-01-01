#!/bin/sh

WORKDIR="$HOME/.config/ags"

function _ags() {
  pkill ags
  ags &
}

_ags
inotifywait --quiet --monitor --event create,modify,delete --recursive $WORKDIR | while read DIRECTORY EVENT FILE; do
  file_extension=${FILE##*.}
  case $file_extension in
    js)
	echo "reload JS..."
        _ags
    ;;
  scss)
	echo "reload SCSS..."
        _ags
    ;;
  esac
done
