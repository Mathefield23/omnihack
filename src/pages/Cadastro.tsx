import React from 'react';
import { SignupForm } from '../components/SignupForm';
import { Code2 } from 'lucide-react';

export const Cadastro: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-omnihack-light via-white to-omnihack-light flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2 text-omnihack-primary hover:text-omnihack-accent transition-colors mb-6">
            <Code2 className="w-8 h-8" />
            <span className="text-2xl font-bold">OmniHack</span>
          </a>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Criar conta na OmniHack
          </h1>
          <p className="text-lg text-gray-600">
            Escolha seu tipo de perfil e comece agora
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <SignupForm />
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Ao criar uma conta, você concorda com nossos{' '}
          <a href="#" className="text-omnihack-primary hover:underline">
            Termos de Uso
          </a>{' '}
          e{' '}
          <a href="#" className="text-omnihack-primary hover:underline">
            Política de Privacidade
          </a>
        </p>
      </div>
    </div>
  );
};
