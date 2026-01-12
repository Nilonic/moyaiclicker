# test script. launches a python web server on port 5000
echo "Building in dev mode"
npm run dev
echo "starting on http://0.0.0.0:5000"
cd dist
python3 -m http.server 5000