const http = require('http');
const rl = require('readline');
const input = rl.createInterface(process.stdin, process.stdout);
const config = require('./config');

const API_KEY = config.API_KEY
const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=`

const question = (q) => {
    return new Promise((resolve, reject) => {
        input.question(q, (ans) => {
            resolve(ans);
        })
    })
}

const getWeather = async () => {
    while(true) {
        const ans = await question('enter city: ');
        if(ans === 'quit') {
            console.log('connection closed')
            input.close();
            break;
        }
        const preparedUrl = url + ans;
        httpGet(preparedUrl)
    }
}

const httpGet = (url) => {
    const request = http.get(url, (response) => {
        const statusCode = response.statusCode

        if (statusCode !== 200) {
            console.error(`Status Code: ${statusCode}`)
            return
        }

        response.setEncoding('utf8')

        let rawData = ''
        response.on('data', (chunk) => rawData += chunk)
        response.on('end', () => {
            let parsedData = JSON.parse(rawData)
            console.log(parsedData)
            console.log('press arrow up for new request')
            console.log('type quit to close program')
        })
    })

    request.on('error', (e) => {
        console.error(`Got error: ${e.message}`)
    })
}


getWeather();
