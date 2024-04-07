import * as moment from 'moment';

export const buildCompletedTask = (task) => {
  const today = moment();
  const nextActiveOn = task.repeatIn
    ? today.clone().add(task.repeatIn, 'days').toDate() // Convert moment to JavaScript Date
    : null; // Keeping it null if there's no repetition

  // Return a new object without mutating createTaskDto
  return {
    ...task,
    nextActiveOn, // This is now a Date or null
    status: true,
    completedOn: today.toDate(), // Convert moment to JavaScript Date
  };
};
