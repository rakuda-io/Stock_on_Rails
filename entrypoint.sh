#!/bin/bash
set -e
rm -f /haito-kun/tmp/pids/server.pid #アプリディレクトリを指定
exec "$@"