import React from "react";
import { useTasks } from "../context/TaskContext";

/**
 * Pequeno componente de resumo: mostra quantas tarefas estão
 * pendentes/concluídas e oferece um atalho para limpar as concluídas.
 */
function Resumo() {
  const { totalCount, completedCount, pendingCount, clearCompleted } =
    useTasks();

  if (totalCount === 0) return null;

  return (
    <div className="summary" aria-live="polite">
      <span>
        {pendingCount} pendente{pendingCount !== 1 ? "s" : ""} · {completedCount}{" "}
        concluída{completedCount !== 1 ? "s" : ""}
      </span>
      {completedCount > 0 && (
        <button type="button" className="clear-btn" onClick={clearCompleted}>
          Limpar concluídas
        </button>
      )}
    </div>
  );
}

export default Resumo;
