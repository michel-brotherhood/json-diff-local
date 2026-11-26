const form = document.querySelector('form');
const output = document.querySelector('#output');
const status = document.querySelector('#status');
const format = value => JSON.stringify(value, null, 2);
let worker;
let request = 0;

function render(changes, current) {
  let offset = 0;
  const chunk = () => {
    if (current !== request) return;
    const fragment = document.createDocumentFragment();
    for (const change of changes.slice(offset, offset + 100)) {
      const item = document.createElement('li');
      const title = document.createElement('strong');
      title.textContent = `${change.kind === 'added' ? 'Adicionado' : change.kind === 'removed' ? 'Removido' : 'Alterado'}: ${change.path || '/'}`;
      item.append(title);
      const detail = document.createElement('pre');
      detail.textContent = change.kind === 'added' ? `Depois: ${format(change.after)}` : change.kind === 'removed' ? `Antes: ${format(change.before)}` : `Antes: ${format(change.before)}\nDepois: ${format(change.after)}`;
      item.append(detail);
      fragment.append(item);
    }
    output.append(fragment);
    offset += 100;
    if (offset < changes.length) requestAnimationFrame(chunk);
    else status.textContent = changes.length ? `${changes.length} diferença(s)` : 'Nenhuma diferença';
  };
  requestAnimationFrame(chunk);
}

form.addEventListener('submit', event => {
  event.preventDefault();
  request += 1;
  const current = request;
  worker?.terminate();
  output.replaceChildren();
  status.textContent = 'Comparando…';
  worker = new Worker(new URL('./worker.mjs', import.meta.url), { type: 'module' });
  worker.onmessage = ({ data }) => {
    if (current !== request) return;
    worker.terminate();
    worker = undefined;
    if (data.error) status.textContent = `Erro: ${data.error}`;
    else render(data.changes, current);
  };
  worker.onerror = () => {
    if (current !== request) return;
    worker.terminate();
    worker = undefined;
    status.textContent = 'Não foi possível processar o JSON.';
  };
  worker.postMessage({ before: form.elements.before.value, after: form.elements.after.value });
});
