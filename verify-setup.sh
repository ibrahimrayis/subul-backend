#!/bin/bash

# Verification script for Subul Backend setup

echo "=========================================="
echo "Subul Backend Setup Verification"
echo "=========================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo -n "Checking Node.js installation... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Found: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found"
fi

# Check npm
echo -n "Checking npm installation... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} Found: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found"
fi

# Check TypeScript
echo -n "Checking TypeScript installation... "
if [ -f "node_modules/.bin/tsc" ]; then
    echo -e "${GREEN}✓${NC} TypeScript installed locally"
else
    echo -e "${RED}✗${NC} TypeScript not installed"
fi

# Check project structure
echo ""
echo "Checking project structure:"

directories=(
    "src"
    "src/config"
    "src/middleware"
    "src/modules"
    "src/modules/user"
    "src/modules/merchant"
    "src/modules/product"
    "src/modules/inventory"
    "src/modules/order"
    "src/modules/delivery"
    "src/modules/payment"
    "src/modules/notification"
    "src/utils"
)

for dir in "${directories[@]}"; do
    echo -n "  $dir ... "
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${RED}✗${NC}"
    fi
done

# Check key files
echo ""
echo "Checking key files:"

files=(
    "package.json"
    "tsconfig.json"
    ".env.example"
    ".gitignore"
    "Dockerfile"
    "docker-compose.yml"
    "README.md"
    "src/index.ts"
    "src/app.ts"
    "src/config/database.ts"
    "src/middleware/auth.ts"
)

for file in "${files[@]}"; do
    echo -n "  $file ... "
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${RED}✗${NC}"
    fi
done

# Try to build
echo ""
echo "Attempting TypeScript build:"
if npm run build &> /dev/null; then
    echo -e "${GREEN}✓${NC} Build successful"
else
    echo -e "${RED}✗${NC} Build failed"
fi

# Check if .env exists
echo ""
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
else
    echo -e "${YELLOW}⚠${NC}  .env file not found. Copy .env.example to .env and configure it."
fi

# Docker check
echo ""
echo -n "Checking Docker installation... "
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker -v | cut -d ' ' -f3 | cut -d ',' -f1)
    echo -e "${GREEN}✓${NC} Found: Docker $DOCKER_VERSION"
else
    echo -e "${YELLOW}⚠${NC}  Docker not found (optional)"
fi

echo ""
echo "=========================================="
echo "Verification complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Configure .env file with your database credentials"
echo "2. Start databases (PostgreSQL and MongoDB)"
echo "3. Run: npm run dev"
echo ""
echo "Or use Docker:"
echo "  docker-compose up -d"
echo ""
