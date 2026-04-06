import { Consumidor } from '../types';

const API_URL = 'http://localhost:8080/consumidores';

export const consumidorApi = {
  async login(email: string, senha: string): Promise<Consumidor> {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Erro ao conectar');
      
      const consumidores: Consumidor[] = await response.json();
      
      const consumidor = consumidores.find(
        (c) => c.email === email && c.senha === senha
      );
      
      if (!consumidor) {
        throw new Error('Email ou senha incorretos');
      }
      
      return { ...consumidor, tipo: 'consumidor' };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Erro ao fazer login'
      );
    }
  },

  // Cadastro - cria novo consumidor
  async cadastro(data: {
    nome: string;
    email: string;
    senha: string;
    cpf?: string;
    celular?: string;
  }): Promise<Consumidor> {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Erro ao criar conta');
      
      const novoConsumidor = await response.json();
      return { ...novoConsumidor, tipo: 'consumidor' };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Erro ao cadastrar'
      );
    }
  },

  // Buscar consumidor por ID
  async buscarPorId(id: number): Promise<Consumidor> {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error('Consumidor não encontrado');
      
      const consumidor = await response.json();
      return { ...consumidor, tipo: 'consumidor' };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Erro ao buscar consumidor'
      );
    }
  },

  // Atualizar consumidor
  async atualizar(id: number, consumidor: Omit<Consumidor, 'tipo'>): Promise<Consumidor> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consumidor),
      });

      if (!response.ok) throw new Error('Erro ao atualizar conta');
      
      const consumidorAtualizado = await response.json();
      return { ...consumidorAtualizado, tipo: 'consumidor' };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Erro ao atualizar'
      );
    }
  },

  // Deletar consumidor
  async deletar(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao deletar conta');
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Erro ao deletar'
      );
    }
  },
};
