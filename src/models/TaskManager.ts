import fs from "fs";
import chalk from "chalk";
import { iTask } from "../interfaces/Task";
import { TaskStatus } from "../interfaces/TaskStatus";

export class TaskManager {
    private tasks: iTask[];

    constructor(private filePath: string) {
        // creates the file if doesn't exists
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify([]));
        }
        this.tasks = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }

    saveTasks() {
        // saves the current state of the tasks array
        fs.writeFileSync(this.filePath, JSON.stringify(this.tasks, null, 2));
    }

    create(description: string) {
        //creates a task with defaul information
        const task: iTask = {
            id: this.tasks.length + 1,
            description: description,
            status: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        this.tasks.push(task);

        this.saveTasks();

        console.log(chalk.yellowBright(`New Task with id ${task.id} created`));
    }

    listTasks(status: boolean | null = null) {
        let filteredTasks = this.tasks;

        // if no status is passed, prints all tasks
        if (status !== null) {
            filteredTasks.map((task) => task.status === status);
        }

        console.log(chalk.yellowBright("TASKS:"));

        filteredTasks.map((task) => {
            console.log(
                chalk.blueBright(
                    `${task.id} - ${task.description} - ${
                        task.status ? TaskStatus.completed : TaskStatus.pending
                    } - ${task.createdAt} - ${task.updatedAt}`
                )
            );
        });
    }

    setStatus(id: number, status: boolean) {
        const task = this.tasks.find((task) => task.id === id);

        if (task) {
            task.status = status;
            task.updatedAt = new Date().toISOString();

            this.saveTasks();

            console.log(
                chalk.yellowBright(
                    `Task with id: ${id} marked as ${
                        status ? TaskStatus.completed : TaskStatus.pending
                    }`
                )
            );
        } else {
            console.log(chalk.redBright(`Task with id: ${id} not found `));
        }
    }

    delete(id: number) {
        const index = this.tasks.findIndex((task) => task.id === id);
        if (index > -1) {
            this.tasks.splice(index, 1);
            this.saveTasks();
            console.log(chalk.yellowBright(`Task with id: ${id} deleted`));
        } else {
            console.log(chalk.redBright(`Task with id: ${id} not found`));
        }
    }

    update(id: number, description: string) {
        // only updates the name
        const task = this.tasks.find((task) => task.id === id);

        if (task) {
            task.description = description;
            task.updatedAt = new Date().toISOString();

            this.saveTasks();

            console.log(chalk.yellowBright(`Task with id: ${id} updated`));
        } else {
            console.log(chalk.blueBright(`Task with id: ${id} not found`));
        }
    }
}
