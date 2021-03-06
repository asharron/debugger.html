// @flow

function findInsertionLocation<T>(
  array: Array<T>,
  callback: T => number
): number {
  let left = 0;
  let right = array.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const item = array[mid];

    const result = callback(item);
    if (result === 0) {
      left = mid;
      break;
    }
    if (result >= 0) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  // Ensure the value is the start of any set of matches.
  let i = left;
  while (i > 0 && callback(array[i]) >= 0) {
    i--;
  }
  return i + 1;
}

export function filterSortedArray<T>(
  array: Array<T>,
  callback: T => number
): Array<T> {
  const start = findInsertionLocation(array, callback);

  const results = [];
  for (let i = start; i < array.length && callback(array[i]) === 0; i++) {
    results.push(array[i]);
  }

  return results;
}
