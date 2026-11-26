import test from 'node:test';
import assert from 'node:assert/strict';
import { parseAndCompare } from '../worker.mjs';

test('parsing no worker preserva as diferenças esperadas', () => {
  assert.deepEqual(parseAndCompare('{"a":1}', '{"a":2}'), [
    { path: '/a', kind: 'changed', before: 1, after: 2 }
  ]);
});

test('processa documentos grandes sem perder diferenças', () => {
  const before = Array.from({ length: 10000 }, (_, index) => index);
  const after = [...before];
  after[9999] = -1;
  assert.deepEqual(parseAndCompare(JSON.stringify(before), JSON.stringify(after)), [
    { path: '/9999', kind: 'changed', before: 9999, after: -1 }
  ]);
});

test('rejeita JSON inválido', () => {
  assert.throws(() => parseAndCompare('{', '{}'), SyntaxError);
});
