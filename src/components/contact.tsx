import React, { useState } from 'react';

export default function Contato() {
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    if (!content) {
      setError('Por favor, insira uma mensagem.');
      return;
    }

    setError('');
    setLoading(true);
    setSuccessMessage('');

    try {
      const response = await fetch('/api/function-1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ya29.a0AeDClZBdQcwX341XPHp-LjfP8TbOmxaS-iPuEHRAxy8rQ9U2GRJQIWiq7x-jKANOsNPcCFMHyplYKtDy6eE6Dj2stW3buNyDBFRZHT6HD05LV1rM5cZr8SKoZLufGpkGvmT_wAH9cfoNJXolNqOanHKm4Jy_twLwrBzhqit1CZnwiMFLh23lQqxbkbLyfirqEg-Sw0az1DGLivxi7x1BdrS0eDPqiwof0z77UwXeB4oxBHVPn78XcghfLpfngc-4L9Z4OBVtYzMuCM0sDILX5K7AAIOBFt54ykk7qOJBxz1-OdDQUNvRoLonCwnhdA99iCsCbFSLfRMPXNuk7fOmxK0Qlphb3b2jlCOcAc6Wq0zUWt3HB0wKlmS3LUX7CpO4le0_ARqsM-PAD--PYeGdCdp3dsF5DKUIhlMaCgYKAeYSARISFQHGX2MiAaka8gkZR2ZqIq7Mv9BV4g0426',
        },
        body: JSON.stringify({ toMail: email, content }),
      });

      if (response.ok) {
        setSuccessMessage('E-mail enviado com sucesso!');
        setEmail('');
        setContent('');
      } else {
        const errorData = await response.json();
        setError(`Erro ao enviar e-mail: ${errorData.message || response.statusText}`);
      }
    } catch (err) {
      console.error('Erro ao enviar e-mail:', err);
      setError('Erro ao enviar e-mail. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <section id="contact" className="contact-form">
      <div className="container">
        <h2>Entre em Contato</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Seu email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Motivo do Contato</label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Escreva o motivo do seu contato"
            ></textarea>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
      </div>
    </section>
  );
}
