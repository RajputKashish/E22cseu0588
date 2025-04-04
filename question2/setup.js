const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// ANSI color codes for prettier console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m'
};

console.log(`${colors.cyan}${colors.bright}=== Social Media Analytics Microservice Setup ===${colors.reset}\n`);

// Install server dependencies
try {
  console.log(`${colors.yellow}Installing server dependencies...${colors.reset}`);
  execSync('cd server && npm install', { stdio: 'inherit' });
  console.log(`${colors.green}✓ Server dependencies installed${colors.reset}\n`);
} catch (error) {
  console.error('Failed to install server dependencies:', error);
  process.exit(1);
}

// Install client dependencies
try {
  console.log(`${colors.yellow}Installing client dependencies...${colors.reset}`);
  execSync('cd client && npm install', { stdio: 'inherit' });
  console.log(`${colors.green}✓ Client dependencies installed${colors.reset}\n`);
} catch (error) {
  console.error('Failed to install client dependencies:', error);
  process.exit(1);
}

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, 'server', '.env');
if (!fs.existsSync(envPath)) {
  console.log(`${colors.yellow}Creating server .env file...${colors.reset}`);
  fs.writeFileSync(
    envPath,
    'PORT=5000\nAPI_BASE_URL=http://20.244.56.144/evaluation-service'
  );
  console.log(`${colors.green}✓ Created .env file${colors.reset}\n`);
}

console.log(`${colors.green}${colors.bright}Setup complete!${colors.reset}`);
console.log(`\nTo start the application:`);
console.log(`${colors.cyan}1. Start the server:${colors.reset} cd server && npm run dev`);
console.log(`${colors.cyan}2. Start the client:${colors.reset} cd client && npm start`);
console.log(`\n${colors.cyan}3. Open your browser to:${colors.reset} http://localhost:3000\n`); 