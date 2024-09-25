import chalk from "chalk";
import { TaskCommand } from "../../interfaces";
import { iTask } from "../../interfaces";
import { matchCommand } from "../../actions/matchCommand";
import { debug, log } from "console";

let mockFileContent: iTask[] = [];

const mockDate = new Date("2024-09-25T15:38:20.448Z");

jest.mock("fs", () => ({
    existsSync: jest.fn((filePath) => true),
    readFileSync: jest.fn((filePath, encoding) => {
        console.log(mockFileContent);
        return JSON.stringify(mockFileContent || []);
    }),
    writeFileSync: jest.fn((filePath, data) => {
        mockFileContent = JSON.parse(data) as iTask[];
        log("DATA", { data });
    }),
    mkdirSync: jest.fn(),
}));

jest.useFakeTimers().setSystemTime(mockDate);

describe("matchCommand", () => {
    beforeEach(() => {
        mockFileContent = [];
    });

    it("should add a new task", () => {
        console.log = jest.fn();

        matchCommand[TaskCommand.add](["Task 1"]);

        expect(console.log).toHaveBeenCalledWith(
            chalk.yellowBright("New Task with id 1 created")
        );

        expect(mockFileContent.length).toBe(1);
        expect(mockFileContent[0].description).toBe("Task 1");
        expect(mockFileContent[0].id).toBe(1);
    });

    it("should list tasks", () => {
        console.log = jest.fn();

        mockFileContent = [
            {
                id: 1,
                description: "Task 1",
                status: false,
                createdAt: mockDate.toISOString(),
                updatedAt: mockDate.toISOString(),
            },
            {
                id: 2,
                description: "Task 2",
                status: true,
                createdAt: mockDate.toISOString(),
                updatedAt: mockDate.toISOString(),
            },
        ];

        matchCommand[TaskCommand.list]([]);

        expect(console.log).toHaveBeenCalledWith(chalk.yellowBright("TASKS:"));
        expect(console.log).toHaveBeenCalledWith(
            chalk.blueBright(
                `1 - Task 1 - pending - ${mockDate.toISOString()} - ${mockDate.toISOString()}`
            )
        );
    });

    it("should delete a task", () => {
        console.log = jest.fn();

        mockFileContent = [
            {
                id: 1,
                description: "Task 1",
                status: false,
                createdAt: mockDate.toISOString(),
                updatedAt: mockDate.toISOString(),
            },
        ];

        matchCommand[TaskCommand.delete](["1"]);

        expect(mockFileContent.length).toBe(0);

        expect(console.log).toHaveBeenCalledWith(
            chalk.yellowBright("Task with id: 1 deleted")
        );
    });

    it("should update a task", () => {
        console.log = jest.fn();

        mockFileContent = [
            {
                id: 1,
                description: "Old Task",
                status: false,
                createdAt: mockDate.toISOString(),
                updatedAt: mockDate.toISOString(),
            },
        ];

        matchCommand[TaskCommand.update](["1", "Updated Task"]);

        expect(mockFileContent[0].description).toBe("Updated Task");

        expect(console.log).toHaveBeenCalledWith(
            chalk.yellowBright(`Task with id: 1 updated`)
        );
    });

    it("should mark a task as completed", () => {
        console.log = jest.fn();

        mockFileContent = [
            {
                id: 1,
                description: "Task 1",
                status: false,
                createdAt: mockDate.toISOString(),
                updatedAt: mockDate.toISOString(),
            },
        ];

        matchCommand[TaskCommand.markCompleted](["1"]);

        expect(mockFileContent[0].status).toBe(true);

        expect(console.log).toHaveBeenCalledWith(
            chalk.yellowBright("Task with id: 1 marked as completed")
        );
    });
});
