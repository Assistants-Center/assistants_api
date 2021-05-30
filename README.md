# *assistants-api*

Below we present the documentation of the assistants-api module used to communicate with the API Assistants Center (assistants.ga).

## Installation

```js
npm i assistants-api
```

## Errors Handling

If an error occurred while executing an action, the function returned the following value:

```js
{error: true, message: "error text"}
```

If all is successful, the following value will be returned:

```js
{error: false, data: returnedData_ifThereIs}
```

## API client

### Require module

```js
const Assistants = require('assistants-api');
```

### New client

```js
const client = new Assistants.Client(parametr, password);
```

where `parametr` is user **username** or **e-mail** adress and `password` is user **password**

## Functions

### Login

```js
const user = await client.login();
```

**success:**

```js
{
  error: false,
  data: { username: '', email: '' }
}
```

**error:**

As in **Errors Handling** above

### Session

```js
const session = await client.session();
```

**success:**

```js
{
  cookie: {
    originalMaxAge: Number,
    expires: DateString,
    httpOnly: Boolean,
    path: String
  },
  user: { sid: String, username: String },
  __lastAccess: Number,
  apples: Number
}
```

**error:**

As in **Errors Handling** above

## Register

```js
const newAccount = await client.register({username: String, email: String, password: String, tos: Boolean})
```

**success:**

```js
{
  error: false,
  data: { username: String, email: String }
}
```

**error:**

As in **Errors Handling** above

# Events Listeners

You can connect to API Assistants to listen for the latest updates. For example, you can know when the daily store is updated, in what language, and get a ready-made store image buff.

## Init

```js
const events = await client.events();
```

### Errors

As in **Errors Handling** above

### Fortnite Daily Shop Updates

```js
const shopEmitter = events.shop;
shopEmitter.on('shop::new', ({buff,lang}) => {
    console.log(`NEW SHOP! IMAGE buff: ${buff}, lang: ${lang}`);
});
```

### Fortnite Sections Updates

```js
const sectionsEmitter = events.sections;
sectionsEmitter.on('sections::new', ({buff,lang}) => {
    console.log(`NEW SECTIONS! IMAGE buff: ${buff}, lang: ${lang}`);
});
```

# Ready-to-use example with public account

```js
const Assistants = require('assistants-api');

const client = new Assistants.Client("assistants_api", "public123");

client.login().then(async (res)=>{
    if(res.error)return console.log(res);
    console.log(res);

    const userSession = await client.session();
    console.log(userSession);

    const newAccount = await client.register({username: "", email: "", password: "", tos: true});
    console.log(newAccount);


    const events = await client.events();

    const shopEmitter = events.shop;
    shopEmitter.on('shop::new', ({buff,lang}) => {
        console.log(`NEW SHOP! IMAGE buff: ${buff}, lang: ${lang}`);
    });

    const sectionsEmitter = events.sections;
    sectionsEmitter.on('sections::new', ({buff,lang}) => {
        console.log(`NEW SECTIONS! IMAGE buff: ${buff}, lang: ${lang}`);
    });
});
```