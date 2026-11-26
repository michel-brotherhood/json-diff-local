import test from 'node:test';
import assert from 'node:assert/strict';
import { compare } from '../diff.mjs';

test('compara valores aninhados e distingue campos ausentes', () => {
  assert.deepEqual(compare({ a: { x: 1 }, b: null }, { a: { x: 2 }, c: false }), [
    { path: '/a/x', kind: 'changed', before: 1, after: 2 },
    { path: '/b', kind: 'removed', before: null },
    { path: '/c', kind: 'added', after: false }
  ]);
});
test('escapa caminhos e compara arrays por índice', () => {
  assert.deepEqual(compare({ 'a/b': [1, 2] }, { 'a/b': [1, 3, 4] }), [
    { path: '/a~1b/1', kind: 'changed', before: 2, after: 3 },
    { path: '/a~1b/2', kind: 'added', after: 4 }
  ]);
});
test('ignora objetos estruturalmente iguais', () => {
  assert.deepEqual(compare({ a: [true, null] }, { a: [true, null] }), []);
});
