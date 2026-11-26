import { compare } from './diff.mjs';

export function parseAndCompare(before, after) {
  return compare(JSON.parse(before), JSON.parse(after));
}

if (typeof self !== 'undefined' && typeof self.postMessage === 'function') {
  self.onmessage = ({ data }) => {
    try {
      self.postMessage({ changes: parseAndCompare(data.before, data.after) });
    } catch (error) {
      self.postMessage({ error: error.message });
    }
  };
}
