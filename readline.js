const rl = require('readline');

const input = rl.createInterface(process.stdin, process.stdout);


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
    const randomNumber = getRandomIntInclusive(1, 10);
    console.log("Загадано число в диапазоне от 0 до 10");
    while(true) {
        const ans = await quest('Введите число: ');
        if(ans > randomNumber) {
            console.log("Меньше")
        }
        else if(ans < randomNumber) {
            console.log("Больше")
        }
        else {
            console.log('Отгадано число: ', ans)
            input.close();
            break;
        }
    }
}

game();
