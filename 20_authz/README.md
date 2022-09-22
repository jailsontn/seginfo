# Exemplo simples de autorização

Esta aplicação exemplifica o uso de autorização em um blog simples

## Papeis/Funções

| Papel/Função  |
|---------------|
| Admin         |
| Editor        |
| Reader        |

## Usuários

| Usuário  | Senha    | Papel/Função |
|----------|----------|--------------|
| admin    | 12345678 | Admin        |
| editor   | 12345678 | Editor       |
| editor2  | 12345678 | Editor       |
| visitante| 12345678 | Visitante    |

## Lógica utilizada no exemplo

| Recurso          | Ação    |	Papel /Função                                                                        |
|------------------|---------|---------------------------------------------------------------------------------------|
| Artigo Publicado | Ler	 | Usuários não autenticados, Leitor, Editor e Admin                                     |
| Artigo Rascunho  | Ler	 | Editor (se for autor do artigo) Admin                                                 |
| Artigo Publicado | Criar	 | Editor e Admin                                                                        |
| Artigo Rascunho  | Criar	 | Editor e Admin                                                                        |
| Artigo Publicado | Editar	 | Editor (se for autor do artigo) e Admin                                               |
| Artigo Rascunho  | Editar	 | Editor (se for autor do artigo) e Admin                                               |
| Artigo Publicado | Excluir | Editor (se for autor do artigo) e Admin                                               | 
| Artigo Rascunho  | Excluir | Editor (se for autor do artigo) Admin                                                 |
| Comentário       | Ler	 | Usuários não autenticados, Leitor, Editor e Admin                                     |
| Comentário       | Criar   | Leitor, Editor e Admin                                                                |
| Comentário       | Excluir | Leitor (se for autor do comentário), Editor (se for autor do comentário) e Admin      |


## Observações

Para testar aplicação crie o arquivo .env igual ao arquivos .env_example substituindo os valores das variáveis de ambiente.

Leia todos os comentários do código.

Lembre-se de instalar todos as dependências utilizando o comando npm install.

Nota: Não utilize esse código em produção, exemplo simplificado para entendimento de alguns conceitos com o foco em aprendizagem