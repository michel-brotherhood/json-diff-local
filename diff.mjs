export function compare(left, right) {
  const changes = [];
  const walk = (a, b, path) => {
    if (Object.is(a, b)) return;
    const isObject = value => value !== null && typeof value === 'object';
    if (!isObject(a) || !isObject(b) || Array.isArray(a) !== Array.isArray(b)) {
      changes.push({ path, kind: 'changed', before: a, after: b });
      return;
    }
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const key of keys) {
      const child = `${path}/${key.replaceAll('~', '~0').replaceAll('/', '~1')}`;
      if (!Object.hasOwn(a, key)) changes.push({ path: child, kind: 'added', after: b[key] });
      else if (!Object.hasOwn(b, key)) changes.push({ path: child, kind: 'removed', before: a[key] });
      else walk(a[key], b[key], child);
    }
  };
  walk(left, right, '');
  return changes;
}
