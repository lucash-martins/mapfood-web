import { Comerciante } from '../types';

const API_URL = 'http://localhost:8080/comerciantes';

export const comercianteApi = {
  // Listar todos os comerciantes
  async listar(): Promise<Comerciante[]> {
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
      
      const comerciantes: Comerciante[] = await response.json();
      return comerciantes;
    } catch (error) {
      console.error('Erro completo em listar:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Erro ao listar comerciantes'
      );
    }
  },

  // Login - autentica comerciante sem endpoint /login
  async login(email: string, senha: string): Promise<Comerciante> {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Erro ao conectar');
      
      const comerciantes: Comerciante[] = await response.json();
      
      // Filtra no frontend
      const comerciante = comerciantes.find(
        (c) => c.email === email && c.senha === senha
      );
      
      if (!comerciante) {
        throw new Error('Email ou senha incorretos');
      }
      
      return { ...comerciante, tipo: 'comerciante' };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Erro ao fazer login'
      );
    }
  },

  // Cadastro - cria novo comerciante
  async cadastro(data: {
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    celular: string;
    telefone: string;
    cnpj: string;
  }): Promise<Comerciante> {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Erro ao criar conta');
      
      const novoComerciante = await response.json();
      return { ...novoComerciante, tipo: 'comerciante' };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Erro ao cadastrar'
      );
    }
  },

  // Buscar comerciante por ID
  async buscarPorId(id: number): Promise<Comerciante> {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error('Comerciante não encontrado');
      
      const comerciante = await response.json();
      return { ...comerciante, tipo: 'comerciante' };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Erro ao buscar comerciante'
      );
    }
  },

  // Atualizar comerciante
  async atualizar(id: number, comerciante: Omit<Comerciante, 'tipo'>): Promise<Comerciante> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comerciante),
      });

      if (!response.ok) throw new Error('Erro ao atualizar conta');
      
      const comercianteAtualizado = await response.json();
      return { ...comercianteAtualizado, tipo: 'comerciante' };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Erro ao atualizar'
      );
    }
  },

  // Deletar comerciante
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
