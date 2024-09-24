# Task Tracker CLI

Task Tracker CLI is a command-line interface (CLI) application to track and manage your tasks. This project includes working with the filesystem, handling user inputs, and managing a list of tasks.

## Features

-   Add, update, and delete tasks
-   Mark a task as pending or completed
-   List all tasks
-   List tasks by status (completed, pending)

## Requirements

-   Node.js
-   NPM or Yarn

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/luis-alvarez1/tasks-cli
    cd task-tracker-cli
    ```

2. Install dependencies:

-   NPM
    ```sh
    npm install
    ```
-   Yarn
    ```sh
    yarn install
    ```

3. Compile TypeScript to JavaScript:

-   NPM
    ```sh
    npm run build
    ```
-   Yarn
    ```sh
    yarn build
    ```

4. Install the CLI on your system:

```sh
npm install -g
```

## Usage

### Add tasks

```sh
task-cli add "Buy groceries"
```

### List tasks by status

1. Default:

```sh
task-cli list
```

2. Completed:

```sh
task-cli list completed
```

3. Pending:

```sh
task-cli list pending
```

### Updating a task

```sh
tasks-cli update 1 "Buy groceries and car oil"
```

### Marking a task as completed

```sh
task-cli mark-completed 1
```

### Marking a task as pending

```sh
task-cli mark-pending 1
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Author

-   Luis Alvarez, Sept. 2024.
