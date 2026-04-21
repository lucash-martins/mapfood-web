# Admin CRUD de Lojas - Guia de Integração

## Arquivos Criados

1. **`src/services/lojaApi.ts`** - Serviço de API para comunicação com o backend
2. **`src/pages/AdminLojas.tsx`** - Página completa de administração de lojas
3. **Tipos atualizados** - Adicionados tipos `Loja`, `StatusLoja` e `Categoria` em `src/types/index.ts`

## Funcionalidades

✅ **Listar Lojas** - Visualizar todas as lojas em uma tabela
✅ **Criar Loja** - Adicionar nova loja via formulário
✅ **Editar Loja** - Atualizar dados de loja existente
✅ **Deletar Loja** - Remover loja com confirmação
✅ **Buscar por Nome** - Filtrar lojas por nome
✅ **Filtrar por Status** - Visualizar lojas por status (Ativa, Inativa, Suspensa)
✅ **Validação** - Campos obrigatórios e tratamento de erros
✅ **Loading States** - Feedback visual durante operações

## Como Integrar no Projeto

### 1. Importar a página no `App.tsx`

```typescript
import { AdminLojas } from './pages/AdminLojas';
```

### 2. Adicionar uma rota (se estiver usando React Router)

```typescript
<Route path="/admin/lojas" element={<AdminLojas />} />
```

### 3. Adicionar link no menu/navegação

```typescript
<NavLink to="/admin/lojas">Gerenciar Lojas</NavLink>
```

## Estrutura dos Dados

### Loja

```typescript
interface Loja {
  id?: number;
  nome: string;              // Nome da loja (obrigatório)
  email: string;             // Email da loja (obrigatório)
  telefone: string;          // Telefone
  cnpj: string;              // CNPJ da loja (obrigatório)
  endereco: string;          // Endereço completo
  cidade: string;            // Cidade
  estado: string;            // UF (ex: SP, RJ)
  cep: string;               // CEP
  statusLoja?: StatusLoja;   // ATIVA | INATIVA | SUSPENSA
  categorias?: Categoria[];  // Categorias associadas
  dataCadastro?: string;     // Data de cadastro (gerada pelo backend)
}
```

### StatusLoja

```typescript
enum StatusLoja {
  ATIVA = 'ATIVA',
  INATIVA = 'INATIVA',
  SUSPENSA = 'SUSPENSA',
}
```

## Endpoints da API Esperados

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/lojas` | Listar todas as lojas |
| GET | `/lojas/{id}` | Buscar loja por ID |
| GET | `/lojas/nome?nome=` | Buscar loja por nome |
| GET | `/lojas/categoria/{id}` | Buscar lojas por categoria |
| GET | `/lojas/ativas` | Listar apenas lojas ativas |
| POST | `/lojas` | Criar nova loja |
| PUT | `/lojas/{id}` | Atualizar loja |
| DELETE | `/lojas/{id}` | Deletar loja |

## Componentes UI Utilizados

- `Button` - Botões de ação
- `Input` - Campos de texto
- `Label` - Labels de formulário
- `Dialog` - Modal para criar/editar
- `AlertDialog` - Modal de confirmação de deleção
- `Table` - Tabela de lojas
- `Badge` - Badge de status
- `Select` - Dropdown para seleção de status

Todos os componentes já existem em `src/components/ui/`

## Customizações Opcionais

### Adicionar máscara ao CNPJ

Importe a função de máscara do seu arquivo de utilitários:

```typescript
import { maskCNPJ } from '../lib/masks';

onChange={(e) => 
  setFormData({ ...formData, cnpj: maskCNPJ(e.target.value) })
}
```

### Validar CNPJ

Adicione validação de CNPJ antes de salvar:

```typescript
const isValidCNPJ = (cnpj: string) => {
  // Implementar validação de CNPJ
};
```

### Paginação

Para adicionar paginação, use a biblioteca `react-paginate` ou implemente manualmente com `useState`.

## Troubleshooting

### "Erro ao conectar no servidor"
- Confirme que a API está rodando em `http://localhost:8080`
- Verifique se os endpoints estão corretos

### "CORS error"
- Certifique-se que o backend tem `@CrossOrigin` configurado
- Verifique as configurações de CORS no backend

### Campos não salvando
- Verifique se todos os campos obrigatórios foram preenchidos
- Confirme que a estrutura de dados bate com a API

## Exemplo de Uso

```typescript
// App.tsx
import { AdminLojas } from './pages/AdminLojas';

function App() {
  return (
    <Routes>
      <Route path="/admin/lojas" element={<AdminLojas />} />
      {/* outras rotas */}
    </Routes>
  );
}
```

## Próximos Passos

1. ✅ Integrar a página no App.tsx
2. ✅ Testar CRUD completo
3. ⭐ Adicionar paginação se necessário
4. ⭐ Adicionar validações adicionais (CEP, CNPJ, email)
5. ⭐ Implementar filtro por data de cadastro
6. ⭐ Adicionar exportação (CSV, PDF)
