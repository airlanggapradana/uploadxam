const { spawn, execSync } = require('child_process');
const path = require('path');
const readline = require('readline');

const isWin = process.platform === 'win32';
const npmCmd = isWin ? 'npm.cmd' : 'npm';

const rootDir = __dirname;
const serverDir = path.join(rootDir, 'server');
const clientDir = path.join(rootDir, 'client');

// Kode warna ANSI untuk output terminal yang jelas
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  server: '\x1b[36m', // Cyan untuk Backend
  client: '\x1b[35m', // Magenta untuk Frontend
  system: '\x1b[33m', // Kuning untuk info sistem
  error: '\x1b[31m',  // Merah untuk error
  success: '\x1b[32m' // Hijau untuk sukses
};

console.log(`${colors.bright}======================================================${colors.reset}`);
console.log(`${colors.bright}  🚀 UploadXam - Fullstack Development Server         ${colors.reset}`);
console.log(`${colors.dim}  • Backend : Express + Nodemon (Port 5000)          ${colors.reset}`);
console.log(`${colors.dim}  • Frontend: Next.js Turbo     (Port 3000)          ${colors.reset}`);
console.log(`${colors.system}  Tekan Ctrl + C untuk menghentikan kedua server.     ${colors.reset}`);
console.log(`${colors.bright}======================================================\n${colors.reset}`);

function pipeOutput(stream, prefix, color) {
  if (!stream) return;
  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
  });

  rl.on('line', (line) => {
    if (line.trim().length === 0) return;
    console.log(`${color}${colors.bright}[${prefix}]${colors.reset} ${line}`);
  });
}

let activeProcesses = 0;

function runService(name, cwd, color) {
  activeProcesses++;

  const command = isWin ? `${npmCmd} run dev` : npmCmd;
  const args = isWin ? [] : ['run', 'dev'];

  const child = spawn(command, args, {
    cwd,
    shell: isWin,
    env: {
      ...process.env,
      FORCE_COLOR: '1'
    },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  pipeOutput(child.stdout, name, color);
  pipeOutput(child.stderr, name, color);

  child.on('error', (err) => {
    console.error(`${colors.error}[${name} ERROR] Gagal menjalankan proses: ${err.message}${colors.reset}`);
  });

  child.on('close', (code, signal) => {
    activeProcesses--;
    if (code !== 0 && code !== null) {
      console.log(`${colors.error}[${name}] Berhenti dengan status code ${code}${colors.reset}`);
    } else if (signal) {
      console.log(`${colors.dim}[${name}] Menerima sinyal ${signal}${colors.reset}`);
    } else {
      console.log(`${colors.dim}[${name}] Berhenti.${colors.reset}`);
    }

    if (!isShuttingDown && activeProcesses <= 0) {
      console.log(`${colors.system}[SYSTEM] Semua service telah selesai/berhenti.${colors.reset}`);
      process.exit(code || 0);
    }
  });

  return child;
}

const serverProc = runService('SERVER', serverDir, colors.server);
const clientProc = runService('CLIENT', clientDir, colors.client);

let isShuttingDown = false;

function shutdown() {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log(`\n${colors.system}[SYSTEM] Menghentikan Frontend dan Backend...${colors.reset}`);

  function killTree(proc) {
    if (!proc || !proc.pid) return;

    if (isWin) {
      try {
        execSync(`taskkill /pid ${proc.pid} /T /F`, { stdio: 'ignore' });
        return;
      } catch (_) {
        // Fallback jika taskkill tidak diizinkan atau proses sudah mati
      }
    }

    try {
      proc.kill('SIGTERM');
    } catch (_) {}
  }

  killTree(serverProc);
  killTree(clientProc);

  console.log(`${colors.success}[SYSTEM] Server berhasil dihentikan.${colors.reset}\n`);
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('SIGHUP', shutdown);
