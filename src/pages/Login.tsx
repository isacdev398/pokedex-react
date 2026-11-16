import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { usuario, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { voltarPara?: string } | null;
  const voltarPara = state?.voltarPara ?? '/meu-time';

  if (usuario) {
    return <Navigate to={voltarPara} replace />;
  }

  function fazerLogin(email: string, senha: string) {
    const ok = login(email, senha);
    if (ok) navigate(voltarPara, { replace: true });
    return ok;
  }

  return (
    <section className="container secao estreito">
      <h1>Entrar</h1>
      <p>Faça login para montar e ver o seu time.</p>
      <LoginForm onLogin={fazerLogin} />
      <p className="pequeno">Obs: não tem servidor, então qualquer e-mail válido com senha de 6 caracteres funciona.</p>
    </section>
  );
}

export default Login;
