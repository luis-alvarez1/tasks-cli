import path from "path";
import { TaskCommand, TaskStatus } from "../interfaces";
import { TaskManager } from "../models/TaskManager";
import chalk from "chalk";

const filePath = path.join(__dirname, "../data/tasks.json");

const taskManager = new TaskManager(filePath);

export const matchCommand = {
    [TaskCommand.add]: (args: string[]) => {
        taskManager.create(args.join(" "));
    },
    [TaskCommand.list]: (args: string[]) => {
        let command: string = args.join("");

        let status: boolean | null = null;
        if (!command) {
            //status doesn't exists
            status = null;
        } else {
            //status exists
            if (command === TaskStatus.completed) {
                // status is completed
                status = true;
            } else if (command === TaskStatus.pending) {
                // status is pending
                status = false;
            } else {
                // status is not known
                console.log(chalk.redBright("Unknown command"));
            }
        }

        taskManager.listTasks(status);
    },
    [TaskCommand.delete]: (args: string[]) => {
        const id = parseInt(args.join(""));
        if (!isNaN(id)) {
            taskManager.delete(id);
        } else {
            console.log(chalk.redBright("Unknown id"));
        }
    },
    [TaskCommand.update]: (args: string[]) => {}, // TODO:
    [TaskCommand.markCompleted]: (args: string[]) => {
        const id = parseInt(args.join(""));
        if (!isNaN(id)) {
            taskManager.setStatus(id, true);
        } else {
            console.log(chalk.redBright("Unknown id"));
        }
    },
    [TaskCommand.markPending]: (args: string[]) => {
        const id = parseInt(args.join(""));
        if (!isNaN(id)) {
            taskManager.setStatus(id, false);
        } else {
            console.log(chalk.redBright("Unknown id"));
        }
    },
};
