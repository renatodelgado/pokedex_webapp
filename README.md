# Pokédex WebApp

## Descrição
Este projeto é uma Pokédex WebApp desenvolvida como atividade da disciplina **Coding Mobile**, do terceiro período do curso de **Análise e Desenvolvimento de Sistemas** na **Faculdade Senac Pernambuco**, sob orientação do professor **Geraldo Gomes**. A aplicação permite buscar e exibir informações detalhadas sobre Pokémon, utilizando a API pública da [**PokéAPI**](https://pokeapi.co/). Os usuários podem pesquisar Pokémon por nome ou ID, visualizar suas formas normais e shiny, navegar entre Pokémon anteriores e próximos, e interagir com a interface por meio de teclado (setas) ou gestos de swipe em dispositivos móveis.

## Funcionalidades
- **Busca de Pokémon**: Pesquise Pokémon por nome ou ID.
- **Visualização de Sprites**: Exibe sprites normais e shiny (quando disponíveis).
- **Informações Detalhadas**: Mostra ID, nome, tipos, descrição, altura, peso e habilidades.
- **Navegação Intuitiva**: Navegue entre Pokémon usando botões de "anterior" e "próximo" ou setas do teclado.
- **Suporte a Gestos**: Navegação por swipe (esquerda/direita) em dispositivos móveis.
- **Design Responsivo**: Interface adaptada para dispositivos móveis e desktop.
- **Efeito Visual**: Luz superior com animação de "pulso" e botão shiny com gradiente animado.

## Tecnologias Utilizadas
- **HTML5**: Estrutura da interface.
- **CSS3**: Estilização, com uso de animações, gradientes, fontes customizadas e design responsivo.
- **JavaScript (ES6)**: Lógica de interação e integração com a PokéAPI.
- **PokéAPI**: Fonte de dados pública para informações e sprites dos Pokémon.
- **Fontes Customizadas**: Utiliza a fonte "Pokemon" para estilização temática.

## Estrutura do Projeto
```
/Pokédex-WebApp
│
├── index.html        # Estrutura principal da interface
├── script.js         # Lógica de interação e integração com a API
├── style.css         # Estilização da interface
├── assets/           # Recursos estáticos
│   └── pokemon-font.ttf  # Fonte customizada
└── README.md         # Documentação do projeto
```

## Deploy online
[https://renatodelgado.github.io/pokedex_webapp/](https://renatodelgado.github.io/pokedex_webapp/)  

## Como executar localmente
1. **Clone o repositório** ou faça o download dos arquivos.
2. **Hospede localmente**:
   - Use um servidor local (ex.: `Live Server` no VS Code ou `python -m http.server`).
   - Alternativamente, abra o arquivo `index.html` diretamente no navegador.
3. **Interaja com a aplicação**:
   - Digite o nome ou ID de um Pokémon no campo de busca e pressione o botão de busca.
   - Use os botões "Anterior" e "Próximo" ou as setas do teclado (esquerda/direita) para navegar.
   - Clique no botão "Ver Shiny" para alternar entre sprites normais e shiny.
   - Em dispositivos móveis, use gestos de swipe para navegar entre Pokémon.

## Requisitos
- Navegador moderno (Chrome, Firefox, Safari, etc.).
- Conexão com a internet para acessar a PokéAPI.
- Nenhum software adicional é necessário, pois a aplicação é puramente front-end.

## Créditos
- **Desenvolvedor**: Renato Delgado
- **Orientador**: Prof. Geraldo Gomes
- **Dados**: [PokéAPI](https://pokeapi.co/)
- **Curso**: Análise e Desenvolvimento de Sistemas, Faculdade Senac Pernambuco
- **Disciplina**: Coding Mobile, 3º período

## Observações
- A aplicação foi projetada para ser leve e funcional, com foco em usabilidade e design temático inspirado na Pokédex dos jogos Pokémon.
- A PokéAPI pode ocasionalmente apresentar instabilidade; a aplicação lida com erros mostrando mensagens amigáveis ao usuário.
- A fonte customizada (`pokemon-font.ttf`) está incluída para garantir a estética temática.
