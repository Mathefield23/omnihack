import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogDescription, DialogBody, DialogActions } from '../catalyst/dialog';
import { Field, Label } from '../catalyst/fieldset';
import { Input } from '../catalyst/input';
import { Button } from '../catalyst/button';
import { supabase } from '../lib/supabase';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (!data.user) {
        throw new Error('Usuário não encontrado');
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      if (!profile) {
        throw new Error('Perfil não encontrado');
      }

      if (profile.user_type === 'desenvolvedor') {
        navigate(`/desenvolvedor/${data.user.id}`);
      } else if (profile.user_type === 'empresa') {
        navigate(`/empresa/${data.user.id}`);
      }

      onClose();
      setEmail('');
      setPassword('');
    } catch (err: any) {
      console.error('Login error:', err);

      let errorMessage = 'Erro ao fazer login. Tente novamente.';

      if (err.message?.includes('Invalid login credentials')) {
        errorMessage = 'Email ou senha incorretos.';
      } else if (err.message?.includes('Email not confirmed')) {
        errorMessage = 'Por favor, confirme seu email antes de fazer login.';
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} size="md">
      <DialogTitle>Entrar</DialogTitle>
      <DialogDescription>Acesse sua conta OmniHack</DialogDescription>
      <DialogBody>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              disabled={loading}
            />
          </Field>

          <Field>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
              disabled={loading}
            />
          </Field>

          <DialogActions>
            <Button plain onClick={onClose} type="button" disabled={loading}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              color="omnihack-primary"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </DialogActions>

        </form>
        <div className="text-center pt-4 text-sm">
          <p className="text-zinc-500">
            Não tem conta?{' '}
            <a
              href="/cadastro"
              className="text-omnihack-primary hover:text-omnihack-accent font-semibold transition-colors"
              onClick={onClose}
            >
              Cadastre-se
            </a>
          </p>
        </div>
      </DialogBody>
    </Dialog>
  );
};
