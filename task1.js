const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .name('word-counter')
  .description('CLI to count the number of words in a file')
  .version('1.0.0');

program
  .argument('<file>', 'file path to count words in')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err.message}`);
        process.exit(1); 
      } else {
        const words = data.split(/\s+/).filter(Boolean);
        console.log(`You have ${words.length} words in ${file}.`);
      }
    });
  });

program.parse();
