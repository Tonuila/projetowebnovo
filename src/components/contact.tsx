import React, { useState } from 'react';

// Define um componente funcional chamado `Contato`
export default function Contato() {
  // Estados para armazenar o e-mail, o conteúdo da mensagem, mensagens de erro, sucesso e o estado de carregamento
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Função chamada ao enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário de recarregar a página

    // Validação simples do campo de e-mail
    if (!validateEmail(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    // Verifica se o conteúdo foi preenchido
    if (!content) {
      setError('Por favor, insira uma mensagem.');
      return;
    }

    // Reseta os estados de erro e sucesso, e ativa o estado de carregamento
    setError('');
    setLoading(true);
    setSuccessMessage('');

    try {
      // Envia uma requisição POST para o endpoint `/api/function-1`
      const response = await fetch('/api/function-1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
          'Authorization': 'Bearer ya29... (token)', // Adiciona um token de autorização no cabeçalho
        },
        body: JSON.stringify({ toMail: email, content }), // Corpo da requisição com os dados do e-mail e conteúdo
      });

      // Verifica se a requisição foi bem-sucedida
      if (response.ok) {
        setSuccessMessage('E-mail enviado com sucesso!'); // Exibe mensagem de sucesso
        setEmail(''); // Reseta o campo de e-mail
        setContent(''); // Reseta o campo de conteúdo
      } else {
        const errorData = await response.json(); // Obtém detalhes do erro retornado pela API
        setError(`Erro ao enviar e-mail: ${errorData.message || response.statusText}`); // Exibe a mensagem de erro
      }
    } catch (err) {
      // Trata erros de conexão ou outros problemas inesperados
      console.error('Erro ao enviar e-mail:', err);
      setError('Erro ao enviar e-mail. Tente novamente mais tarde.');
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  // Função para validar o formato do e-mail usando uma expressão regular
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // RegEx para validação de e-mails
    return regex.test(email);
  };

  // Renderiza o formulário de contato
  return (
    <section id="contact" className="contact-form">
      <div className="container">
        <h2>Entre em Contato</h2>
        <form onSubmit={handleSubmit}>
          {/* Campo de entrada para o e-mail */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email} // Estado controlado para o campo de e-mail
              onChange={(e) => setEmail(e.target.value)} // Atualiza o estado ao digitar
              required
              placeholder="Seu email"
            />
          </div>
          {/* Campo de texto para o motivo do contato */}
          <div className="form-group">
            <label htmlFor="content">Motivo do Contato</label>
            <textarea
              id="content"
              name="content"
              value={content} // Estado controlado para o campo de texto
              onChange={(e) => setContent(e.target.value)} // Atualiza o estado ao digitar
              required
              placeholder="Escreva o motivo do seu contato"
            ></textarea>
          </div>
          {/* Botão de envio, que desativa quando `loading` é true */}
          <button type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar'} {/* Texto alternado baseado no estado de carregamento */}
          </button>
          {/* Mensagem de erro, se houver */}
          {error && <p className="error-message">{error}</p>}
          {/* Mensagem de sucesso, se houver */}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
      </div>
    </section>
  );
}
/*Explicação geral:
Estados (useState): Gerencia os valores dos campos, mensagens de erro, sucesso e carregamento.
Validação: Garante que o e-mail seja válido e que o campo de conteúdo não esteja vazio.
Requisição assíncrona: Envia os dados para o backend usando fetch e trata as respostas ou erros.
Formulário controlado: Os campos do formulário têm seus valores gerenciados por estados React.
Mensagens dinâmicas: Exibe mensagens de erro ou sucesso com base no estado atual.
*/