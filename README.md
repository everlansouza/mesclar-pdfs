# Back-End Mesclar PDF

## Descrição do projeto
O projeto **"Back-End Mesclar PDF"** é uma aplicação desenvolvida em Spring Boot que permite a mesclagem de arquivos PDF. Através de uma API REST, os usuários podem enviar múltiplos arquivos PDF e receber um único arquivo PDF mesclado como resultado. A aplicação também armazena o histórico das mesclagens realizadas, permitindo que os usuários consultem os arquivos mesclados anteriormente.

---

## Tecnologias utilizadas
- **Java 17**: Linguagem de programação utilizada para o desenvolvimento da aplicação.
- **Spring Boot**: Framework para construção de aplicações Java, que simplifica a configuração e o desenvolvimento.
- **Spring Data JPA**: Para a interação com o banco de dados.
- **RabbitMQ**: Para a comunicação assíncrona entre serviços.
- **Apache PDFBox**: Biblioteca para manipulação de arquivos PDF.
- **MySQL**: Sistema de gerenciamento de banco de dados utilizado para armazenar informações sobre os PDFs mesclados.
- **Maven**: Gerenciador de dependências e construção do projeto.
- **Swagger**: Para documentação da API.

---

## Passos para configuração e execução da aplicação

### 1. Clone o repositório
```bash
git clone <URL_DO_REPOSITORIO>
cd back-end
```

### 2. Configuração do banco de dados
Crie um banco de dados MySQL e configure as credenciais no arquivo `application.properties`.

Exemplo de configuração:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/nome_do_banco
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

### 3. Instalação das dependências
Certifique-se de ter o Maven instalado e execute o seguinte comando para baixar as dependências:
```bash
mvn clean install
```

### 4. Execução da aplicação
Para executar a aplicação, utilize o comando:
```bash
mvn spring-boot:run
```

### 5. Acessando a API
A API estará disponível em `http://localhost:8080/api/pdf`.
Utilize ferramentas como **Postman** ou **Swagger** para testar os endpoints da API.

### 6. Configuração do RabbitMQ
- Certifique-se de que o RabbitMQ está instalado e em execução.
- Configure as credenciais e a fila no arquivo `RabbitMQConfig.java` se necessário.

---

## Testes
Para executar os testes, utilize o comando:
```bash
mvn test
```

---

## Como usar a aplicação

### Endpoints disponíveis
A aplicação oferece os seguintes endpoints para interação:

#### 1. Mesclar PDFs
- **Método:** POST
- **Endpoint:** `/api/pdf/merge`
- **Descrição:** Envia múltiplos arquivos PDF para mesclagem.
- **Corpo da requisição:**
  - Formato: `multipart/form-data`
  - Campos:
    - `files`: Um ou mais arquivos PDF a serem mesclados.
- **Resposta:** Retorna o arquivo PDF mesclado.

#### 2. Histórico de mesclagens
- **Método:** GET
- **Endpoint:** `/api/pdf/history`
- **Descrição:** Recupera o histórico de mesclagens realizadas.
- **Resposta:** Retorna uma lista de objetos contendo informações sobre as mesclagens anteriores, incluindo data, hora e links para download dos arquivos mesclados.

#### 3. Download de PDF mesclado
- **Método:** GET
- **Endpoint:** `/api/pdf/download/{id}`
- **Descrição:** Faz o download de um PDF mesclado específico pelo ID.
- **Parâmetros:**
  - `id`: ID da mesclagem desejada.
- **Resposta:** Retorna o arquivo PDF mesclado correspondente.

---

## Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir **issues** ou **pull requests**.

---

## Licença
Este projeto está licenciado sob a Licença **MIT**. Veja o arquivo **LICENSE** para mais detalhes.

---

## Considerações Finais
- **Ambiente de Desenvolvimento:** É recomendável utilizar um ambiente de desenvolvimento como **IntelliJ IDEA** ou **Eclipse** para facilitar a edição e execução do código.
- **Manutenção e Suporte:** Para qualquer dúvida ou problema, sinta-se à vontade para abrir uma **issue** no repositório.

