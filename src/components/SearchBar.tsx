// Ana Clara
import { useEffect, useRef } from 'react';

interface SearchBarProps {
  valor: string;
  onChange: (valor: string) => void;
}

function SearchBar({ valor, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // ja deixa o cursor na busca quando abre a pagina
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function limpar() {
    onChange('');
    inputRef.current?.focus();
  }

  return (
    <div className="busca">
      <input
        ref={inputRef}
        type="text"
        placeholder="Buscar por nome ou número (ex: pikachu ou 25)"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
      />
      {valor && (
        <button className="limpar" onClick={limpar}>
          Limpar
        </button>
      )}
    </div>
  );
}

export default SearchBar;
