#!/usr/bin/env node

import chalk from "chalk";
import { matchCommand } from "./actions/matchCommand";
import { TaskCommand } from "./interfaces";

const [, , command, ...args] = process.argv;

// matchCommand["delete"](["asdasd"]);
// matchCommand["list"]([]);
// if (command in matchCommand) {
//     // matchCommand[command as TaskCommand](args);
// } else {
//     console.log(chalk.redBright("Unknown command index"));
// }
