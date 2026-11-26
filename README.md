# JSON Diff Local

Comparador de dois documentos JSON executado no navegador. Mostra adições, remoções e alterações com caminhos no formato JSON Pointer. Nenhum texto digitado é enviado a servidor; a aplicação não usa dependências nem armazenamento local.

## Uso

Inicie um servidor local na pasta do projeto e abra `http://localhost:8000`:

```sh
python3 -m http.server 8000
```

Cole os dois JSONs e clique em **Comparar**. Os arrays são comparados por posição; mover um item pode produzir várias diferenças. A ordem das propriedades de objetos não altera o resultado. O servidor entrega apenas os arquivos estáticos; o conteúdo digitado é processado localmente pelo Web Worker.

## Testes

Requer Node.js 18 ou superior:

```sh
npm test
```

## Limites

A comparação e o parsing ocorrem fora da thread da interface, e a listagem é renderizada em lotes. Documentos muito grandes ainda podem consumir muita memória ou ultrapassar os limites do navegador. O resultado usa caminhos JSON Pointer, com `/` e `~` escapados. Evite colar dados confidenciais em computadores compartilhados.
