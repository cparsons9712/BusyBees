import moment from 'moment';

export const buildCompletedTask = (createTaskDto) => {
  const today = moment();
  const nextActiveOn = createTaskDto.repeatIn
    ? today.clone().add(createTaskDto.repeatIn, 'days').toDate() // Convert moment to JavaScript Date
    : null; // Keeping it null if there's no repetition

  // Return a new object without mutating createTaskDto
  return {
    ...createTaskDto,
    nextActiveOn, // This is now a Date or null
    status: true,
    completedOn: today.toDate(), // Convert moment to JavaScript Date
  };
};
