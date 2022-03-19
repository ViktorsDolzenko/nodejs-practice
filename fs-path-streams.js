const rl = require('readline');
const fs = require('fs');
const path = require('path');

const input = rl.createInterface(process.stdin, process.stdout);

let data = {
    count: 0,
    wins: 0,
    loses: 0,
    winRate: 0
};

const pathFile = path.join(__dirname, 'results.json');

const quest = (q) => {
    return new Promise((resolve, reject) => {
        input.question(q, (ans) => {
            resolve(ans);
        })
    })
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const game = async () => {
    let result;
    const randomNumber = getRandomIntInclusive(1, 2);
    console.log("Загадано число 1 или 2");
        const ans = await quest('Введите число: ');
        if (Number(ans) === randomNumber) {
            console.log("Вы угадали!");
            input.close();
            result = true;
        } else {
            console.log('Вы не угадали!')
            input.close();
            result = false;
        }
        processFile(result);
}

function writeFile(data) {
    const writeStream = fs.createWriteStream(pathFile);
    writeStream.write(JSON.stringify(data));
    writeStream.on('error', err => {
        console.log('Error:', err);
    });
    writeStream.end();
}

function readFile() {
    return fs.readFileSync(pathFile, "utf-8")
}

function updateFile(file, result) {
    if(file) {
       file.count += 1;

       if(result) {
           file.wins += 1;
       } else {
           file.loses += 1;
       }
        if(file.winRate !== 0) {
            file.winRate = `${Math.round(file.wins / file.count  * 100)}%`;
        } else if (result) {
            file.winRate = '100%';
        } else {
            file.winRate = '0%';
        }
    }
    return file
}

function processFile(result) {
    fs.stat(pathFile, (err, stat) => {
        if(err == null) {
            let contentFile = JSON.parse(readFile())
            contentFile = updateFile(contentFile, result)
            writeFile(contentFile);
        } else if(err.code === 'ENOENT') {
            console.log('err')
            let contentFile = updateFile(data, result);
            writeFile(contentFile);
        }
    })
}

game();
