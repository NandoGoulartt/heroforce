import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../api/auth';
import { AuthCard } from '../../components/auth-card';

const inputClass =
  'w-full rounded-xl border border-slate-500/25 bg-hero-elevated/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-amber-500/45 focus:ring-2 focus:ring-amber-500/15';

const labelClass = 'mb-2 block text-sm font-medium text-slate-300';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [character, setCharacter] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Informe seu nome');
      return;
    }

    if (!email.trim()) {
      setError('Informe seu email');
      return;
    }

    if (!character.trim()) {
      setError('Escolha seu personagem');
      return;
    }

    if (!password.trim()) {
      setError('Informe sua senha');
      return;
    }

    try {
      setIsSubmitting(true);

      await register({
        name: name.trim(),
        email: email.trim(),
        character: character.trim(),
        password,
      });

      navigate('/login');
    } catch {
      setError('Não foi possível realizar o cadastro');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthCard
      title="Cadastro de herói"
      description="Crie sua conta para acessar a HeroForce."
      backHref="/"
    >
      {error ? (
        <div className="mb-4 rounded-xl border border-red-500/25 bg-red-950/40 p-4 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>
            Nome
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Luiz Fernando"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@email.com"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Personagem
          </label>
          <input
            type="text"
            value={character}
            onChange={(e) => setCharacter(e.target.value)}
            placeholder="Ex: vigilante urbano, velocista, arqueiro..."
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Senha
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_24px_-4px_rgba(245,158,11,0.45)] transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Cadastrando...' : 'Criar conta'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Já tem conta?{' '}
        <Link
          to="/login"
          className="font-medium text-amber-400 transition hover:text-amber-300"
        >
          Fazer login
        </Link>
      </p>
    </AuthCard>
  );
}
