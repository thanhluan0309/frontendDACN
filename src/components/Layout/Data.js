const initData = {
  tasks: {
    "task-1": { id: "task-1", content: "take a gar" },
    "task-2": { id: "task-2", content: "get a gar" },
    "task-3": { id: "task-3", content: "throw a gar" },

    "task-4": { id: "task-4", content: "Eat a gar" },
    "task-5": { id: "task-5", content: "Bruh a gar" },
  },

  colums: {
    "colums-1": {
      id: "colums-1",
      title: "Process",
      taskIds: ["task-1", "task-2", "task-3", "task-4", "task-5"],
    },
    "colums-2": {
      id: "colums-2",
      title: "To do",
      taskIds: [],
    },
    "colums-3": {
      id: "colums-3",
      title: "Done",
      taskIds: [],
    },
  },
  columOrder: ["colums-1", "colums-2", "colums-3"],
};
export default initData;
