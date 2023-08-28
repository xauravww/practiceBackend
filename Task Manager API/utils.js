import { data } from "./data.js"

export const addTask = (title, description, dueDate, status) => {
  const newTask = {
    title,
    description,
    dueDate,
    status
  }
  return newTask
}

export const result = (dataStructure) => {
  data.push(dataStructure)
  return data
}
