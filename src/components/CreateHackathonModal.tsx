import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogTitle, DialogDescription, DialogBody, DialogActions } from '../catalyst/dialog';
import { Field, Label } from '../catalyst/fieldset';
import { Input } from '../catalyst/input';
import { Button } from '../catalyst/button';
import { supabase } from '../lib/supabase';

interface Hackathon {
  id: string;
  nome: string;
  descricao: string;
  premio: number;
  data: string;
}

interface CreateHackathonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  empresaId: string;
  editingHackathon?: Hackathon | null;
}

export const CreateHackathonModal: React.FC<CreateHackathonModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  empresaId,
  editingHackathon,
}) => {
  const [nome, setNome] = useState(editingHackathon?.nome || '');
  const [descricao, setDescricao] = useState(editingHackathon?.descricao || '');
  const [premio, setPremio] = useState(editingHackathon?.premio.toString() || '');
  const [data, setData] = useState(editingHackathon?.data || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (editingHackathon) {
      setNome(editingHackathon.nome);
      setDescricao(editingHackathon.descricao);
      setPremio(editingHackathon.premio.toString());
      setData(editingHackathon.data);
    } else {
      setNome('');
      setDescricao('');
      setPremio('');
      setData('');
    }
    setError('');
  }, [editingHackathon, isOpen]);

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
      if (editingHackathon) {
        const { error: updateError } = await supabase
          .from('hackathons')
          .update({
            nome: nome.trim(),
            descricao: descricao.trim(),
            premio: premioNumerico,
            data,
          })
          .eq('id', editingHackathon.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from('hackathons').insert({
          empresa_id: empresaId,
          nome: nome.trim(),
          descricao: descricao.trim(),
          premio: premioNumerico,
          data,
        });

        if (insertError) throw insertError;
      }

      setNome('');
      setDescricao('');
      setPremio('');
      setData('');
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Error saving hackathon:', err);
      setError(err.message || `Erro ao ${editingHackathon ? 'atualizar' : 'criar'} hackathon. Tente novamente.`);
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

  return (
    <Dialog open={isOpen} onClose={handleClose} size="2xl">
      <DialogTitle>
        {editingHackathon ? 'Editar Hackathon' : 'Cadastrar Novo Hackathon'}
      </DialogTitle>
      <DialogDescription>
        {editingHackathon
          ? 'Atualize os dados do hackathon'
          : 'Preencha os dados para criar um novo hackathon'}
      </DialogDescription>
      <DialogBody>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <Field>
            <Label htmlFor="nome">Nome do Hackathon</Label>
            <Input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Hackathon de Inovação 2024"
              required
              disabled={loading}
            />
          </Field>

          <Field>
            <Label htmlFor="descricao">Descrição</Label>
            <span data-slot="control" className="relative block w-full before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-white before:shadow after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent sm:after:focus-within:ring-2 sm:after:focus-within:ring-omnihack-primary">
              <textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva os objetivos e temas do hackathon..."
                required
                disabled={loading}
                rows={4}
                className="relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 border border-zinc-950/10 hover:border-zinc-950/20 bg-transparent focus:outline-none resize-none disabled:opacity-50"
              />
            </span>
          </Field>

          <Field>
            <Label htmlFor="premio">Prêmio (R$)</Label>
            <Input
              id="premio"
              type="number"
              min="0"
              step="0.01"
              value={premio}
              onChange={(e) => setPremio(e.target.value)}
              placeholder="10000"
              required
              disabled={loading}
            />
          </Field>

          <Field>
            <Label htmlFor="data">Data do Evento</Label>
            <Input
              id="data"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
              disabled={loading}
            />
          </Field>

          <DialogActions>
            <Button
              type="button"
              onClick={handleClose}
              disabled={loading}
              plain
            >
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
                  {editingHackathon ? 'Atualizando...' : 'Criando...'}
                </>
              ) : (
                editingHackathon ? 'Atualizar Hackathon' : 'Criar Hackathon'
              )}
            </Button>
          </DialogActions>
        </form>
      </DialogBody>
    </Dialog>
  );
};
