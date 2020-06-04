```node```\
```node index.js```

-------------------

```npm init```\
```touch .gitignore && echo 'node_modules' >> .gitignore```\
```npm i express```

alternatives Express: koa, hapi, deno

```npm i nodemon```\
```npm i --save-dev nodemon```\
```npm i -g nodemon``` => simple ```nodemon``` in the dir\
```nodemon index.js```

or:\
change in main.js:\
 ```"main": "nodemon index.js"```,\
 then start the server with ```nodemon index.js``` or with ```nodemon``` if nodemon is installed globally


------------insomnia core--------

https://insomnia.rest

```sudo apt update```\
```sudo apt install snapd```\
```sudo snap install insomnia```

----------bearFriends DB--------

```npm i express mongoose```

-----------------------------
install mongodb:
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-debian/

[-----------------------------

Supprimer l'ancienne config mongodb :\
    ```sudo mv /var/lib/mongodb /var/lib/mongodb_backup```\
    ```sudo mkdir /var/lib/mongodb```\
    ```sudo chmod 755 /var/lib/mongodb```\
    ```sudo chown mongodb:mongodb /var/lib/mongodb```\
    ```sudo systemctl restart mongodb```

Installation de MongoDb 4.2 sur un environnement Ubuntu 18.04 :\
    ```wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -```\
    ```echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list```\
   ```sudo apt update```\
    ```sudo apt install -y mongodb-org```\
    ```sudo systemctl enable --now mongod```

Vérifier le statut du service mongo :\
    ```sudo systemctl status mongod```

------------]\
```rm -rf node_modules```

--------------------------------

```sudo systemctl start mongod```

--------------------------------
https://mongoosejs.com/

```mongo```\
> ```>show dbs```\
> ```>use bearfriends_db```\
> ```>show collections```\
> ```>db.bears.find()```
> 

[------------to add a user for the db --------------
```use bearfriends_db
db.createUser({
      user: "user",
      pwd: "user",
      roles: [
          { role: "readWrite", db: "bearfriends_db" }
      ]
  })

MONGO_URL : mongodb://user:user@<URL_DE_LA_BASE_MONGO>:27017/bearfriends_db
```

-----------------]

------------04books-----

https://expressjs.com/fr/guide/using-template-engines.html

```npm install pug```

app.set('view engine', 'pug');


-----------

https://picturepan2.github.io/spectre/

 link(rel="stylesheet", href='https://unpkg.com/spectre.css/dist/spectre.min.css')\
link(rel='stylesheet', href='https://unpkg.com/spectre.css/dist/spectre-exp.min.css')\
link(rel='stylesheet', href='https://unpkg.com/spectre.css/dist/spectre-icons.min.css')

https://html2jade.org/

----------------

https://shieldfy.io/blog/template-engines-nodejs-developers/

