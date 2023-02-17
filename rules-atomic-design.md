## REGRAS CLASSFICAÇÃO ATOMIC DESIGN 

|--ATOMS
|  |-- Não pode ser filho direto do componente page
|  |-- Não pode conter componentes
|  |-- Não pode conter mais de 3 hierarquia de elementos html
|  |-- pode conter icones
|  |-- pode contter 1 ou mais filhos , mas não pode ter varios pais
|
|--MOLECULES
|  |-- Não pode ser filho direto do componente page
|  |-- Deve ser formado apenas por elementos e componentes vindo dos "atoms"
|
|--ORGANISMS
|  |-- Não pode ser filho direto do componente page
|  |-- Não deve ter elementos como filho , sem que esses filhos tenham filhos tbm.
|  |-- Deve conter poucos ou nenhum comnponente pai
|  |-- Deve ser formado por componentes vindo de "atoms" e "molecules"
|
|--TEMPLATES
|  |-- Deve ser filho direto do componente page
|  |-- Deve ser formado por "organisms, molecules e atoms"
|
|--PAGES
|  |-- Deve conter apenas templetes e alguns elementos se necessario
|