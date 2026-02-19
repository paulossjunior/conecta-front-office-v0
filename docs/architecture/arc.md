# Arquitetura do Frontend: Portal do Coordenador

Este documento descreve a arquitetura do frontend do projeto, construído com **Vue 3**, **TypeScript**, **Vite** e **Nuxt UI**. O projeto segue princípios de **Clean Architecture** e **Domain-Driven Design (DDD)** para garantir escalabilidade, manutenibilidade e testabilidade.

## 1. Visão Geral Tecnológica

-   **Core**: Vue 3 (Composition API, `<script setup>`)
-   **Build Tool**: Vite
-   **Linguagem**: TypeScript (Strict Mode)
-   **UI Framework**: Nuxt UI (Tailwind CSS)
-   **State Management**: Pinia
-   **Data Fetching**: Vue Query (TanStack Query)
-   **Routing**: Vue Router
-   **Validation**: Zod + Vee-Validate
-   **Tests**: Vitest (Unit) & Cypress (E2E)

## 2. Estrutura de Diretórios (Modular)

O projeto adota uma estrutura modular baseada em domínios, localizada em `src/modules`. Diferente de estruturas tradicionais que agrupam por tipo de arquivo (`views`, `components`), aqui agrupamos por **funcionalidade**.

```
src/
├── api/                # Camada de Infraestrutura (HTTP Adapters & Providers)
├── components/         # Componentes Globais / Compartilhados (UI Kit base)
├── composables/        # Lógica Reutilizável Global
├── modules/            # Módulos de Funcionalidade (Core do App)
│   ├── autenticacao/   # Ex: Módulo de Autenticação
│   ├── PortalBolsista/ # Ex: Módulo do Bolsista
│   └── PortalCoordenador/
│       ├── api/        # Definições de API específicas do módulo
│       ├── components/ # Componentes exclusivos deste módulo
│       ├── routes/     # Rotas internas do módulo
│       └── views/      # Páginas do módulo
├── store/              # Stores Globais (Pinia)
└── utils/              # Funções utilitárias puras
```

## 3. Padrões de Projeto e Arquitetura

### 3.1. Camada de API (Adapter & Provider Pattern)

Para desacoplar a aplicação da biblioteca HTTP (Axios), utilizamos os padrões **Adapter** e **Provider** em `src/api`.

-   **`HttpClientInterface`**: Define o contrato que qualquer cliente HTTP deve seguir.
-   **`AxiosHttpClient` (Adapter)**: Implementa a interface usando Axios.
-   **`ApiProvider` (Provider)**: Singleton responsável por instanciar e fornecer o cliente HTTP correto (Real ou Mock) para a aplicação.

**Benefício**: Facilita a substituição da biblioteca HTTP e permite injeção de dependência simplificada para testes (Mocking).

### 3.2. Gerenciamento de Estado

-   **Pinia**: Utilizado para estados globais que precisam ser acessados por múltiplos módulos (ex: `UserStore`, `SidebarStore`).
-   **Composables**: Utilizados para encasular lógica de estado local complexa ou lógica compartilhada sem persistência global.
-   **Server State (Vue Query)**: O estado vindo do servidor (cache de requisições) é gerenciado pelo **Vue Query**, evitando a poluição da Store com dados transientes.

### 3.3. Roteamento Descentralizado

O arquivo `src/modules/routes.ts` atua como um agregador. Cada módulo define suas próprias rotas internamente. Isso permite que módulos sejam removidos ou adicionados sem alterar profundamente o roteador principal.

## 4. Boas Práticas e Anti-Padrões

### ✅ Boas Práticas (Adotadas)
-   **Injeção de Dependência**: Uso do `provide/inject` do Vue para serviços e configurações globais.
-   **Single Responsibility**: Componentes pequenos e focados.
-   **Validação de Schema**: Uso de **Zod** para validar dados de entrada (formulários) e saída (API responses).
-   **Tipagem Estrita**: Evitar `any` a todo custo; definir Interfaces/Types para todas as entidades.

### 🚫 Anti-Padrões (A Serem Evitados)
-   **Coupled API Calls**: *Nunca* importar o Axios diretamente dentro de um componente. Sempre use os serviços/hooks que consomem via `ApiProvider`.
-   **Logic in Templates**: Evitar expressões complexas no template (`v-if="a && b || c.length > 0"`). Extrair para `computed` properties.
-   **Prop Drilling**: Se um dado precisa descer mais de 2 níveis, considere usar `provide/inject` ou uma Store.
-   **God Objects**: Evitar componentes ou stores gigantes que fazem "de tudo". Quebre em sub-módulos.

## 5. Fluxo de Desenvolvimento

1.  **Criar Módulo**: Se for uma nova feature grande, crie uma pasta em `src/modules`.
2.  **Definir Entidade/Tipos**: Comece definindo as interfaces de dados.
3.  **Criar Service/Repository**: Implemente a chamada de API usando o `HttpClient`.
4.  **Criar Views/Components**: Desenvolva a UI consumindo os dados.
5.  **Testar**: Adicione testes unitários para a lógica e E2E para o fluxo crítico.
