# GRQDB
API Database Service

# How To Use

## Installation
you can install this module using yarn, npm or bun (for typescript project)

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
GRQDB.DBWrite.addData('newDatabase', {id: 001, name: 'lorem', password: 'urmother3321'})
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
GRQDB.DBWrite.editData('newDatabase', 0, {id: 005})
```
**- Replace A Data**
```ts
# The Syntax
//// This Syntax will return Promise of string
GRQDB.DBWrite.replaceData(IdDatabase (string), IdData (number), NewValue (object))

# Example
GRQDB.DBWrite.replaceData('newDatabase', 0, {id: 041, name: 'lorem ipsum', password: 'urfather3321'})
```