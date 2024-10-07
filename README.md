# GRQDB
API Database Service

# How To Use

## Installation
you can install this module using yarn, npm or bun (for typescript project) but may you need BUN to run this script as module or server

**Using Yarn**
```
yarn add Goldn7799/GRQDB
```
**Using NPM**
```
npm i https://github.com/Goldn7799/GRQDB.git
```
**Using BUN**
```
bun add git+https://github.com/Goldn7799/GRQDB.git
```

### Run A CLI
```
bun run start
```
### Run A Express Server
First enable Express on config.json
```
bun run startserver
```

## How to use code
**Adding A New Database**
```ts
# The Syntax
//// This Syntax will return Promise of string
GRQDB.AddDB(IdDatabase (string), TableFormat (array string))

# Example
GRQDB.AddDB('newDatabase', ['id', 'username', 'password'])
```
**Remove A Database**
```ts
# The Syntax
//// This Syntax will return Promise of string
GRQDB.RemoveDB(IdDatabase (string))

# Example
GRQDB.RemoveDB('newDatabase')
```
**Read Data On Database**
```ts
# The Syntax
//// This Syntax will return Promise of Array Object
GRQDB.DBRead(IdDatabase (string))

# Example
GRQDB.DBRead('newDatabase')
```
### Write Data to Dabatase
**- Add New Data**
```ts
# The Syntax
//// This Syntax will return Promise of string
GRQDB.DBWrite.addData(IdDatabase (string), TheData (object))

# Example
GRQDB.DBWrite.addData('newDatabase', {id: 101, name: 'lorem', password: 'urmother3321'})
```
**- Remove A Data**
```ts
# The Syntax
//// This Syntax will return Promise of string
GRQDB.DBWrite.removeData(IdDatabase (string), IdData (number))

# Example
GRQDB.DBWrite.removeData('newDatabase', 0)
```
**- Edit A Data**
```ts
# The Syntax
//// This Syntax will return Promise of string
GRQDB.DBWrite.editData(IdDatabase (string), IdData (number), NewValue (object))

# Example
GRQDB.DBWrite.editData('newDatabase', 0, {id: 105})
```
**- Replace A Data**
```ts
# The Syntax
//// This Syntax will return Promise of string
GRQDB.DBWrite.replaceData(IdDatabase (string), IdData (number), NewValue (object))

# Example
GRQDB.DBWrite.replaceData('newDatabase', 0, {id: 141, name: 'lorem ipsum', password: 'urfather3321'})
```

## Use API Instead Syntax
Default Host on config is http://localhost:8080
#### [JSON Format]
**Login to get Credential**
> (host)/login [POST]
```json
{
  "username": "user",
  "password": "admin"
}
```

**Add A Database**
> (host)/database/manage/(Database ID) [POST]
```json
{
  "auth": "pwPH67WhBsG7n8ZwBJ",
  "table": ["id", "username", "password"]
}
```

**Remove A Database**
> (host)/database/manage/(Database ID) [DELETE]
```json
{
  "auth": "pwPH67WhBsG7n8ZwBJ"
}
```

**Get data on Database**
> (host)/database/action/(Database ID)/(AUTH Code) [GET]

**Add data on Database**
> (host)/database/action/(Database ID) [POST]
```json
{
  "auth": "pwPH67WhBsG7n8ZwBJ",
  "value": {"id": 101, "username": "lorem", "password": "urmother3321"}
}
```

**Delete data on Database**
> (host)/database/action/(Database ID) [DELETE]
```json
{
  "auth": "pwPH67WhBsG7n8ZwBJ",
  "dataId": 0
}
```

**Edit data on Database**
> (host)/database/action/(Database ID) [PATCH]
```json
{
  "auth": "pwPH67WhBsG7n8ZwBJ",
  "newValue": {"username": "lorem ipsum", "password": "urfather3321"},
  "dataId": 0
}
```

**Replace data on Database**
> (host)/database/action/(Database ID) [PUT]
```json
{
  "auth": "pwPH67WhBsG7n8ZwBJ",
  "newValue": {"id": 104, "username": "lorem dolor", "password": "ilikeurmother3321"},
  "dataId": 0
}
```