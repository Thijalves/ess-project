Feature: Login
As a usuário do sistema
I want to fazer login no sistema, utilizando o nome de usuário “caio”, email “caio@cin.ufpe.br” e senha “Senha@4321”
So that eu tenha acesso às funcionalidades do sistema que são acessíveis somente após o login

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

Scenario: Login com Credenciais Válidas
Given que o usuário "caio" possui uma conta
When o usuário insere seu nome de usuário "caio" e senha "Senha@4321"
Then o usuário é redirecionado para a página inicial

Scenario: Recuperação de Senha Bem-Sucedida
Given que o usuário "caio" possui uma conta
When o usuário solicita a recuperação de senha para o e-mail associado à sua conta "caio@cin.ufpe.br"
Then o usuário recebe um link ou código de recuperação
