Quando logar

Quando um aplicativo está em execução, há muitas abordagens de registro diferentes que você pode usar, dependendo da funcionalidade do seu aplicativo. O log pode combinar uma ou mais instâncias de log.

Algumas das instâncias de registro padrão incluem:

    Registre quando houver um erro ou o aplicativo encontrar exceções inesperadas.
    Registre quando um evento do sistema ocorre.
    Solicitação de registro e respostas
    Faça algum registro durante o modo de depuração.

O que registrar

Isso depende principalmente do que seu aplicativo faz.

Por exemplo, onde os usuários interagem com o componente do sistema criando uma conta de usuário, muitos usuários invocarão uma instância de log. Nesse caso, você precisa transmitir seus logs com as informações que o ajudarão a rastrear a origem do log, como:

    Incluindo um carimbo de data/hora em cada log para rastrear quando a solicitação ou resposta foi feita.
    Códigos de usuário. Ser capaz de distinguir os logs do usuário a e do usuário b. Nesse caso, se o usuário encontrar um erro de sistema e entrar em contato com o administrador do sistema, será mais fácil para um desenvolvedor verificar os problemas. O desenvolvedor precisará apenas do ID do usuário para descobrir o que deu errado quando o usuário estava fazendo uma solicitação do servidor ou quando o sistema estava retornando uma resposta ao usuário.

Práticas recomendadas de registro

    O registro deve ser significativo e ter um propósito.
    Adote o registro no estágio inicial do desenvolvimento do aplicativo.
    Divida os logs em vários arquivos de log caso você tenha um aplicativo com tráfego massivo.
    O registro deve ser estruturado e feito em níveis.

Espero que este guia o ajude a entender o logging e seja capaz de aplicar o Winston em seus projetos!