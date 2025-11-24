import React, { useState } from 'react';
import { InputField } from './InputField';
import { Field, Label, ErrorMessage } from '../catalyst/fieldset';
import { Select } from '../catalyst/select';
import { Button } from '../catalyst/button';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: 'empresa' | 'desenvolvedor' | '';
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  userType?: string;
}

export const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nome completo é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Senha deve ter no mínimo 8 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    if (!formData.userType) {
      newErrors.userType = 'Selecione o tipo de usuário';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');

    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error('Erro ao criar usuário');
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          full_name: formData.fullName,
          user_type: formData.userType,
        });

      if (profileError) throw profileError;

      setSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: '',
      });
    } catch (error: any) {
      console.error('Signup error:', error);

      let errorMessage = 'Erro ao criar conta. Tente novamente.';

      if (error.message?.includes('User already registered') || error.message?.includes('already exists')) {
        errorMessage = 'Este email já está cadastrado. Tente fazer login ou use outro email.';
        setErrors((prev) => ({ ...prev, email: 'Email já cadastrado' }));
        document.getElementById('email')?.focus();
      } else if (error.message?.includes('Invalid email')) {
        errorMessage = 'Email inválido. Verifique o formato do email.';
        setErrors((prev) => ({ ...prev, email: 'Email inválido' }));
        document.getElementById('email')?.focus();
      } else if (error.message?.includes('Password')) {
        errorMessage = 'Senha inválida. A senha deve ter no mínimo 8 caracteres.';
        setErrors((prev) => ({ ...prev, password: 'Senha muito fraca' }));
        document.getElementById('password')?.focus();
      } else if (error.message) {
        errorMessage = error.message;
      }

      setGeneralError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setGeneralError('');
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Conta criada com sucesso!
        </h3>
        <p className="text-gray-600 mb-6">
          Verifique seu email para confirmar sua conta.
        </p>
        <a
          href="/"
          className="inline-block text-omnihack-primary hover:text-omnihack-accent transition-colors"
        >
          Voltar para o início
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {generalError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{generalError}</p>
        </div>
      )}

      <InputField
        id="fullName"
        name="fullName"
        type="text"
        label="Nome completo"
        value={formData.fullName}
        onChange={handleChange}
        error={errors.fullName}
        placeholder="Digite seu nome completo"
        disabled={loading}
      />

      <InputField
        id="email"
        name="email"
        type="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="seu@email.com"
        disabled={loading}
      />

      <InputField
        id="password"
        name="password"
        type="password"
        label="Senha"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Mínimo 8 caracteres"
        disabled={loading}
      />

      <InputField
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label="Confirmar senha"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        placeholder="Digite a senha novamente"
        disabled={loading}
      />

      <Field>
        <Label htmlFor="userType">Tipo de usuário</Label>
        <Select
          id="userType"
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          disabled={loading}
          data-invalid={errors.userType ? '' : undefined}
        >
          <option value="">Selecione uma opção</option>
          <option value="empresa">Empresa</option>
          <option value="desenvolvedor">Desenvolvedor</option>
        </Select>
        {errors.userType && <ErrorMessage>{errors.userType}</ErrorMessage>}
      </Field>

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
        color="omnihack-primary"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Criando conta...
          </>
        ) : (
          'Criar conta'
        )}
      </Button>

      <div className="text-center">
        <p className="text-gray-600">
          Já tem conta?{' '}
          <a
            href="/login"
            className="text-omnihack-primary hover:text-omnihack-accent font-semibold transition-colors"
          >
            Entrar
          </a>
        </p>
      </div>
    </form>
  );
};
