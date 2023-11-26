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
Then vejo a mensagem de erro “Email ou senha incorretos”
And permaneço na página de login
