import React from "react";
import { useTasks, FILTERS } from "../context/TaskContext";
import Tarefa from "./Tarefa";

const EMPTY_MESSAGES = {
  [FILTERS.ALL]: "Nenhuma tarefa por aqui. Adicione a primeira.",
  [FILTERS.PENDING]: "Nenhuma tarefa pendente. Bom trabalho!",
  [FILTERS.COMPLETED]: "Nenhuma tarefa concluída ainda.",
};

/**
 * Componente responsável por renderizar a lista de tarefas
 * já filtrada de acordo com o filtro ativo no contexto global.
 * Delega a renderização de cada item ao componente <Tarefa />.
 */
function ListaDeTarefas() {
  const { filteredTasks, filter } = useTasks();

  if (filteredTasks.length === 0) {
    return (
      <p className="empty-state" role="status">
        {EMPTY_MESSAGES[filter]}
      </p>
    );
  }

  return (
    <ul className="task-list" aria-live="polite">
      {filteredTasks.map((task) => (
        <Tarefa key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default ListaDeTarefas;
