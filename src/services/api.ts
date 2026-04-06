import { Consumidor } from '../types';

const API_URL = 'http://:8080/consumidores';

export const apiService = {
  // Login - busca consumidor por email e senha
  async login(email: string, senha: string): Promise<Consumidor> {
    try {
      // Busca todos os consumidores e filtra pelo email
      // Nota: Para produção, criar um endpoint de login específico no backend
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Erro ao conectar com a API');
      
      const consumidores: Consumidor[] = await response.json();
      const consumidor = consumidores.find(
        (c) => c.email === email && c.senha === senha
      );
      
      if (!consumidor) {
        throw new Error('Email ou senha incorretos');
      }
      
      return consumidor;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Erro ao fazer login'
      );
    }
  },

  // Cadastro - cria novo consumidor
  async cadastro(consumidor: Omit<Consumidor, 'id'>): Promise<Consumidor> {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consumidor),
      });

      if (!response.ok) throw new Error('Erro ao criar conta');
      
      return await response.json();
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
      
      return await response.json();
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Erro ao buscar consumidor'
      );
    }
  },

  // Atualizar consumidor
  async atualizar(id: number, consumidor: Consumidor): Promise<Consumidor> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consumidor),
      });

      if (!response.ok) throw new Error('Erro ao atualizar conta');
      
      return await response.json();
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
