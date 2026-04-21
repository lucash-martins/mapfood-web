import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loja, StatusLoja } from '../types';
import { lojaApi } from '../services/lojaApi';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';
import { Trash2, Edit, Plus, Store, FileText, CheckCircle, Calendar, ArrowLeft } from 'lucide-react';

export function AdminLojas() {
  const navigate = useNavigate();
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingLoja, setEditingLoja] = useState<Loja | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<StatusLoja | 'TODAS'>('TODAS');
  const [lojaToDelete, setLojaToDelete] = useState<Loja | null>(null);

  const [formData, setFormData] = useState<Omit<Loja, 'id' | 'dataCadastro'>>({
    nome: '',
    email: '',
    telefone: '',
    cnpj: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    descricao: '',
    statusLoja: StatusLoja.ATIVA,
  });

  // Carregar lojas
  useEffect(() => {
    carregarLojas();
  }, []);

  const carregarLojas = async () => {
    try {
      setLoading(true);
      setErro(null);
      const dataLojas = await lojaApi.listar();
      setLojas(dataLojas);
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro ao carregar lojas');
    } finally {
      setLoading(false);
    }
  };

  // Filtrar lojas
  const lojasFiltradas = lojas.filter((loja) => {
    const matchSearch = loja.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = selectedStatus === 'TODAS' || loja.statusLoja === selectedStatus;
    return matchSearch && matchStatus;
  });

  // Abrir diálogo para criar
  const handleNovaLoja = () => {
    setEditingLoja(null);
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      cnpj: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
      descricao: '',
      statusLoja: StatusLoja.ATIVA,
    });
    setIsDialogOpen(true);
  };

  // Abrir diálogo para editar
  const handleEditar = (loja: Loja) => {
    setEditingLoja(loja);
    setFormData({
      nome: loja.nome,
      email: loja.email,
      telefone: loja.telefone,
      cnpj: loja.cnpj,
      endereco: loja.endereco,
      cidade: loja.cidade,
      estado: loja.estado,
      cep: loja.cep,
      descricao: loja.descricao,
      statusLoja: loja.statusLoja || StatusLoja.ATIVA,
    });
    setIsDialogOpen(true);
  };

  // Salvar loja
  const handleSalvar = async () => {
    try {
      if (!formData.nome) {
        setErro('Preencha o nome da loja');
        return;
      }

      setLoading(true);
      setErro(null);

      if (editingLoja?.id) {
        // Atualizar
        const lojaAtualizada = await lojaApi.atualizar(editingLoja.id, formData);
        setLojas(lojas.map((l) => (l.id === editingLoja.id ? lojaAtualizada : l)));
      } else {
        // Criar
        const comercianteId = localStorage.getItem('userId');
        const novaLoja = await lojaApi.criar(formData, comercianteId ? parseInt(comercianteId) : undefined);
        setLojas([...lojas, novaLoja]);
      }

      setIsDialogOpen(false);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        cnpj: '',
        endereco: '',
        cidade: '',
        estado: '',
        cep: '',
        descricao: '',
        statusLoja: StatusLoja.ATIVA,
      });
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro ao salvar loja');
    } finally {
      setLoading(false);
    }
  };

  // Abrir diálogo de deleção
  const handleConfirmarDelecao = (loja: Loja) => {
    setLojaToDelete(loja);
    setIsDeleteOpen(true);
  };

  // Deletar loja
  const handleDeletar = async () => {
    if (!lojaToDelete?.id) return;

    try {
      setLoading(true);
      setErro(null);
      await lojaApi.deletar(lojaToDelete.id);
      setLojas(lojas.filter((l) => l.id !== lojaToDelete.id));
      setIsDeleteOpen(false);
      setLojaToDelete(null);
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro ao deletar loja');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status?: StatusLoja) => {
    switch (status) {
      case StatusLoja.ATIVA:
        return 'bg-green-500';
      case StatusLoja.INATIVA:
        return 'bg-gray-500';
      case StatusLoja.SUSPENSA:
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="w-full h-full p-6 bg-background">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
              className="h-10 w-10 p-0 hover:bg-white"
              title="Voltar"
            >
              <ArrowLeft size={18} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <Store size={32} className="text-red-600" />
                Gerenciar Lojas
              </h1>
              <p className="text-gray-600 text-sm mt-1">Administre todas as lojas cadastradas</p>
            </div>
          </div>
          <Button 
            onClick={handleNovaLoja} 
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white"
          >
            <Plus size={18} />
            Nova Loja
          </Button>
        </div>

        {/* Filtros */}
        <div className="flex gap-3 flex-wrap bg-white p-4 rounded-lg border">
          <Input
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 h-10 text-sm"
          />
          <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as StatusLoja | 'TODAS')}>
            <SelectTrigger className="w-40 h-10 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODAS">Todos os Status</SelectItem>
              <SelectItem value={StatusLoja.ATIVA}>Ativa</SelectItem>
              <SelectItem value={StatusLoja.INATIVA}>Inativa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Erro */}
        {erro && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium">
            {erro}
          </div>
        )}

        {/* Tabela */}
        <div className="border rounded-lg overflow-hidden bg-white">
          {loading && lojas.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Carregando lojas...
            </div>
          ) : lojasFiltradas.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Store size={32} className="mx-auto mb-2 opacity-50" />
              Nenhuma loja encontrada
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-gray-700 font-semibold">Nome</TableHead>
                  <TableHead className="text-gray-700 font-semibold">Descrição</TableHead>
                  <TableHead className="text-gray-700 font-semibold">Status</TableHead>
                  <TableHead className="text-right text-gray-700 font-semibold">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lojasFiltradas.map((loja) => (
                  <TableRow key={loja.id} className="hover:bg-gray-50 border-b">
                    <TableCell className="font-semibold text-gray-800">{loja.nome}</TableCell>
                    <TableCell className="text-gray-600 text-sm max-w-xs truncate">{loja.descricao}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(loja.statusLoja)}>
                        {loja.statusLoja || StatusLoja.ATIVA}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditar(loja)}
                          disabled={loading}
                          className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleConfirmarDelecao(loja)}
                          disabled={loading}
                          className="h-8 w-8 p-0 hover:bg-red-100"
                          title="Deletar"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Contador de registros */}
        {lojasFiltradas.length > 0 && (
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="text-sm text-gray-700">
              Mostrando <span className="font-semibold text-blue-600">{lojasFiltradas.length}</span> de <span className="font-semibold">{lojas.length}</span> loja(s)
            </div>
          </div>
        )}
      </div>

      {/* Diálogo de Criar/Editar */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Store size={24} className="text-red-600" />
              {editingLoja ? 'Editar Loja' : 'Criar Nova Loja'}
            </DialogTitle>
            <DialogDescription>
              {editingLoja ? 'Atualize as informações da loja' : 'Preencha os dados da nova loja'}
            </DialogDescription>
          </DialogHeader>

          {erro && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {erro}
            </div>
          )}

          <div className="space-y-4 py-2">
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-sm font-semibold text-gray-700">
                Nome da Loja *
              </Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                placeholder="Digite o nome da loja"
                disabled={loading}
                className="h-10 text-sm"
              />
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <Label htmlFor="descricao" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText size={16} />
                Descrição
              </Label>
              <textarea
                id="descricao"
                value={formData.descricao || ''}
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
                placeholder="Descreva sua loja, produtos e diferenciais..."
                disabled={loading}
                className="w-full p-2.5 text-sm border border-input rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                rows={4}
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <CheckCircle size={16} />
                Status
              </Label>
              <Select
                value={formData.statusLoja}
                onValueChange={(value) =>
                  setFormData({ ...formData, statusLoja: value as StatusLoja })
                }
                disabled={loading}
              >
                <SelectTrigger className="h-10 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={StatusLoja.ATIVA}>Ativa</SelectItem>
                  <SelectItem value={StatusLoja.INATIVA}>Inativa</SelectItem>
                  {editingLoja && (
                    <SelectItem value={StatusLoja.SUSPENSA}>Suspensa</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {editingLoja && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-center gap-2 text-sm text-gray-700">
                <Calendar size={16} className="text-blue-600" />
                <span>Cadastrada em: <span className="font-semibold">{editingLoja.dataCadastro ? new Date(editingLoja.dataCadastro).toLocaleDateString('pt-BR') : 'Data não disponível'}</span></span>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={loading}
              className="text-sm"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSalvar} 
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white text-sm"
            >
              {loading ? 'Salvando...' : editingLoja ? 'Atualizar' : 'Criar Loja'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Confirmação de Deleção */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg flex items-center gap-2">
              <Trash2 size={20} className="text-red-600" />
              Deletar Loja
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm pt-2">
              Tem certeza que deseja deletar a loja <span className="font-semibold text-gray-800">"{lojaToDelete?.nome}"</span>?
              <br />
              <span className="text-red-600 font-medium">Esta ação não pode ser desfeita.</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2 pt-4">
            <AlertDialogCancel disabled={loading} className="text-sm">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletar}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white text-sm"
            >
              {loading ? 'Deletando...' : 'Deletar'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
