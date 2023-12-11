const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

const csvFilePath = path.join(__dirname, './csvdirectory/example-data.csv');
const txtFilePath = path.join(__dirname, './csvdirectory/example-data-output.txt');

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(txtFilePath);

readStream.on('error', err => console.error('error reading the csv', err));
writeStream.on('error', err => console.error('error writing the txt', err));

csv().fromStream(readStream).subscribe((jsonObj) => {
  return new Promise((resolve, reject) => {
    writeStream.write(JSON.stringify(jsonObj) + '\n', 'utf8', (err) => {
      if (err) {
          reject(err);
      } else {
          resolve();
      }
  });
  }, (err) => {
    console.error('Error during CSV to JSON conversion:', err);
  })
})

// pd: Eliminar el example-data-output.txt antes de ejecutar el script