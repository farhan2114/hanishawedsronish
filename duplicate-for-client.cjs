const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const clientName = process.argv[2];

if (!clientName) {
  console.log('\\n❌ Error: Please provide a client project name.');
  console.log('👉 Example usage: node duplicate-for-client.js "rahul-weds-priya"\\n');
  process.exit(1);
}

// Sanitize folder name
const cleanName = clientName.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
const templateDir = __dirname;
const parentDir = path.dirname(templateDir);
const targetDir = path.join(parentDir, cleanName);

if (fs.existsSync(targetDir)) {
  console.log(`\\n❌ Error: Directory already exists at: ${targetDir}`);
  console.log('Please choose a different client name or delete the existing folder.\\n');
  process.exit(1);
}

console.log(`\\n🚀 Duplicating template into new client project: "${cleanName}"...`);

// Folders and files to ignore during copy
const ignoreList = new Set(['node_modules', 'dist', '.git', '.DS_Store', 'duplicate-for-client.js']);

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    if (ignoreList.has(entry.name)) continue;

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 1. Copy project
copyDir(templateDir, targetDir);

// 2. Update package.json with the new client project name
const pkgPath = path.join(targetDir, 'package.json');
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.name = cleanName;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
}

// 3. Initialize a fresh Git repository for the new client
try {
  execSync('git init && git add . && git commit -m "Initial commit for client wedding project"', {
    cwd: targetDir,
    stdio: 'ignore'
  });
} catch (_) {}

console.log(`\\n✅ SUCCESS! Client project created at:`);
console.log(`📁 ${targetDir}\\n`);
console.log(`Next steps to customize and deploy this client's wedding website:`);
console.log(`----------------------------------------------------------------`);
console.log(`1. Navigate to the new folder:`);
console.log(`   cd "${targetDir}"\\n`);
console.log(`2. Install dependencies:`);
console.log(`   npm install\\n`);
console.log(`3. Drop client pictures in:`);
console.log(`   ${path.join(targetDir, 'public', 'client-images')}\\n`);
console.log(`4. Edit names, dates & venue in:`);
console.log(`   ${path.join(targetDir, 'src', 'wedding.config.ts')}\\n`);
console.log(`5. Preview in browser:`);
console.log(`   npm run dev\\n`);
console.log(`6. Deploy to a new live Vercel link:`);
console.log(`   npx vercel --prod\\n`);
