@echo off
rem test script. launches a python web server on port 5000
echo building in dev mode
cmd /c npm run dev
echo starting on http://localhost:5000
cd dist
python3 -m http.server 5000