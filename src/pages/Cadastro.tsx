import React from 'react';
import { SignupForm } from '../components/SignupForm';
import { Code2 } from 'lucide-react';
import { Heading } from '../catalyst/heading';
import { Text } from '../catalyst/text';

export const Cadastro: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-omnihack-light via-white to-omnihack-light flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2 text-omnihack-primary hover:text-omnihack-accent transition-colors mb-6">
            <Code2 className="w-8 h-8" />
            <span className="text-2xl font-bold">OmniHack</span>
          </a>
          <Heading level={1} className="text-4xl/tight mb-3">
            Criar conta na OmniHack
          </Heading>
          <Text className="text-lg">
            Escolha seu tipo de perfil e comece agora
          </Text>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <SignupForm />
        </div>

        <Text className="text-center text-sm mt-6">
          Ao criar uma conta, você concorda com nossos{' '}
          <a href="#" className="text-omnihack-primary hover:underline font-medium">
            Termos de Uso
          </a>{' '}
          e{' '}
          <a href="#" className="text-omnihack-primary hover:underline font-medium">
            Política de Privacidade
          </a>
        </Text>
      </div>
    </div>
  );
};
