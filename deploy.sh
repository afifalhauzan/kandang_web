#!/bin/bash

# Configuration
COMPOSE_FILE="docker-compose.vps.yml"
CONTAINER_APP="umkm-website-app-1"

echo "🚀 Starting deployment..."

# 1. Pull latest images
echo "📥 Pulling latest images from Docker Hub..."
docker compose -f $COMPOSE_FILE pull

# 2. Restart services
echo "🔄 Recreating containers..."
docker compose -f $COMPOSE_FILE up -d --force-recreate

# 3. Wait for DB to be ready (optional but safer)
echo "⏳ Waiting for containers to stabilize..."
sleep 5

# 4. Remove Vite 'hot' file if it accidentally sneaked in
echo "🔥 Removing ghost hot-reload files..."
docker compose -f $COMPOSE_FILE exec app rm -f public/hot

# 5. Run Database Migrations
echo "📦 Running migrations..."
docker compose -f $COMPOSE_FILE exec app php artisan migrate --force

# 6. Clear and Rebuild Caches
echo "🧹 Clearing Laravel caches..."
docker compose -f $COMPOSE_FILE exec app php artisan optimize:clear

# 7. Final Permission Fixes
echo "🔒 Resetting folder permissions..."
docker compose -f $COMPOSE_FILE exec app chown -R www-data:www-data storage bootstrap/cache

echo "✅ Deployment successful! Check the site at your domain."
echo "📊 To view logs: docker compose -f $COMPOSE_FILE logs -f"