// Ericka
import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';

interface Campos {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

const camposVazios: Campos = { nome: '', email: '', assunto: '', mensagem: '' };

function validar(campos: Campos) {
  const erros: Partial<Campos> = {};
  if (campos.nome.trim().length < 3) erros.nome = 'Digite seu nome.';
  if (!/^\S+@\S+\.\S+$/.test(campos.email)) erros.email = 'E-mail inválido.';
  if (campos.assunto === '') erros.assunto = 'Escolha um assunto.';
  if (campos.mensagem.trim().length < 10) erros.mensagem = 'A mensagem precisa ter pelo menos 10 caracteres.';
  return erros;
}

function ContactForm() {
  const [campos, setCampos] = useState<Campos>(camposVazios);
  const [erros, setErros] = useState<Partial<Campos>>({});
  const [enviado, setEnviado] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // um handleChange so pra todos os campos, usando o "name" do input
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setCampos({ ...campos, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errosEncontrados = validar(campos);
    setErros(errosEncontrados);

    const primeiroErro = Object.keys(errosEncontrados)[0];
    if (primeiroErro) {
      // coloca o cursor no primeiro campo com erro
      const campo = formRef.current?.elements.namedItem(primeiroErro) as HTMLElement | null;
      campo?.focus();
      return;
    }

    // sem backend: guardamos a mensagem no localStorage
    const mensagens = JSON.parse(localStorage.getItem('mensagens') ?? '[]');
    mensagens.push({ ...campos, data: new Date().toLocaleString('pt-BR') });
    localStorage.setItem('mensagens', JSON.stringify(mensagens));

    setCampos(camposVazios);
    setEnviado(true);
  }

  if (enviado) {
    return (
      <div className="sucesso">
        <h3>Mensagem enviada!</h3>
        <p>Obrigado pelo contato, responderemos em breve.</p>
        <button className="btn" onClick={() => setEnviado(false)}>Enviar outra</button>
      </div>
    );
  }

  return (
    <form ref={formRef} className="formulario" onSubmit={handleSubmit}>
      <label>
        Nome
        <input name="nome" value={campos.nome} onChange={handleChange} />
        {erros.nome && <span className="erro">{erros.nome}</span>}
      </label>

      <label>
        E-mail
        <input name="email" value={campos.email} onChange={handleChange} />
        {erros.email && <span className="erro">{erros.email}</span>}
      </label>

      <label>
        Assunto
        <select name="assunto" value={campos.assunto} onChange={handleChange}>
          <option value="">Selecione</option>
          <option value="sugestao">Sugestão</option>
          <option value="erro">Achei um erro</option>
          <option value="outro">Outro</option>
        </select>
        {erros.assunto && <span className="erro">{erros.assunto}</span>}
      </label>

      <label>
        Mensagem
        <textarea name="mensagem" rows={5} value={campos.mensagem} onChange={handleChange} />
        {erros.mensagem && <span className="erro">{erros.mensagem}</span>}
      </label>

      <button type="submit" className="btn">Enviar</button>
    </form>
  );
}

export default ContactForm;
