// Tipos de ação do reducer.
// Centralizar os tipos aqui evita erros de digitação ao despachar ações.
export const ACTIONS = {
  ADD_TASK: "ADD_TASK",
  TOGGLE_TASK: "TOGGLE_TASK",
  DELETE_TASK: "DELETE_TASK",
  SET_FILTER: "SET_FILTER",
  CLEAR_COMPLETED: "CLEAR_COMPLETED",
};

export const FILTERS = {
  ALL: "ALL",
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
};

// Ordem em que os filtros devem aparecer na interface.
// Mantida separada do objeto FILTERS para deixar explícito que a ordem
// de exibição é uma decisão de UI, não uma propriedade do enum em si.
export const FILTER_ORDER = [FILTERS.ALL, FILTERS.PENDING, FILTERS.COMPLETED];

// Estado inicial da aplicação
export const initialState = {
  tasks: [],
  filter: FILTERS.ALL,
};

// Gera um ID único e estável para cada tarefa.
// Usa crypto.randomUUID quando disponível (navegadores modernos em
// contexto seguro); caso contrário, combina timestamp + contador +
// número aleatório para evitar colisões mesmo em cliques muito rápidos,
// quando duas tarefas poderiam ser criadas no mesmo milissegundo.
let idCounter = 0;
function generateTaskId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  idCounter += 1;
  return `${Date.now()}-${idCounter}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Reducer responsável por todas as transições de estado da lista de tarefas.
 * Importante: nunca mutamos o array/objetos originais diretamente.
 * Sempre criamos novos arrays/objetos (spread operator, map, filter)
 * para respeitar a imutabilidade exigida pelo React.
 */
function tasksReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK: {
      const text = action.payload.text.trim().replace(/\s+/g, " ");
      if (!text) return state; // ignora tarefas vazias ou só com espaços

      const newTask = {
        id: generateTaskId(),
        text,
        completed: false,
        createdAt: Date.now(),
      };

      return {
        ...state,
        tasks: [...state.tasks, newTask], // novo array, não modifica o original
      };
    }

    case ACTIONS.TOGGLE_TASK: {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, completed: !task.completed } // novo objeto
            : task
        ),
      };
    }

    case ACTIONS.DELETE_TASK: {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };
    }

    case ACTIONS.SET_FILTER: {
      return {
        ...state,
        filter: action.payload.filter,
      };
    }

    case ACTIONS.CLEAR_COMPLETED: {
      return {
        ...state,
        tasks: state.tasks.filter((task) => !task.completed),
      };
    }

    default:
      return state;
  }
}

export default tasksReducer;
