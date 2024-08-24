# cohert3_node_asignment
## task 1

```
const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .name('counter')
  .description('CLI to do file based tasks')
  .version('0.8.0');

program.command('count')
  .description('Count the number of lines in a file')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const lines = data.split('\n').length;
        console.log(`There are ${lines} lines in ${file}`);
      }
    });
  });

program.parse();
```
In oder to run above code we need to give this command

```
node index.js count /Users/kirat/file.txt
```
As we have command count which we need to specify for the below error

<img width="1210" alt="Screenshot 2024-08-24 at 7 44 51 PM" src="https://github.com/user-attachments/assets/a06d69e3-b77a-4472-8215-2aa4f7a769fe">
