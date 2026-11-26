# JSON Diff Local

Comparador de dois documentos JSON executado no navegador. Mostra adições, remoções e alterações com caminhos no formato JSON Pointer. Nenhum texto digitado é enviado a servidor; a aplicação não usa dependências nem armazenamento local.

## Uso

Abra `index.html` em um navegador moderno, cole os dois JSONs e clique em **Comparar**. Os arrays são comparados por posição; mover um item pode produzir várias diferenças. A ordem das propriedades de objetos não altera o resultado.

## Testes

Requer Node.js 18 ou superior:

```sh
npm test
```

## Limites

A comparação é síncrona e não foi otimizada para documentos muito grandes. O resultado usa caminhos JSON Pointer, com `/` e `~` escapados. O navegador interpreta os dados localmente; evite colar dados confidenciais em computadores compartilhados.
