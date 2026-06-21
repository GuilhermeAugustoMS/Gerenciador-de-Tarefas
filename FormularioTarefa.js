import React, { useState, useRef } from "react";
import { useTasks } from "../context/TaskContext";

const MAX_LENGTH = 120;

/**
 * Componente responsável apenas pela entrada de novas tarefas.
 * Usa useState LOCAL para controlar o valor do input (estado de UI),
 * e consome o contexto global apenas para disparar a ação addTask.
 */
function FormularioTarefa() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const { addTask } = useTasks();
  const inputRef = useRef(null);

  const handleChange = (event) => {
    setText(event.target.value);
    if (error) setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // evita recarregar a página

    if (!text.trim()) {
      setError("Digite uma tarefa antes de adicionar.");
      inputRef.current?.focus();
      return;
    }

    addTask(text);
    setText(""); // limpa o campo após adicionar
    inputRef.current?.focus(); // mantém o foco para adicionar a próxima rapidamente
  };

  return (
    <div>
      <form className="task-form" onSubmit={handleSubmit} noValidate>
        <input
          ref={inputRef}
          type="text"
          placeholder="O que você precisa fazer?"
          value={text}
          onChange={handleChange}
          maxLength={MAX_LENGTH}
          aria-label="Nova tarefa"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "task-form-error" : undefined}
          autoFocus
        />
        <button type="submit">Adicionar</button>
      </form>
      {error && (
        <p className="form-error" id="task-form-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormularioTarefa;
