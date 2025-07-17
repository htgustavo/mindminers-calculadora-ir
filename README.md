
# 📊 Calculadora de Imposto de Renda para operações na bolsa - React Web App

Calculadora de Imposto de Renda sobre operações na bolsa de valores, desenvolvida com React.  
O sistema permite registrar operações de compra e venda de ações e calcula automaticamente o IR devido, conforme as regras da Receita Federal para operações comuns (não day trade).

---

## 📌 Funcionalidades

- ✅ Registro de operações: compra e venda de ações
- 📈 Cálculo automático de:
  - Preço médio (PM)
  - Resultado auferido (RA)
  - Prejuízo acumulado (PA)
  - IR devido (15% sobre o lucro descontando prejuízos anteriores)
- 📊 Resumo visual: cards com totais de IR, lucro, prejuízo e quantidade de operações
- 📋 Listagem das operações registradas com detalhes de cálculo

---

## 🧠 Regras de cálculo (simplificadas)

### 💰 Compra:
```
PM = (PM * QM + PC * QC + TC) / (QM + QC)
QM = QM + QC
```

### 💸 Venda:
```
RA = (PV - PM) * QV - TV
QM = QM - QV
```

### 📉 Prejuízo:
```
PA = PA + abs(RA)
```

### 🧾 Lucro:
```
IR = (RA - min(RA, PA)) * 0.15
PA = PA - min(RA, PA)
```

> PM = Preço Médio  
> QM = Quantidade Média  
> PC/PV = Preço Compra/Venda  
> QC/QV = Quantidade Compra/Venda  
> TC/TV = Taxa Corretagem  
> RA = Resultado da operação  
> PA = Prejuízo acumulado  
> IR = Imposto devido

---

## 🛠️ Tecnologias Utilizadas

- ⚛️ React (Vite + TypeScript)
- 📦 Context API (para estado global)
- 💅 TailwindCSS (ou outro framework de UI)
- 📊 Recharts (para gráficos)
- 🧩 shadcn/ui — biblioteca de componentes de UI acessível, estilizada com Tailwind e baseada em Radix
-📋 React Hook Form + Zod — para formulários e validações


---

## 🚀 Como rodar o projeto

1. **Clone o repositório**
```bash
git clone https://github.com/htgustavo/mindminers-calculadora-ir.git
cd nome-do-repo
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o projeto**
```bash
npm run dev
```

4. **Abra no navegador**
```
http://localhost:5173
```

---

## 📂 Estrutura do Projeto

```
src/
├── components/         # Componentes reutilizáveis (cards, tabelas, formulários, etc.)
├── context/            # Contextos globais com React Context API
│   └── OperationContext.tsx
├── hooks/              # Hooks customizados como useOperation
├── pages/              # Páginas principais do app (ex: DashboardPage.tsx)
├── mock/               # Dados simulados para testes
│   └── mockOperations.ts
├── types/              # Tipagens globais em TypeScript
│   └── operations.ts
├── utils/              # Funções auxiliares e helpers
├── assets/             # Imagens e ícones (ex: dashboard.png)
└── App.tsx             # Componente raiz
```

---

## 🧪 Exemplo de Operações Testadas

```ts
[
  { type: 'BUY', price: 25.90, quantity: 100, brokerage: 8.50 },
  { type: 'BUY', price: 26.40, quantity: 200, brokerage: 8.50 },
  { type: 'BUY', price: 27.87, quantity: 100, brokerage: 8.50 },
  { type: 'SELL', price: 26.53, quantity: 100, brokerage: 8.50 },
  { type: 'SELL', price: 27.39, quantity: 100, brokerage: 8.50 },
]
```

🧾 Resultado:
- Lucro total: R$ 59,87
- Prejuízo acumulado: R$ 26,12
- IR devido: R$ 5,06

---

## 📎 Desafio Técnico

Este projeto foi desenvolvido como parte de um desafio técnico, com as seguintes restrições:

- Utilizar React obrigatoriamente
- Calcular imposto de renda mensal sobre operações de ações
- Exibir gráficos ou dados de forma clara
- Código limpo, organizado e funcional
- Entrega via repositório GitHub

---

## 👨‍💻 Autor

**Hilton Gustavo**  
[LinkedIn](https://www.linkedin.com/in/hiltongustavol) • [GitHub](https://github.com/htgustavo)

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para utilizá-lo e modificá-lo.
