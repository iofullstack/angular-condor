## Angular/cli

```shell
ng g m app-routing --flat --module=app
ng g m module
ng g c module/component --module module
ng g s module/service
ng g interface module/interface
```

>Si se presenta un error de compilación intentar con 'npm i --save node-sass'

```shell
db.menus.update({}, {
  $set: {
    "createdAt": "2018-11-04T14:00:00Z"
  }
}, {
  multi:true
})

db.menus.update({
  "_id": ObjectId("5bdfa4909f36095878d99a40")
}, {
  $set: {
    "createdAt": "2018-11-04T14:00:43Z"
  }
})
```

## Backup

```shell
cd Desktop
mongodump
mongo
>use nameDatabase
>show collections
>db.dropDatabase()
>show collections
>show dbs
cd ..
mongorestore   //--> Busca la carpeta dump
```

## Restaurar una base de datos

```shell
cd Desktop
mongorestore --db nameDatabase dump/nameDatabase
```

## Backup de una base de datos

```shell
cd Desktop
mongodump --db nameDatabase
```

## Backup collection

```shell
cd Desktop
mongodump --db nameDatabase --collection nameCollection
```

## Restaurar una colección

```shell
mongo
>use nameDatabase
>db.dropDatabase()
>show dbs
cd Desktop
mongorestore --db nameDatabase --collection nameCollection dump/nameDatabase/nameCollection.bson
```



mongorestore --db db-condor --collection tables dump/db-condor/tables.bson

mongorestore --db db-condor --collection categorymenus dump/db-condor/categorymenus.bson

mongorestore --db db-condor --collection menus dump/db-condor/menus.bson

mongorestore --db db-condor --collection prices dump/db-condor/prices.bson
