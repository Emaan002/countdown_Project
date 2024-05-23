#! /usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
const res = await inquirer.prompt({
    name: "userInput",
    type: "number",
    message: "Please enter the amount of seconds",
    validate: (input) => {
        if (isNaN(input)) {
            return "Please enter a valid number";
        }
        else if (input > 60) {
            return "Seconds must not exceed 60";
        }
        else {
            return true;
        }
    },
});
let input = res.userInput;
function startTime(val) {
    const iniTime = new Date().setSeconds(new Date().getSeconds() + val);
    const interval = setInterval(() => {
        const currTime = new Date();
        const timeDiff = differenceInSeconds(iniTime, currTime);
        if (timeDiff <= 0) {
            console.log("Timer has expired");
            clearInterval(interval);
            process.exit();
        }
        const min = Math.floor(timeDiff / 60);
        const sec = timeDiff % 60;
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }, 1000);
}
startTime(input);
