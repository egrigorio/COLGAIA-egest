## **egest** 

**egest** é uma plataforma online para gestão dos funcionários e serviços associados a cada funcionário. Foi desenvolvido utilizando o *MERN Stack* para poder trabalhar com a dinamização dos dados oferecida pelo *MongoDB* juntamente com a reatividade de componentes e renderização rápida oferecida pelo *React.js*.

**

## setup 👨‍💻

**
Requisitos:
-   Node 18.9.0 ou superior
-   npm 6.14.15 ou superior

O projeto tem uma estrutura simples. Siga o passo a passo para o começar:
~/

    npm install
   
~/front/front-egest

    npm install
   
   Após instalar as dependências do projeto, é necessário criar um ficheiro *.env*; O ficheiro deve ser criado na raiz do projeto, no mesmo nível dos diretórios associados ao backend. O modelo do ficheiro deve ser semelhante ao abaixo:
   
    JWT_SECRET = 'Seu código secreto aqui'
    
    DB_SERVER = 'Server da bd'
    
    DB_PORT = 'Porta da bd'
    
    DB_NAME = 'Nome da bd'

Concluída essas etapas, no diretório raiz da aplicação e no diretório do front-egest corra o seguinte comando:

    npm start
