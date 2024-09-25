import chalk from "chalk";
import { TaskCommand } from "../../interfaces";
import { iTask } from "../../interfaces"; // Ensure the iTask interface is imported correctly
import { TaskManager } from "../../models/TaskManager";
import { matchCommand } from "../../actions/matchCommand";

// Initialize a mock array to simulate the JSON file content
let mockFileContent: iTask[] = [];

// Mock fs functions to simulate reading/writing to a file
// Mock fs functions to simulate reading/writing to a file
jest.mock("fs", () => ({
    existsSync: jest.fn((filePath) => true), // Assume the folder and file always exist
    readFileSync: jest.fn((filePath, encoding) => {
        // Return the mockFileContent as a JSON string
        return JSON.stringify(mockFileContent);
    }),
    writeFileSync: jest.fn((filePath, data) => {
        // Update the mockFileContent array with new data
        mockFileContent = JSON.parse(data) as iTask[];
    }),
    mkdirSync: jest.fn(), // Mock directory creation without actual changes
}));
describe("matchCommand", () => {
    let taskManager: TaskManager;

    beforeEach(() => {
        // Reset mock content to an empty array before each test case
        mockFileContent = [];
    });

    it("should add a new task", () => {
        console.log = jest.fn(); // Mock console.log to prevent actual logging

        // Call the command to add a task
        matchCommand[TaskCommand.add](["Task 1"]);

        // Verify that the task creation log is called correctly
        expect(console.log).toHaveBeenCalledWith(
            chalk.yellowBright("New Task with id 1 created")
        );

        // Check that the task was added to the mockFileContent array
        expect(mockFileContent.length).toBe(1);
        expect(mockFileContent[0].description).toBe("Task 1");
        expect(mockFileContent[0].id).toBe(1); // Ensure the ID is as expected
    });

    it("should list all tasks", () => {
        matchCommand[TaskCommand.add](["Task 1"]);
        matchCommand[TaskCommand.add](["Task 2"]);
        console.log = jest.fn(); // Mock console.log

        matchCommand[TaskCommand.list]([]);

        expect(console.log).toHaveBeenCalledWith(chalk.yellowBright("TASKS:"));
        expect(console.log).toHaveBeenCalledWith(
            expect.stringContaining("1 - Task 1 -")
        );
        expect(console.log).toHaveBeenCalledWith(
            expect.stringContaining("2 - Task 2 -")
        );
    });

    it("should delete a task", () => {
        matchCommand[TaskCommand.add](["Task 1"]);
        console.log = jest.fn(); // Mock console.log

        matchCommand[TaskCommand.delete](["1"]);

        expect(console.log).toHaveBeenCalledWith(
            chalk.yellowBright("Task with id: 1 deleted")
        );
        expect(mockFileContent.length).toBe(0);
    });

    it("should not find a task to delete", () => {
        console.log = jest.fn(); // Mock console.log

        matchCommand[TaskCommand.delete](["99"]);

        expect(console.log).toHaveBeenCalledWith(
            chalk.redBright("Task with id: 99 not found")
        );
    });

    it("should update a task", () => {
        matchCommand[TaskCommand.add](["Task 1"]);
        console.log = jest.fn(); // Mock console.log

        matchCommand[TaskCommand.update](["1", "Updated Task 1"]);

        expect(console.log).toHaveBeenCalledWith(
            chalk.yellowBright("Task with id: 1 updated")
        );
        expect(mockFileContent[0].description).toBe("Updated Task 1");
    });

    it("should not find a task to update", () => {
        console.log = jest.fn(); // Mock console.log

        matchCommand[TaskCommand.update](["99", "New Task"]);

        expect(console.log).toHaveBeenCalledWith(
            chalk.blueBright("Task with id: 99 not found")
        );
    });

    it("should mark a task as completed", () => {
        matchCommand[TaskCommand.add](["Task 1"]);
        console.log = jest.fn(); // Mock console.log

        matchCommand[TaskCommand.markCompleted](["1"]);

        expect(console.log).toHaveBeenCalledWith(
            chalk.yellowBright("Task with id: 1 marked as completed")
        );
        expect(mockFileContent[0].status).toBe(true);
    });

    it("should not find a task to mark as completed", () => {
        console.log = jest.fn(); // Mock console.log

        matchCommand[TaskCommand.markCompleted](["99"]);

        expect(console.log).toHaveBeenCalledWith(
            chalk.redBright("Task with id: 99 not found")
        );
    });

    it("should mark a task as pending", () => {
        matchCommand[TaskCommand.add](["Task 1"]);
        matchCommand[TaskCommand.markCompleted](["1"]);
        console.log = jest.fn(); // Mock console.log

        matchCommand[TaskCommand.markPending](["1"]);

        expect(console.log).toHaveBeenCalledWith(
            chalk.yellowBright("Task with id: 1 marked as pending")
        );
        expect(mockFileContent[0].status).toBe(false);
    });

    it("should not find a task to mark as pending", () => {
        console.log = jest.fn(); // Mock console.log

        matchCommand[TaskCommand.markPending](["99"]);

        expect(console.log).toHaveBeenCalledWith(
            chalk.redBright("Task with id: 99 not found")
        );
    });
});
