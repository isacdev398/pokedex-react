// Joao Ricardo
import { useRef, useState, type FormEvent } from 'react';

interface LoginFormProps {
  onLogin: (email: string, senha: string) => boolean;
}

function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (email === '' || senha === '') {
      setErro('Preencha todos os campos.');
      return;
    }
    if (senha.length < 6) {
      setErro('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    const deuCerto = onLogin(email, senha);
    if (!deuCerto) {
      setErro('Digite um e-mail válido.');
      emailRef.current?.focus();
    }
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <label>
        E-mail
        <input
          ref={emailRef}
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seuemail@exemplo.com"
        />
      </label>

      <label>
        Senha
        <div className="campo-senha">
          <input
            type={mostrarSenha ? 'text' : 'password'}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="button" className="btn btn-secundario" onClick={() => setMostrarSenha(!mostrarSenha)}>
            {mostrarSenha ? 'Esconder' : 'Mostrar'}
          </button>
        </div>
      </label>

      {erro && <p className="erro">{erro}</p>}

      <button type="submit" className="btn">Entrar</button>
    </form>
  );
}

export default LoginForm;
