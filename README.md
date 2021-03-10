# seventh-desafio-frontend
Projeto frontend do desafio da empresa Seventh

## Visão Geral

O desafio foi cumprido com as camadas de backend e frontend isoladas, para isso foram criados dois repositórios para os projetos distintos.

- [seventh-desafio-backend | PHP Laravel](https://github.com/robmoraes/seventh-desafio-backend)
- [seventh-desafio-frontend | Vue.js/Quasar.dev](https://github.com/robmoraes/seventh-desafio-frontend)

Esse repositório contém a camada de frontend da aplicação. Abaixo seguem as instruções para instalação.

## Requisitos

- Quasar 1.15
- Node >=10
- NPM >=5

A instalação do quasar pode ser guiada no seguinte link (atenção as recomendações sobre Node e NPM):

- [https://quasar.dev/quasar-cli/installation](https://quasar.dev/quasar-cli/installation)

## Download do projeto

```bash
$ git clone https://github.com/robmoraes/seventh-desafio-frontend.git
```

## Install the dependencies
```bash
npm install
```

Após instalar, algumas alterações no arquivo "/quasar.conf.js" podem ser necessárias:

```js
build: {
      env: {
        API: ctx.dev
          ? 'http://localhost:8000/api' // Informar URL da API
          : 'http://localhost:8000/api' // Seria a URL da API de produção
      },

// Caso a aplicação frontend deva rodar na rede,
// deve ser configurado devServer:
devServer: {
      https: false,
      host: '10.0.0.190', // ip para acesso na rede
      port: 8080,         // porta -- o acesso ficará http://10.0.0.190:8080 por exemplo
      open: true // opens browser window automatically
    },

```

### Rodar a aplicação no modo de Desenvolvimento (hot-code reloading, error reporting, etc.)

Depois de instalado com npm, e configurado o arquivo "quasar.conf.js", a aplicação pode ser executada com o comando abaixo:

```bash
quasar dev
```

Após rodar o comando acima, se tudo der certo o servidor deve estar rodando com as seguintes informações na tela:

```bash
 DONE  Compiled successfully in 51157ms                                                5:31:31 AM

 N  App dir........... /home/robb/workspace/seventh-desafio/src/frontend/seventh-desafio-frontend
    App URL........... http://10.0.0.190:8080/
    Dev mode.......... spa
    Pkg quasar........ v1.15.5
    Pkg @quasar/app... v2.2.1
    Transpiled JS..... yes (Babel)

wds: Project is running at http://10.0.0.190:8080/
wds: webpack output is served from /
wds: 404s will fallback to /index.html
 App · Opening default browser at http://10.0.0.190:8080/
```

E já pode ser acessado pela URL configurada.

As credênciais de acesso podem ser obtidas após a instalação da aplicação backend.

## Degustação

Mas como o processo de instalação é relativamente longo, preparei um ambiente de degustação para que possam avaliar. Para isso, publiquei o build do frontend na estrutura de views do laravel e fiz um pequeno ajuste nas rotas do laravel (/routes/web.php) para resolver as uris do front. Sendo assim a API e o Front rodam sob mesmo domínio, mas a construção foi completamente desacoplada.

- [Playground do desafio](https://api.seventh.seemann.com.br)

Lembrando:

- e-mail: desafio@seventh.com.br
- senha: 12345678



### Build da aplicação para produção

```bash
quasar build
```

O build gera uma pasta exibida no relatório do console, a pasta gerada "/dist/spa" pode ser copiada para um servidor web que vai rodar também. Se tudo der certo o resultado deve ser esse:

```bash
Build summary for css/js/json (the rest are omitted):

 ...

 Build succeeded

 Build mode........ spa
 Pkg quasar........ v1.15.5
 Pkg @quasar/app... v2.2.1
 Debugging......... no
 Publishing........ no
 Transpiled JS..... yes (Babel)
 ==================
 Output folder..... /home/robb/workspace/seventh-desafio/src/frontend/seventh-desafio-frontend/dist/spa
```
