# Pinboard_Tech_Test

We followed this [specification](SPECIFICATION.md).

---
### Running the app

In your terminal:
```terminal
npm install
```

Install mongo db
create database `Pinboard`
In the terminal run:
```
mongod
```
create a new terminal window, `cd` to project directory
```
node app
```

---
### User Stories
```
As a user, I can create a pin board so that I can add bookmarklets to it.
As a user, I can access an existing pin board so that I can view my bookmarklets.
i.    When a user creates a pin board a unique URL should be generated so that they can access it later.
As a user, I can save a URL as a bookmarklet, to a pin board, so that I can easily find it again later.
As a user, I can search through a pin board so that I can easily find something I vaguely remember!
```
---

### Approach

I decided to use Node/express to ensure that the application would be scalable following the REST rules. It was the first time I use a database connection using mongoDB and mongoose.
