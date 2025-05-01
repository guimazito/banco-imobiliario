# Banco Imobiliário App

## Instructions

1. Install dependencies by running `pnpm install` (or `npm`/`yarn`) from client folder
2. Run frontend in development mode by running `pnpm run dev` (or `npm`/`yarn`) from client folder
3. Run frontend in development mode exposing your network address by running `pnpm run dev -- --host` (or `npm`/`yarn`) from client folder
4. Run backend by running `node server.js` from server folder
5. Enjoy!

## ToDo
- Indicar cor diferente no ranking para jogadores com saldo negativo
- Add página de propriedades por jogador
- Add página de balanço final para finalização de jogo
- Tutorial de inicialização

## Done
- Fonte texto mais amigável
- Diferenciar transição por cor
- Responsividade do ranking e últimas transações
- Tirar "-" do ranking dos jogadores e quebrar a linha
- Add imagem ao lado do texto para diferenciar o tipo de transação
- Mostrar valores em dinheiro com pontuação para melhor visualização (R$ 1.000)
- Websocket para card do jogador, ranking de jogadores e transações
- Zerar conteúdo das tabelas de players e transações ao gerar novo jogo
- Add avatar do jogador no card na tela principal
- Responsividade na tela de novo jogo
- Mostrar somente últimas transações com caixa de rolamento
- Popup de confirmação ao iniciar novo jogo
- Avatar por jogador no início
- Ajustar resposividade vertical dos componentes ranking e transações
- Add menu lateral com as opções de novo jogo, propriedades por jogador e balanço final (https://mui.com/material-ui/react-app-bar/)