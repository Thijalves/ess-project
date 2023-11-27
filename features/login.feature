Feature: Login
As a usuário do sistema
I want to fazer login no sistema, utilizando o nome de usuário “caio”, email “caio@cin.ufpe.br” e senha “Senha@4321”
So that eu tenha acesso às funcionalidades do sistema que são acessíveis somente após o login

# GUI scenarios

Scenario 1: Login realizado com sucesso
Given que estou na página de login
When eu faço login com e-mail “caio@cin.ufpe.br” e senha “Senha@4321”
Then vejo o nome de usuário “caio” na tela
And sou redirecionado para a página inicial do sistema

Scenario 2: Tentativa de login com e-mail não cadastrado
Given que estou na página de login
When eu faço login com e-mail “myrna@example.com” e senha “Senha@4321”
Then vejo a mensagem de erro “Email ou senha incorretos!”
And permaneço na página de login

Scenario 3: Tentativa de login com senha incorreta
Given que estou na página de login
When eu faço login com e-mail “caio@cin.ufpe.br” e senha “1234@caio”
Then vejo a mensagem de erro “Email ou senha incorretos!”
And permaneço na página de login

Scenario 4: Tentativa de login com senha em branco
Given que estou na página de login
When eu faço login com e-mail “caio@cin.ufpe.br” e senha em branco
Then vejo a mensagem de erro “Email ou senha incorretos!”
And permaneço na página de login

Scenario 5: Logout realizado com sucesso
As a usuário logado no sistema
Given que estou logado no sistema com e-mail "caio@cin.ufpe.br" e senha "Senha@4321"
When eu realizo o logout
Then sou redirecionado para a página de login
And vejo a mensagem "Logout realizado com sucesso!"

# Service scenarios

Scenario 1: Login com Credenciais Válidas
Given que o usuário "caio" possui uma conta
When o usuário insere seu nome de usuário "caio" e senha "Senha@4321"
Then o usuário é redirecionado para a página inicial

Scenario 2: Recuperação de Senha Bem-Sucedida
Given que o usuário "caio" possui uma conta
When o usuário solicita a recuperação de senha para o e-mail associado à sua conta "caio@cin.ufpe.br"
Then o usuário recebe um link ou código de recuperação 
And vejo a mensagem "link/código de verificação enviado para o email"

Scenario 3: Tentativa de Recuperação de Senha com E-mail Inválido
Given que o usuário "caio" possui uma conta
When o usuário solicita a recuperação de senha com um e-mail inválido "caio@ufbr.br"
Then uma mensagem de erro é exibida indicando que o formato do e-mail é inválido

Scenario 4: Tentativa de Login com Nome de Usuário Inexistente
Given que o usuário "caio" possui uma conta
When o usuário insere um nome de usuário "c123" e senha correta
Then uma mensagem de erro é exibida indicando nome de usuário inválido 
