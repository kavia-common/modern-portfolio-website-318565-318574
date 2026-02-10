#!/bin/bash
cd /home/kavia/workspace/code-generation/modern-portfolio-website-318565-318574/portfolio_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

