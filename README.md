# 📝 Gerenciador de Tarefas

Aplicação React para gerenciar tarefas: adicionar, marcar como concluídas e filtrar por status (Todas / Pendentes / Concluídas).

## Como executar

```bash
yarn install
yarn start
```

ou, com npm:

```bash
npm install
npm start
```

A aplicação abrirá em `http://localhost:3000`.

## Estrutura do projeto

```
src/
├── App.js                     # Componente raiz, monta o layout e envolve a app no TaskProvider
├── index.js                   # Ponto de entrada (ReactDOM.createRoot)
├── index.css                  # Estilos globais
├── context/
│   └── TaskContext.js         # Contexto global (useContext + useReducer) e hook useTasks()
├── reducers/
│   └── tasksReducer.js        # Reducer puro com toda a lógica de transição de estado (imutável)
└── components/
    ├── FormularioTarefa.js    # Input + botão para adicionar tarefas (useState local)
    ├── Filtros.js             # Botões de filtro: Todas / Pendentes / Concluídas
    ├── Resumo.js              # Contadores e botão "limpar concluídas"
    ├── ListaDeTarefas.js      # Renderiza a lista de tarefas já filtrada
    └── Tarefa.js              # Item individual da lista (checkbox + texto + remover)
```

## Decisões técnicas

- **Estado global**: gerenciado com `useReducer` (lógica de transição centralizada em
  `tasksReducer.js`) exposto via `useContext` através do `TaskProvider` e do hook
  customizado `useTasks()`. Qualquer componente pode ler tarefas/filtro e disparar ações
  sem necessidade de passar props manualmente (prop drilling).
- **Estado local**: o valor digitado no input (`FormularioTarefa.js`) usa `useState`,
  pois é um estado de UI que não precisa ser compartilhado com o restante da aplicação.
- **Imutabilidade**: todas as atualizações de tarefas no reducer usam spread operator,
  `map` e `filter` para gerar novos arrays/objetos, nunca mutando o estado anterior
  diretamente. Validado com testes automatizados da lógica do reducer (inclusive teste
  de concorrência: 1000 tarefas criadas com `Date.now()` fixo geram 1000 IDs únicos).
- **Performance**: as funções de ação e o objeto de contexto são memorizados com
  `useCallback`/`useMemo` em `TaskContext.js`, evitando re-renders desnecessários de
  toda a árvore de componentes a cada atualização de estado.
- **Acessibilidade**: labels associadas a inputs, `aria-pressed` nos filtros,
  `aria-live` na lista e no resumo (leitores de tela anunciam mudanças), foco visível
  customizado e foco automático de volta ao input após adicionar uma tarefa.
- **Componentização**: no mínimo os três componentes pedidos (`App`, `ListaDeTarefas`,
  `Tarefa`) mais componentes auxiliares (`FormularioTarefa`, `Filtros`, `Resumo`) para
  manter cada peça com responsabilidade única.
- **Visual**: tema escuro autoral (grafite + âmbar, tipografia Inter/JetBrains Mono),
  pensado para parecer uma ferramenta de foco/produtividade, evitando o clichê de
  "dark mode roxo genérico".

## Correções feitas na revisão de código

- Geração de ID de tarefa mais robusta: antes usava apenas `Date.now()` como fallback,
  o que podia gerar IDs duplicados em criações muito rápidas; agora combina timestamp +
  contador + valor aleatório.
- Texto da tarefa é normalizado (espaços extras no meio do texto são reduzidos a um só).
- Ordem de exibição dos filtros corrigida e explicitada via `FILTER_ORDER`, em vez de
  depender da ordem de declaração das chaves de um objeto JS.
- Campo de texto agora tem `maxLength` para não quebrar o layout com textos enormes.
- `TaskContext` deixou de recriar funções e o objeto de valor a cada render
  (`useCallback`/`useMemo`), reduzindo re-renders desnecessários.
