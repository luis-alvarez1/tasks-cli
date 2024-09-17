#!/usr/bin/env node

import path from "path";
import { TaskManager } from "./models/TaskManager";

const filePath = path.join(__dirname, "data/tasks.json");

const taskManager = new TaskManager(filePath);
