import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CreateHackathonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  empresaId: string;
}

export const CreateHackathonModal: React.FC<CreateHackathonModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  empresaId,
}) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [premio, setPremio] = useState('');
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nome.trim() || !descricao.trim() || !premio || !data) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    const premioNumerico = parseFloat(premio);
    if (isNaN(premioNumerico) || premioNumerico <= 0) {
      setError('O prêmio deve ser um valor positivo');
      return;
    }

    setLoading(true);

    try {
      const { error: insertError } = await supabase.from('hackathons').insert({
        empresa_id: empresaId,
        nome: nome.trim(),
        descricao: descricao.trim(),
        premio: premioNumerico,
        data,
      });

      if (insertError) throw insertError;

      setNome('');
      setDescricao('');
      setPremio('');
      setData('');
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Error creating hackathon:', err);
      setError(err.message || 'Erro ao criar hackathon. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setNome('');
      setDescricao('');
      setPremio('');
      setData('');
      setError('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          disabled={loading}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Cadastrar Novo Hackathon
          </h2>
          <p className="text-gray-600">
            Preencha os dados para criar um novo hackathon
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nome do Hackathon
            </label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Hackathon de Inovação 2024"
              required
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-omnihack-primary focus:border-omnihack-primary transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label
              htmlFor="descricao"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Descrição
            </label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva os objetivos e temas do hackathon..."
              required
              disabled={loading}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-omnihack-primary focus:border-omnihack-primary transition-all outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label
              htmlFor="premio"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Prêmio (R$)
            </label>
            <input
              id="premio"
              type="number"
              min="0"
              step="0.01"
              value={premio}
              onChange={(e) => setPremio(e.target.value)}
              placeholder="10000"
              required
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-omnihack-primary focus:border-omnihack-primary transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label
              htmlFor="data"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Data do Evento
            </label>
            <input
              id="data"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-omnihack-primary focus:border-omnihack-primary transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-omnihack-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-omnihack-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Criando...
                </>
              ) : (
                'Criar Hackathon'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
