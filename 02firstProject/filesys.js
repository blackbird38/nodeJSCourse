const fs = require('fs');


const data = 'some data';

// creates a new file
fs.writeFile('newFile.txt', data, (err) => {
    if (err) throw err;
    console.log(data.toString('utf8'));
});

// reads a file and logs to the console its content
fs.readFile('filesys.html', (err, data) => {
    if (err) throw err;
    console.log(data.toString('utf8'));
});

// deletes the first created file
fs.unlink('newFile.txt', (err) => {
    if (err) throw err;
    console.log('file deleted');
})