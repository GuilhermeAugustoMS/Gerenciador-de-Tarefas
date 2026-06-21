import React from "react";
import { TaskProvider } from "./context/TaskContext";
import FormularioTarefa from "./components/FormularioTarefa";
import Filtros from "./components/Filtros";
import Resumo from "./components/Resumo";
import ListaDeTarefas from "./components/ListaDeTarefas";

/**
 * Componente raiz da aplicação "Gerenciador de Tarefas".
 *
 * O <TaskProvider> envolve toda a árvore de componentes para que
 * QUALQUER componente filho possa acessar o estado global (tarefas,
 * filtro ativo, etc.) através do hook useTasks(), sem a necessidade
 * de passar props manualmente por vários níveis (prop drilling).
 */
function App() {
  return (
    <TaskProvider>
      <div className="app-container">
        <header className="app-header">
          <p className="eyebrow">organize seu dia</p>
          <h1>Gerenciador de tarefas</h1>
          <p className="subtitle">Adicione, conclua e filtre o que precisa ser feito.</p>
        </header>

        <main className="card">
          <FormularioTarefa />
          <Filtros />
          <Resumo />
          <ListaDeTarefas />
        </main>
      </div>
    </TaskProvider>
  );
}

export default App;
