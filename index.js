const chalk = require('chalk');
const config = require('./config');
const crypto = require('crypto');

const readLineSync = require('readline-sync');
const validate = ['1','2','3','4','5','6','7'];
const uriComponent = function(option){
  const uri = readLineSync.question('\nPlease enter uri:\n');
  if(option == '1'){
    console.log(encodeURIComponent(uri));
  }else{
    console.log(decodeURIComponent(uri));
  }
}
const base64UriComponent = function(option){
  const uri = readLineSync.question('\nPlease enter uri:\n');
  if(option == '1'){
    console.log(btoa(uri));
  }else{
    console.log(atoa(uri));
  }
}
const epochHumanDate = function(option){
  if(option == '1'){
    const epochTime = readLineSync.question('\nPlease enter epoch time, ex - 1611041456000:\n');
    console.log(new Date(epochTime*1000).toUTCString());
  }else{
    const year = readLineSync.question("Please enter the year : \n");
    const month = readLineSync.question("Please enter the month : \n");
    const date = readLineSync.question("Please enter the date : \n");
    const hour = readLineSync.question("Please enter the hour : \n");
    const min = readLineSync.question("Please enter the minute : \n");
    const sec = readLineSync.question("Please enter the seconds \n: ");
    const humanDate = new Date(Date.UTC(year,month,date,hour,min,sec));
    console.log(Math.floor(humanDate/1000.0));
  }
}
const hashing = function(option){
  const uri = readLineSync.question('\nPlease enter the string:\n');
  if(option == '1'){
    console.log(crypto.createHash("md5").update(uri).digest('hex'));
  }else if(option == '2'){
    console.log(crypto.createHash("sha1").update(uri).digest('hex'));
  }else if(option == '3'){
    console.log(crypto.createHash("sha256").update(uri).digest('hex'));
  }else{
    console.log(crypto.createHash("sha512").update(uri).digest('hex'));
  }
}
const hex = function (rgb) { 
  let hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};
function rgb(h) {
  let r = 0, g = 0, b = 0;

  // 3 digits
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

  // 6 digits
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }
  
  return "rgb("+ +r + "," + +g + "," + +b + ")";
}
const rgbHex = function(option){
  if(option == '1'){
    const red = readLineSync.question('\nEnter the red value:\n');
    const green = readLineSync.question('\nEnter the green value:\n');
    const blue = readLineSync.question('\nEnter the blue value:\n');
    const rgbToHex = (r, g, b) => '#' + 
    hex(r) + hex(g) + hex(b);
    
    console.log(rgbToHex(red, green, blue));
  }else{
    const rgbValue = readLineSync.question('\nEnter rgb value:\n');
    console.log(rgb(rgbValue));
  }
}
const utilityContinue = function(){
  let index = 1;
  console.log('\n');
  config.userOptions.forEach(
    (option) => console.log(`${index++}. `+option)
  );
  let selectedOption = readLineSync.question('\nEnter the utility which you want to use from the above mentioned list:\n');
  if(validate.includes(selectedOption)){
    utilityApptoRun(selectedOption);
  }else{
    selectedOption = readLineSync.question('Enter a valid option 1 - 7:\n');
    utilityApptoRun(selectedOption);
  }
}
const utilityApptoRun = function(selectedOption){
  let flag = true;
  let option = '';
  let decision = '';
  do{
    switch(selectedOption){
    case '1' :
      option = readLineSync.question('\nSelect 1 for Encoding or 2 for Decoding\n');
      uriComponent(option);
      decision = readLineSync.question('\nEnter 1 to continue, 2 to go to the main menu, 3 to exit\n');
      if(decision == '1'){
        continue;
      }
      else if(decision == '2'){
        utilityContinue();
      }
      else{
        flag = false;
        break;
      }
    case '2':
      option = readLineSync.question('\nSelect 1 for base64 Encoding or 2 for base64 Decoding\n');
      base64UriComponent(option);
      decision = readLineSync.question('\nEnter 1 to continue, 2 to go to the main menu, 3 to exit\n');
      if(decision == '1'){
        continue;
      }
      else if(decision == '2'){
        utilityContinue();
      }
      else{
        flag = false;
        break;
      }
    case '3':
      option = readLineSync.question('\nSelect 1 for md5 Hashing, or 2 for sha-1, or 3 for sha-256, or 4 for sha-512\n');
      hashing(option);
      decision = readLineSync.question('\nEnter 1 to continue, 2 to go to the main menu, 3 to exit\n');
      if(decision == '1'){
        continue;
      }
      else if(decision == '2'){
        utilityContinue();
      }
      else{
        flag = false;
        break;
      }
    case '4':
      option = readLineSync.question('\nselect 1 for humanDate, or 2 for epoch Time\n');
      epochHumanDate(option);
      decision = readLineSync.question('\nEnter 1 to continue, 2 to go to the main menu, 3 to exit\n');
      if(decision == '1'){
        continue;
      }
      else if(decision == '2'){
        utilityContinue();
      }
      else{
        flag = false;
        break;
      }
    case '6':
      option = readLineSync.question('\nselect 1 for RGB => Hex, or 2 for Hex => RGB Time\n');
      rgbHex(option);
      decision = readLineSync.question('\nEnter 1 to continue, 2 to go to the main menu, 3 to exit\n');
      if(decision == '1'){
        continue;
      }
      else if(decision == '2'){
        utilityContinue();
      }
      else{
        flag = false;
        break;
      }
  }
  }while(flag)
  
}
const utility = function(){
  let index = 1;
  console.log(chalk.bgGreen.bold(`\t\t\t----------Welcome to the utility App--------\n\n`));
  console.log(config.userGreetingMessage);
  config.userOptions.forEach(
    (option) => console.log(`${index++}. `+option)
  );
  let selectedOption = readLineSync.question('\nEnter the utility which you want to use from the above mentioned list:\n');
  if(validate.includes(selectedOption)){
    utilityApptoRun(selectedOption);
  }else{
    selectedOption = readLineSync.question('Enter a valid option 1 - 7:\n');
    utilityApptoRun(selectedOption);
  }
}
utility();
