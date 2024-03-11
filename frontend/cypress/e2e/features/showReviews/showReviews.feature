Feature: Ver as reviews passadas de uma cadeira
  As a usuário
  I want to ver as reviews passadas de uma disciplina
  so that eu tenha conhecimento da visão das pessoas acerca da cadeira

   Scenario: Mensagem de uma cadeira sem reviews cadastradas
    Given o usuário está na página "course/gdi"
    When o usuário for para a seção de reviews
    And não há reviews registradas em "gdi"
    Then o usuário irá ver a mesnagem de erro "Oops... parece que não há mais reviews disponíveis"

  Scenario: Ver reviews com nota mais alta
    Given o usuário está na página "course/gdi"
    And a review do usuário "user0" com comentário "ok" e nota "10" está cadastrada para "gdi"
    And a review do usuário "user1" com comentário "ok" e nota "9" está cadastrada para "gdi"
    And a review do usuário "user2" com comentário "ok" e nota "8" está cadastrada para "gdi"
    And a review do usuário "user3" com comentário "ok" e nota "8" está cadastrada para "gdi"
    And a review do usuário "user4" com comentário "ok" e nota "7" está cadastrada para "gdi"
    And a review do usuário "user5" com comentário "ok" e nota "7" está cadastrada para "gdi"
    And a review do usuário "user6" com comentário "ok" e nota "7" está cadastrada para "gdi"
    And a review do usuário "user7" com comentário "ok" e nota "7" está cadastrada para "gdi"
    And a review do usuário "user8" com comentário "ok" e nota "6" está cadastrada para "gdi"
    And a review do usuário "user9" com comentário "ok" e nota "6" está cadastrada para "gdi"
    And a review do usuário "user10" com comentário "ok" e nota "1" está cadastrada para "gdi"
    When a ordenação escolhida for de "maiores notas"
    Then o usuário irá ver a review de "user0" com nota "10" e comentário "ok"
    And o usuário irá ver a review de "user1" com nota "9" e comentário "ok"
    And o usuário irá ver a review de "user2" com nota "8" e comentário "ok"
    And o usuário irá ver a review de "user3" com nota "8" e comentário "ok"
    And o usuário irá ver a review de "user4" com nota "7" e comentário "ok"
    And o usuário irá ver a review de "user5" com nota "7" e comentário "ok"
    And o usuário irá ver a review de "user6" com nota "7" e comentário "ok"
    And o usuário irá ver a review de "user7" com nota "7" e comentário "ok"
    And o usuário irá ver a review de "user8" com nota "6" e comentário "ok"
    And o usuário irá ver a review de "user9" com nota "6" e comentário "ok"
    And o usuário não irá ver a review de "user10" com nota "1"

  Scenario: Ver reviews com nota mais baixa
    Given o usuário está na página "course/gdi"
    And a review do usuário "user0" com comentário "ok" e nota "1" está cadastrada para "gdi"
    And a review do usuário "user1" com comentário "ok" e nota "1" está cadastrada para "gdi"
    And a review do usuário "user2" com comentário "ok" e nota "1" está cadastrada para "gdi"
    And a review do usuário "user3" com comentário "ok" e nota "1" está cadastrada para "gdi"
    And a review do usuário "user4" com comentário "ok" e nota "1" está cadastrada para "gdi"
    And a review do usuário "user5" com comentário "ok" e nota "1" está cadastrada para "gdi"
    And a review do usuário "user6" com comentário "ok" e nota "1" está cadastrada para "gdi"
    And a review do usuário "user7" com comentário "ok" e nota "1" está cadastrada para "gdi"
    And a review do usuário "user8" com comentário "ok" e nota "1" está cadastrada para "gdi"
    And a review do usuário "user9" com comentário "ok" e nota "1" está cadastrada para "gdi"
    And a review do usuário "user10" com comentário "ok" e nota "10" está cadastrada para "gdi"
    When a ordenação escolhida for de "maiores notas"
    Then o usuário irá ver a review de "user0" com nota "1" e comentário "ok"
    And o usuário irá ver a review de "user1" com nota "1" e comentário "ok"
    And o usuário irá ver a review de "user2" com nota "1" e comentário "ok"
    And o usuário irá ver a review de "user3" com nota "1" e comentário "ok"
    And o usuário irá ver a review de "user4" com nota "1" e comentário "ok"
    And o usuário irá ver a review de "user5" com nota "1" e comentário "ok"
    And o usuário irá ver a review de "user6" com nota "1" e comentário "ok"
    And o usuário irá ver a review de "user7" com nota "1" e comentário "ok"
    And o usuário irá ver a review de "user8" com nota "1" e comentário "ok"
    And o usuário irá ver a review de "user9" com nota "1" e comentário "ok"
    And o usuário não irá ver a review de "user10" com nota "10"

  Scenario: Ver reviews mais recentes
    Given o usuário está na página "course/gdi"
    And as seguintes reviews estão cadastradas:
        | username  | discipline  | rating | comment      | time                |
        | user0     | gdi         | 8      | ok           | 2023-10-28 18:10:10 |
        | user1     | gdi         | 8      | ok           | 2023-10-10 19:10:10 |
        | user3     | gdi         | 8      | ok           | 2023-10-10 20:10:10 |
        | user4     | gdi         | 8      | ok           | 2023-10-10 20:10:10 |
        | user5     | gdi         | 8      | ok           | 2023-10-10 20:10:10 |
        | user6     | gdi         | 8      | ok           | 2023-10-10 20:10:10 |
        | user7     | gdi         | 8      | ok           | 2023-10-10 20:10:10 |
        | user8     | gdi         | 8      | ok           | 2023-10-10 20:10:10 |
        | user9     | gdi         | 8      | ok           | 2023-10-10 20:10:10 |
        | user10    | gdi         | 8      | ok           | 2022-10-10 20:10:10 |
    When a ordenação escolhida for de "mais recentes"
    Then o usuário irá ver o comentário de "user0" com nota "8" e comentário "ok"
    And o usuário irá ver o comentário de "user1" com nota "8" e comentário "ok"
    And o usuário irá ver o comentário de "user2" com nota "8" e comentário "ok"
    And o usuário irá ver o comentário de "user3" com nota "8" e comentário "ok"
    And o usuário irá ver o comentário de "user4" com nota "8" e comentário "ok"
    And o usuário irá ver o comentário de "user5" com nota "8" e comentário "ok"
    And o usuário irá ver o comentário de "user6" com nota "8" e comentário "ok"
    And o usuário irá ver o comentário de "user7" com nota "8" e comentário "ok"
    And o usuário irá ver o comentário de "user8" com nota "8" e comentário "ok"
    And o usuário irá ver o comentário de "user9" com nota "8" e comentário "ok"
    And o usuário não irá ver o comentário de "user10" com time "2022-10-10 20:10:10"

  Scenario: Ver reviews mais antigas
    Given o usuário está na página "course/gdi"
    And as seguintes reviews estão cadastradas:
        | username  | discipline  | rating | comment      | time                |
        | user0     | gdi         | 8      | ok           | 2023-10-10 18:10:10 |
        | user1     | gdi         | 8      | ok           | 2023-10-10 19:10:10 |
        | user3     | gdi         | 8      | ok           | 2023-10-10 20:10:10 |
        | user4     | gdi         | 8      | ok           | 2023-10-10 20:10:10 |
        | user5     | gdi         | 8      | ok           | 2023-10-10 20:10:10 |
        | user6     | gdi         | 8      | ok           | 2023-10-10 20:10:10 |
        | user7     | gdi         | 8      | ok           | 2023-10-10 20:10:10 |
        | user8     | gdi         | 8      | ok           | 2023-10-10 20:10:10 |
        | user9     | gdi         | 8      | ok           | 2023-10-10 20:10:10 |
        | user10    | gdi         | 8      | ok           | 2024-10-10 20:10:10 |
    When a ordenação escolhida for de "mais antigas"
    Then o usuário irá ver o comentário de "user0" com nota "8" e comentário "ok"
    And o usuário irá ver o comentário de "user1" com nota "8" e comentário "ok"
    And o usuário irá ver o comentário de "user2" com nota "8" e comentário "ok"
    And o usuário irá ver o comentário de "user3" com nota "8" e comentário "ok"
    And o usuário irá ver o comentário de "user4" com nota "8" e comentário "ok"
    And o usuário irá ver o comentário de "user5" com nota "8" e comentário "ok"
    And o usuário irá ver o comentário de "user6" com nota "8" e comentário "ok"
    And o usuário irá ver o comentário de "user7" com nota "8" e comentário "ok"
    And o usuário irá ver o comentário de "user8" com nota "8" e comentário "ok"
    And o usuário irá ver o comentário de "user9" com nota "8" e comentário "ok"
    And o usuário não irá ver o comentário de "user10" com time "2024-10-10 20:10:10"