import { compare } from './diff.mjs';

const form = document.querySelector('form');
const output = document.querySelector('#output');
const status = document.querySelector('#status');
const format = value => JSON.stringify(value, null, 2);

form.addEventListener('submit', event => {
  event.preventDefault();
  output.replaceChildren();
  try {
    const before = JSON.parse(form.elements.before.value);
    const after = JSON.parse(form.elements.after.value);
    const changes = compare(before, after);
    status.textContent = changes.length ? `${changes.length} diferença(s)` : 'Nenhuma diferença';
    for (const change of changes) {
      const item = document.createElement('li');
      const title = document.createElement('strong');
      title.textContent = `${change.kind === 'added' ? 'Adicionado' : change.kind === 'removed' ? 'Removido' : 'Alterado'}: ${change.path || '/'}`;
      item.append(title);
      const detail = document.createElement('pre');
      detail.textContent = change.kind === 'added' ? `Depois: ${format(change.after)}` : change.kind === 'removed' ? `Antes: ${format(change.before)}` : `Antes: ${format(change.before)}\nDepois: ${format(change.after)}`;
      item.append(detail);
      output.append(item);
    }
  } catch (error) {
    status.textContent = `JSON inválido: ${error.message}`;
  }
});
