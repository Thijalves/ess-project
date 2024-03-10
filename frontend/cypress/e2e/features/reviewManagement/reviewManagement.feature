Feature: Adicionar, remover e editar reviews
  As a usuário
  I want Adicionar, remover, editar reviews.
  so that meus reviews sejam exibidos no site.

Scenario: Criar um review
  Given o usuário está na página "course/ESS"
  Given o usuário com username "test" e senha "test" está logado
  Given o usuário "test" não possui um review cadastrado para a cadeira "ESS"
  Given o usuário está na página "course/ESS"
  When o usuário clica em "Add"
  When o usuário preenche o campo "rating" com "10"
  When o usuário preenche o campo "comment" com "Gostei muito!"
  When o usuário clica em "Enviar"
  Then o usuário ainda está na página "course/ESS"
  And é possível ver o review com nota "10" e comentário "Gostei muito!"

Scenario: Criar um review sem nota
  Given o usuário com username "test" e senha "test" está logado
  Given o usuário "test" não possui um review cadastrado para a cadeira "ESS"
  Given o usuário está na página "course/ESS"
  When o usuário clica em "Add"
  When o usuário preenche o campo "comment" com "Gostei muito!"
  When o usuário clica em "Enviar"
  Then o usuário ainda está na página "course/ESS"
  And é possível ver a mensagem "Por favor, insira uma nota."

Scenario: Editar um review
  Given o usuário com username "test" e senha "test" está logado
  Given o usuário "test" possui um review cadastrado para a cadeira "ESS" com nota "8" e comentário "Achei bom"
  Given o usuário está na página "course/ESS"
  When o usuário clica em "Editar"
  When o usuário preenche o campo "updatedRating" com "9"
  When o usuário preenche o campo "updatedComment" com "Muito bom!"
  When o usuário clica em "Atualizar"
  Then o usuário ainda está na página "course/ESS"
  And é possível ver o review com nota "9" e comentário "Muito bom!"

Scenario: Editar um review sem nota
  Given o usuário com username "test" e senha "test" está logado
  Given o usuário "test" possui um review cadastrado para a cadeira "ESS" com nota "8" e comentário "Achei bom"
  Given o usuário está na página "course/ESS"
  When o usuário clica em "Editar"
  When o usuário preenche o campo "updatedRating" com " "
  When o usuário preenche o campo "updatedComment" com "Muito bom!"
  When o usuário clica em "Atualizar"
  Then o usuário ainda está na página "course/ESS"
  And é possível ver a mensagem "Por favor, insira uma nota."

Scenario: Apagar um review
  Given o usuário com username "test" e senha "test" está logado
  Given o usuário "test" possui um review cadastrado para a cadeira "ESS" com nota "8" e comentário "Achei bom"
  Given o usuário está na página "course/ESS"
  When o usuário clica em "Apagar"
  And o usuário clica em "Sim"
  Then o usuário ainda está na página "course/ESS"
  And é possível ver a mensagem "Nenhum review cadastrado pelo usuário."