// const validator = require("validator");
// console.log(validator.isEmail("arifnauval1530@gmail.com"));
// console.log(validator.isMobilePhone("08221911477", "id-ID"));
// console.log(validator.isNumeric("bsdjvkbjhksbgkjb"));

const chalk = require("chalk");

// console.log(chalk.yellowBright("Hello world!"));
const pesan = chalk`lorem, ipsum dolor {bgRed.white sit Ame} Lorem ipsum dolor sit amet {bgBlue.italic consectetur} adipisicing elit. In, porro.`;
console.log(pesan);
