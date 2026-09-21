#!/data/data/com.termux/files/usr/bin/bash
pkill -f "node server/app.js" 2>/dev/null || true
echo "NEURON ALPHA-6 STOPPED"
