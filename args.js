const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const command = yargs(hideBin(process.argv)).argv;
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const incDec = (arg) => {
   return command.add ? arg + command.add : command.sub ? arg - command.sub : arg;
}

 if (command._[0] === 'current' && command.year) {
     const date = incDec(new Date().getFullYear());
     console.log(date);
}
 else if (command._[0] === 'current' && command.month) {
     const date = incDec(new Date().getMonth());
     console.log(month[date]);
 }
 else if (command._[0] === 'current' && command.date) {
     const date = incDec(new Date().getDay() - 1 );
     console.log(date);
 }
 else if (command._[0] === 'current') {
    console.log(new Date().toDateString())
}
