import { Loja } from '../types';

const API_URL = 'http://localhost:8080/lojas';

export const lojaApi = {
  // Listar todas as lojas
  async listar(): Promise<Loja[]> {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Erro na resposta:', response.status, text);
        throw new Error(`Erro ${response.status}: ${text.substring(0, 100)}`);
      }
      
      const lojas: Loja[] = await response.json();
      return lojas;
    } catch (error) {
      console.error('Erro completo em listar:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Erro ao listar lojas'
      );
    }
  },

  // Buscar loja por ID
  async buscarPorId(id: number): Promise<Loja> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Loja não encontrada');
      
      const loja: Loja = await response.json();
      return loja;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Erro ao buscar loja'
      );
    }
  },

  // Buscar lojas por nome
  async buscarPorNome(nome: string): Promise<Loja[]> {
    try {
      const response = await fetch(`${API_URL}/nome?nome=${encodeURIComponent(nome)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Erro ao buscar lojas');
      
      const lojas: Loja[] = await response.json();
      return lojas;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Erro ao buscar lojas'
      );
    }
  },

  // Buscar lojas por categoria
  async buscarPorCategoria(categoriaId: number): Promise<Loja[]> {
    try {
      const response = await fetch(`${API_URL}/categoria/${categoriaId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Erro ao buscar lojas');
      
      const lojas: Loja[] = await response.json();
      return lojas;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Erro ao buscar lojas'
      );
    }
  },

  // Lista lojas ativas
  async listarAtivas(): Promise<Loja[]> {
    try {
      const response = await fetch(`${API_URL}/ativas`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Erro ao listar lojas ativas');
      
      const lojas: Loja[] = await response.json();
      return lojas;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Erro ao listar lojas ativas'
      );
    }
  },

  // Criar nova loja
  async criar(loja: Omit<Loja, 'id' | 'dataCadastro'>, comercianteId?: number): Promise<Loja> {
    try {
      // Prepara dados para envio
      const dadosEnvio = {
        nome: loja.nome,
        email: loja.email,
        telefone: loja.telefone,
        cnpj: loja.cnpj,
        endereco: loja.endereco || '',
        cidade: loja.cidade || '',
        estado: loja.estado || '',
        cep: loja.cep || '',
        descricao: loja.descricao || '',
        statusLoja: loja.statusLoja || 'ATIVA',
        comerciante: {
          id_comerciante: comercianteId || 1,
        },
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosEnvio),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro ao criar loja:', errorText);
        throw new Error(`Erro ao criar loja: ${response.status}`);
      }
      
      const novaLoja: Loja = await response.json();
      return novaLoja;
    } catch (error) {
      console.error('Erro completo:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Erro ao criar loja'
      );
    }
  },

  // Atualizar loja
  async atualizar(id: number, loja: Omit<Loja, 'id' | 'dataCadastro'>): Promise<Loja> {
    try {
      // Prepara dados para envio
      const dadosEnvio = {
        nome: loja.nome,
        email: loja.email,
        telefone: loja.telefone,
        cnpj: loja.cnpj,
        endereco: loja.endereco || '',
        cidade: loja.cidade || '',
        estado: loja.estado || '',
        cep: loja.cep || '',
        descricao: loja.descricao || '',
        statusLoja: loja.statusLoja || 'ATIVA',
      };

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosEnvio),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro ao atualizar loja:', errorText);
        throw new Error(`Erro ao atualizar loja: ${response.status}`);
      }
      
      const lojaAtualizada: Loja = await response.json();
      return lojaAtualizada;
    } catch (error) {
      console.error('Erro completo:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Erro ao atualizar loja'
      );
    }
  },

  // Deletar loja
  async deletar(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Erro ao deletar loja');
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Erro ao deletar loja'
      );
    }
  },
};
