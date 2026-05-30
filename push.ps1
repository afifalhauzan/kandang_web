# push.ps1

Write-Host "[CLEAN] Cleaning up local ghosts..." -ForegroundColor Cyan
if (Test-Path "public/hot") { Remove-Item "public/hot" }

Write-Host "[BUILD] Building frontend assets..." -ForegroundColor Cyan
npm run build

Write-Host "[DOCKER] Building Docker images..." -ForegroundColor Cyan
# Build the PHP App
docker build --target app -t afifalhauzan123/umkm-website-app:latest .
# Build the Nginx Web
docker build --target web -t afifalhauzan123/umkm-website-web:latest .

Write-Host "[PUSH] Pushing to Docker Hub..." -ForegroundColor Cyan
docker push afifalhauzan123/umkm-website-app:latest
docker push afifalhauzan123/umkm-website-web:latest

Write-Host "SUCCESS: Done! Now run ./deploy.sh on your VPS." -ForegroundColor Green