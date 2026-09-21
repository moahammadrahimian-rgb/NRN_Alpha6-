#!/data/data/com.termux/files/usr/bin/bash

cd "$(dirname "$0")"

echo "========================================"
echo "       NEURON • ALPHA-6"
echo "       FINAL BUILD 100"
echo "========================================"

node server/database/migrate.js

echo ""
echo "SERVER:"
echo "http://127.0.0.1:3000"
echo ""
echo "STOP:"
echo "CTRL+C"
echo "========================================"

npm start
