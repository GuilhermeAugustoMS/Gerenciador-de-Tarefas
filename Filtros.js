import React from "react";
import { useTasks, FILTERS, FILTER_ORDER } from "../context/TaskContext";

const FILTER_LABELS = {
  [FILTERS.ALL]: "Todas",
  [FILTERS.PENDING]: "Pendentes",
  [FILTERS.COMPLETED]: "Concluídas",
};

/**
 * Componente de filtros. Lê e altera o filtro ativo
 * diretamente no estado global (via contexto).
 * A ordem de exibição vem de FILTER_ORDER, para não depender
 * da ordem de declaração das chaves do objeto FILTERS.
 */
function Filtros() {
  const { filter, setFilter } = useTasks();

  return (
    <div className="filters" role="group" aria-label="Filtrar tarefas">
      {FILTER_ORDER.map((filterOption) => {
        const isActive = filter === filterOption;
        return (
          <button
            key={filterOption}
            className={isActive ? "active" : ""}
            onClick={() => setFilter(filterOption)}
            type="button"
            aria-pressed={isActive}
          >
            {FILTER_LABELS[filterOption]}
          </button>
        );
      })}
    </div>
  );
}

export default Filtros;
