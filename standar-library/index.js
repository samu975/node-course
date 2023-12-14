const childProcess = require('child_process');
const fs = require('fs');

function getProcess() {
  let command;

  // Se puede hacer tambien con os, os.platform()
  if (process.platform === 'win32') {
    command = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;
  } else {
    command = 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
  }

  const output = childProcess.execSync(command, { encoding: 'utf8' });
  return output;
}

function formatOutput(processInfo) {
  // get the timestamp
  const unixTime = Math.floor(new Date().getTime() / 1000);

  // format the output
  return `${unixTime} : ${processInfo}`;
}

function createLogFileOrUpdate(logEntry) {
  const logFileName = 'activityMonitor.log';

  // Si no existe el archivo, lo crea
  if (!fs.existsSync(logFileName)) {
    fs.writeFileSync(logFileName, logEntry);
  }

  fs.appendFileSync(logFileName, logEntry);
}

function monitoring() {
  setInterval(() => {
    const processInfo = getProcess();
    // Escribe en la consola el proceso que mas consume, se hae en una sola linea
    console.clear();
    process.stdout.write('\r' + processInfo);

    // Si es el segundo 0, crea el archivo o lo actualiza. Esto sucede cada minuto
    const seconds = new Date().getSeconds();
    if (seconds === 0) {
      const logEntry = formatOutput(processInfo);
      createLogFileOrUpdate(logEntry);
    }
  }, 100);
}

monitoring();
