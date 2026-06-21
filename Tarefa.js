import React from "react";
import { useTasks } from "../context/TaskContext";

/**
 * Componente que representa UMA tarefa individual.
 * Recebe a tarefa via props e usa o contexto apenas para
 * disparar as ações de alternar (toggle) e remover.
 */
function Tarefa({ task }) {
  const { toggleTask, deleteTask } = useTasks();

  return (
    <li className={`task-item${task.completed ? " completed" : ""}`}>
      <label className="task-checkbox-wrap">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          aria-label={`Marcar "${task.text}" como ${
            task.completed ? "pendente" : "concluída"
          }`}
        />
        <span className="task-checkbox-custom" aria-hidden="true"></span>
      </label>
      <span className="task-text">{task.text}</span>
      <button
        type="button"
        className="delete-btn"
        onClick={() => deleteTask(task.id)}
        aria-label={`Remover tarefa "${task.text}"`}
        title="Remover tarefa"
      >
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path
            d="M4 4 L12 12 M12 4 L4 12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </button>
    </li>
  );
}

export default Tarefa;
