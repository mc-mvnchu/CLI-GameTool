#!/usr/bin/env node !Shebang #!
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

// colored text
console.log(chalk.bgGreen('hi dad'));

// Animation text
let playerName;

// Helper time Called sleeper
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Who wants to be a JavaScript Millionaire?'
    );

    await sleep();
    rainbowTitle.stop();

    // Javascript `template literal`
    // Backticks `` allows to input multiple logs int o the command line including line-break characters
    console.log(`
        ${chalk.bgBlue('HOW TO PLAY')}
        I am a process on your computer.
        If you get any questions wrong I will be ${chalk.bgRed('killed')}
        So get all the questions right...

    `);
}

// Top level `await`
// await welcome()

// Inquirer user input
// askName await func
async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        },
    });

    playerName = answers.player_name;

}

// Top level `await`
// await askName();

// Inquirer for asking Questions
// await question1
async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'JavaScript was created in 10 days then released on\n',
        // Multiple Choices to choose from
        choices: [
            'May 23rd, 1995',
            'Nov 24h, 1995',
            'Dec 4th, 1995',
            'Dec 17, 1996',
        ],
    });

    // handleAnswer function takes a boolean as an argument
    return handleAnswer(answers.question_1 == 'Dec 4th, 1995');
}


// nanospinner
async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking Answer...');

    await sleep();

    if (isCorrect) {
        spinner.success({ text: `👍👍👍 Nice work ${playerName}. That's a legit answer` });
    } else {
        spinner.error({ text: `💀💀💀 Game Over, you lose $(playerName)!` });
        // 0 === success || 1 == errors
        process.exit(1);
    }
}

// winner function
// Print out Message using figlet && gradient with pastel
function winner() {
    console.clear();
    const msg = `Congrats, ${playerName} !\n $ 1  , 0 0 0 , 0 0 0`;

    //  paste multiline error from the console.log
    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}

await welcome();
await askName();
await question1();
// await question2();
// await question3();
// await question4();
// await question5();
winner();