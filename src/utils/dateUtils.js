export function now() {
  return new Date();
}

export function yesterday() {
  const date = new Date();
  date.setDate(date.getDate() - 1);

  return date;
}

export function startOfDay(date) {
  const result = new Date(date);

  result.setHours(0, 0, 0, 0);

  return result;
}

export function endOfDay(date) {
  const result = new Date(date);

  result.setHours(23, 59, 59, 0);

  return result;
}

export function daysAgo(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);

  return date;
}

export function shiftStart(date) {
  date.setHours(10, 0, 0, 0);

  return date;
}