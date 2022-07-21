# Directory traversal (travessia de diretório)

Directory traversal (também conhecida como passagem de caminho de arquivo) é uma vulnerabilidade de segurança da Web que permite que um invasor leia arquivos arbitrários no servidor que está executando um aplicativo. Isso pode incluir código e dados do aplicativo, credenciais para sistemas back-end e arquivos confidenciais do sistema operacional. Em alguns casos, um invasor pode gravar em arquivos arbitrários no servidor, permitindo que modifiquem os dados ou o comportamento do aplicativo e, por fim, assumam o controle total do servidor.

## Como evitar um ataque de travessia de diretório

A maneira mais eficaz de evitar vulnerabilidades de passagem de caminho de arquivo é evitar passar a entrada fornecida pelo usuário para as APIs do sistema de arquivos. Muitas funções de aplicativos que fazem isso podem ser reescritas para fornecer o mesmo comportamento de maneira mais segura.

Se for considerado inevitável passar a entrada fornecida pelo usuário para as APIs do sistema de arquivos, duas camadas de defesa devem ser usadas juntas para evitar ataques:

- O aplicativo deve validar a entrada do usuário antes de processá-la. Idealmente, a validação deve ser comparada com uma lista de valores permitidos. Se isso não for possível para a funcionalidade necessária, a validação deverá verificar se a entrada contém apenas conteúdo permitido, como caracteres puramente alfanuméricos.
- Depois de validar a entrada fornecida, o aplicativo deve anexar a entrada ao diretório base e usar uma API do sistema de arquivos da plataforma para canonizar o caminho. Ele deve verificar se o caminho canonizado começa com o diretório base esperado.