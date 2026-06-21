import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
} from "react";
import tasksReducer, { initialState, ACTIONS, FILTERS, FILTER_ORDER } from "../reducers/tasksReducer";

// Criação do contexto global da aplicação
const TaskContext = createContext(null);

/**
 * Provider que envolve a aplicação e disponibiliza:
 * - o estado global (tasks, filter)
 * - as ações (funções) para alterar esse estado
 * - dados derivados (tarefas filtradas, contadores)
 *
 * Usamos useReducer (em vez de vários useState soltos) porque a lógica
 * de atualização das tarefas tem múltiplas ações relacionadas
 * (adicionar, concluir, remover, filtrar), o que é o caso de uso
 * recomendado para useReducer.
 */
export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  // As funções de ação são memorizadas com useCallback para manter a
  // mesma referência entre renders. Isso evita que o objeto `value` do
  // contexto (mais abaixo) mude desnecessariamente, o que faria TODOS
  // os componentes consumidores re-renderizarem mesmo sem mudança real
  // de dado relevante para eles.
  const addTask = useCallback(
    (text) => dispatch({ type: ACTIONS.ADD_TASK, payload: { text } }),
    []
  );

  const toggleTask = useCallback(
    (id) => dispatch({ type: ACTIONS.TOGGLE_TASK, payload: { id } }),
    []
  );

  const deleteTask = useCallback(
    (id) => dispatch({ type: ACTIONS.DELETE_TASK, payload: { id } }),
    []
  );

  const setFilter = useCallback(
    (filter) => dispatch({ type: ACTIONS.SET_FILTER, payload: { filter } }),
    []
  );

  const clearCompleted = useCallback(
    () => dispatch({ type: ACTIONS.CLEAR_COMPLETED }),
    []
  );

  // Lista de tarefas já filtrada de acordo com o filtro ativo
  const filteredTasks = useMemo(() => {
    switch (state.filter) {
      case FILTERS.COMPLETED:
        return state.tasks.filter((task) => task.completed);
      case FILTERS.PENDING:
        return state.tasks.filter((task) => !task.completed);
      default:
        return state.tasks;
    }
  }, [state.tasks, state.filter]);

  // Contadores derivados, recalculados apenas quando as tarefas mudam
  const { totalCount, completedCount, pendingCount } = useMemo(() => {
    const total = state.tasks.length;
    const completed = state.tasks.filter((t) => t.completed).length;
    return {
      totalCount: total,
      completedCount: completed,
      pendingCount: total - completed,
    };
  }, [state.tasks]);

  // O objeto de valor do contexto também é memorizado: só muda quando
  // algum dos dados/funções que ele agrupa realmente muda.
  const value = useMemo(
    () => ({
      tasks: state.tasks,
      filter: state.filter,
      filteredTasks,
      totalCount,
      completedCount,
      pendingCount,
      addTask,
      toggleTask,
      deleteTask,
      setFilter,
      clearCompleted,
    }),
    [
      state.tasks,
      state.filter,
      filteredTasks,
      totalCount,
      completedCount,
      pendingCount,
      addTask,
      toggleTask,
      deleteTask,
      setFilter,
      clearCompleted,
    ]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

/**
 * Hook customizado para consumir o TaskContext.
 * Evita repetir useContext(TaskContext) em cada componente
 * e dá um erro claro caso seja usado fora do Provider.
 */
export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks deve ser usado dentro de um <TaskProvider>");
  }
  return context;
}

export { FILTERS, FILTER_ORDER };
