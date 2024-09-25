import fs from "fs";
import { jest } from "@jest/globals";
import { TaskManager } from "../../models/TaskManager";

jest.mock("fs");

describe("TaskManager constructor", () => {
    const filePath = "path/to/tasks.json";

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a directory if it does not exist", () => {
        (fs.existsSync as jest.Mock).mockImplementation((path) => {
            return false;
        });

        (fs.mkdirSync as jest.Mock).mockImplementation(() => {});
        (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify([]));

        const taskManager = new TaskManager(filePath);

        expect(fs.existsSync).toHaveBeenCalledWith("path/to");
    });

    it("should create a directory", () => {
        (fs.existsSync as jest.Mock).mockImplementation((path) => {
            return false;
        });

        (fs.mkdirSync as jest.Mock).mockImplementation(() => {});
        (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify([]));

        const taskManager = new TaskManager(filePath);

        expect(fs.mkdirSync).toHaveBeenCalledWith("path/to");
    });

    it("should check if the file exists", () => {
        (fs.existsSync as jest.Mock).mockImplementation((path) => {
            return false;
        });

        (fs.mkdirSync as jest.Mock).mockImplementation(() => {});
        (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify([]));

        const taskManager = new TaskManager(filePath);

        expect(fs.existsSync).toHaveBeenCalledWith(filePath);
    });

    it("should create the file if it does not exist", () => {
        (fs.existsSync as jest.Mock).mockImplementation((path) => {
            return false;
        });

        (fs.mkdirSync as jest.Mock).mockImplementation(() => {});
        (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify([]));

        const taskManager = new TaskManager(filePath);

        expect(fs.writeFileSync).toHaveBeenCalledWith(
            filePath,
            JSON.stringify([])
        );
    });

    it("should initialize tasks as an empty array", () => {
        (fs.existsSync as jest.Mock).mockImplementation((path) => {
            return false;
        });

        (fs.mkdirSync as jest.Mock).mockImplementation(() => {});
        (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify([]));

        const taskManager = new TaskManager(filePath);

        expect(taskManager["tasks"]).toEqual([]);
    });

    it("should not create a directory if it already exists but create a file if it does not exist", () => {
        (fs.existsSync as jest.Mock).mockImplementation((path) => {
            return path !== filePath;
        });

        (fs.mkdirSync as jest.Mock).mockImplementation(() => {});
        (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify([]));

        const taskManager = new TaskManager(filePath);

        expect(fs.existsSync).toHaveBeenCalledWith("path/to");
    });

    it("should not create a directory if it already exists", () => {
        (fs.existsSync as jest.Mock).mockImplementation((path) => {
            return path !== filePath;
        });

        (fs.mkdirSync as jest.Mock).mockImplementation(() => {});
        (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify([]));

        const taskManager = new TaskManager(filePath);

        expect(fs.mkdirSync).not.toHaveBeenCalled();
    });

    it("should not create anything if both the directory and file already exist", () => {
        (fs.existsSync as jest.Mock).mockImplementation((path) => {
            return true;
        });

        (fs.mkdirSync as jest.Mock).mockImplementation(() => {});
        (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify([]));

        const taskManager = new TaskManager(filePath);

        expect(fs.existsSync).toHaveBeenCalledWith("path/to");
    });

    it("should not create anything if the directory already exists", () => {
        (fs.existsSync as jest.Mock).mockImplementation((path) => {
            return true;
        });

        (fs.mkdirSync as jest.Mock).mockImplementation(() => {});
        (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify([]));

        const taskManager = new TaskManager(filePath);

        expect(fs.mkdirSync).not.toHaveBeenCalled();
    });

    it("should not create anything if both the directory and file already exist", () => {
        (fs.existsSync as jest.Mock).mockImplementation((path) => {
            return true;
        });

        (fs.mkdirSync as jest.Mock).mockImplementation(() => {});
        (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify([]));

        const taskManager = new TaskManager(filePath);

        expect(fs.writeFileSync).not.toHaveBeenCalled();
    });

    it("should handle JSON parsing error gracefully", () => {
        (fs.existsSync as jest.Mock).mockImplementation((path) => {
            return true;
        });

        (fs.readFileSync as jest.Mock).mockReturnValue("invalid JSON");

        expect(() => new TaskManager(filePath)).toThrow(SyntaxError);
    });
});

jest.mock("fs");

describe("TaskManager functions", () => {
    const filePath = "path/to/tasks.json";

    beforeEach(() => {
        jest.clearAllMocks();

        (
            fs.existsSync as jest.MockedFunction<typeof fs.existsSync>
        ).mockImplementation((path) => {
            if (path === "path/to") {
                return true;
            }
            if (path === filePath) {
                return true;
            }
            return false;
        });

        (
            fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>
        ).mockReturnValue(JSON.stringify([]));
    });

    it("should create a new task", () => {
        const taskManager = new TaskManager(filePath);
        const consoleSpy = jest
            .spyOn(console, "log")
            .mockImplementation(() => {});

        taskManager.create("New Task");

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("New Task with id")
        );

        consoleSpy.mockRestore();
    });

    it("should save tasks when a new task is created", () => {
        const taskManager = new TaskManager(filePath);

        taskManager.create("New Task");

        expect(fs.writeFileSync).toHaveBeenCalledWith(
            filePath,
            expect.any(String)
        );
    });

    it("should list tasks", () => {
        const taskManager = new TaskManager(filePath);
        const consoleSpy = jest
            .spyOn(console, "log")
            .mockImplementation(() => {});

        taskManager.create("Task 1");
        taskManager.create("Task 2");

        taskManager.listTasks();

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("TASKS:")
        );

        consoleSpy.mockRestore();
    });

    it("should log individual tasks when listing", () => {
        const taskManager = new TaskManager(filePath);
        const consoleSpy = jest
            .spyOn(console, "log")
            .mockImplementation(() => {});

        taskManager.create("Task 1");
        taskManager.create("Task 2");

        taskManager.listTasks();

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("1 - Task 1 -")
        );

        consoleSpy.mockRestore();
    });

    it("should set task status", () => {
        const taskManager = new TaskManager(filePath);
        taskManager.create("Task 1");

        const consoleSpy = jest
            .spyOn(console, "log")
            .mockImplementation(() => {});

        taskManager.setStatus(1, true);

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("Task with id: 1 marked as completed")
        );

        consoleSpy.mockRestore();
    });

    it("should save tasks when status is set", () => {
        const taskManager = new TaskManager(filePath);
        taskManager.create("Task 1");

        taskManager.setStatus(1, true);

        expect(fs.writeFileSync).toHaveBeenCalledWith(
            filePath,
            expect.any(String)
        );
    });

    it("should delete a task", () => {
        const taskManager = new TaskManager(filePath);
        taskManager.create("Task 1");

        const consoleSpy = jest
            .spyOn(console, "log")
            .mockImplementation(() => {});

        taskManager.delete(1);

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("Task with id: 1 deleted")
        );

        consoleSpy.mockRestore();
    });

    it("should save tasks when a task is deleted", () => {
        const taskManager = new TaskManager(filePath);
        taskManager.create("Task 1");

        taskManager.delete(1);

        expect(fs.writeFileSync).toHaveBeenCalledWith(
            filePath,
            expect.any(String)
        );
    });

    it("should update a task", () => {
        const taskManager = new TaskManager(filePath);
        taskManager.create("Task 1");

        const consoleSpy = jest
            .spyOn(console, "log")
            .mockImplementation(() => {});

        taskManager.update(1, "Updated Task");

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("Task with id: 1 updated")
        );

        consoleSpy.mockRestore();
    });

    it("should save tasks when a task is updated", () => {
        const taskManager = new TaskManager(filePath);
        taskManager.create("Task 1");

        taskManager.update(1, "Updated Task");

        expect(fs.writeFileSync).toHaveBeenCalledWith(
            filePath,
            expect.any(String)
        );
    });
});

describe("TaskManager Edge Cases", () => {
    const filePath = "path/to/tasks.json";
    let taskManager: TaskManager;

    beforeEach(() => {
        jest.clearAllMocks();
        (
            fs.existsSync as jest.MockedFunction<typeof fs.existsSync>
        ).mockImplementation((path) => {
            if (path === "path/to") {
                return true; // Simulate directory exists
            }
            if (path === filePath) {
                return true; // Simulate file exists
            }
            return false; // For any other path
        });

        (
            fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>
        ).mockReturnValue(
            JSON.stringify([
                {
                    id: 1,
                    description: "Task 1",
                    status: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                {
                    id: 2,
                    description: "Task 2",
                    status: false,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            ])
        );

        taskManager = new TaskManager(filePath);
    });
    it("should not create a task if the file exists", () => {
        const taskManager = new TaskManager(filePath);

        const consoleSpy = jest
            .spyOn(console, "log")
            .mockImplementation(() => {});
        taskManager.create("Task 1");

        expect(consoleSpy).toHaveBeenCalled(); // Expect log to have been called

        consoleSpy.mockRestore();
    });

    it("should not set status for a non-existent task", () => {
        const taskManager = new TaskManager(filePath);
        const consoleSpy = jest
            .spyOn(console, "log")
            .mockImplementation(() => {});

        taskManager.setStatus(999, true); // Non-existent task ID

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("Task with id: 999 not found")
        ); // Expect correct log message

        consoleSpy.mockRestore();
    });

    it("should not delete a non-existent task", () => {
        const taskManager = new TaskManager(filePath);
        const consoleSpy = jest
            .spyOn(console, "log")
            .mockImplementation(() => {});

        taskManager.delete(999); // Non-existent task ID

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("Task with id: 999 not found")
        ); // Expect correct log message

        consoleSpy.mockRestore();
    });

    it("should not update a non-existent task", () => {
        const taskManager = new TaskManager(filePath);
        const consoleSpy = jest
            .spyOn(console, "log")
            .mockImplementation(() => {});

        taskManager.update(999, "Updated Task"); // Non-existent task ID

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("Task with id: 999 not found")
        ); // Expect correct log message

        consoleSpy.mockRestore();
    });

    it("should list all tasks when no status is provided", () => {
        const consoleSpy = jest
            .spyOn(console, "log")
            .mockImplementation(() => {});

        taskManager.listTasks(); // No status provided

        expect(consoleSpy).toHaveBeenCalled(); // Ensure logging occurred

        consoleSpy.mockRestore();
    });

    it("should filter tasks by status when true is provided", () => {
        const consoleSpy = jest
            .spyOn(console, "log")
            .mockImplementation(() => {});

        taskManager.listTasks(true); // Filter for completed tasks

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("Task 1")
        ); // Expect Task 1 to be logged
        expect(consoleSpy).not.toHaveBeenCalledWith(
            expect.stringContaining("Task 2")
        ); // Ensure Task 2 is not logged

        consoleSpy.mockRestore();
    });

    it("should filter tasks by status when false is provided", () => {
        const consoleSpy = jest
            .spyOn(console, "log")
            .mockImplementation(() => {});

        taskManager.listTasks(false); // Filter for pending tasks

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("Task 2")
        ); // Expect Task 2 to be logged
        expect(consoleSpy).not.toHaveBeenCalledWith(
            expect.stringContaining("Task 1")
        ); // Ensure Task 1 is not logged

        consoleSpy.mockRestore();
    });
});
