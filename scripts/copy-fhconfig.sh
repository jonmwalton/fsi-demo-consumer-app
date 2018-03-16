#!/bin/bash
set -o errexit # Exit on error

SOURCE=""
TARGET="./www/fhconfig.json"

function removeFile {
  rm -f $TARGET
}

function filterEnv {
  if [[ -z "$1" ]]; then
    echo "No target envirnoment specified";
	  exit;
  fi

  if [[ "$1" = "local" ]]; then
    SOURCE="./env/local-fhconfig.json"
  fi

  if [[ "$1" = "dev" ]]; then
    SOURCE="./env/dev-fhconfig.json"
  fi

  if [[ "$1" = "test" ]]; then
    SOURCE="./env/test-fhconfig.json"
  fi
}

function copyFile {
  cp $SOURCE $TARGET
}

removeFile
filterEnv $1
copyFile
