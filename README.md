# me-sqaured
A platform for connecting the mentors and mentees

# for current development set up 
- nodejs v16.14.0
- you need mongo and mongodb-compass in your local set
- set the env as given in the ```.env.local``` file 
- set ```MONGODB_LOCALHOST_URL=<Your_loaclhost>```
- set ```JWT_SECRET =<some_secret_value>```
# for installing the node modules
```npm install```

### for installing node modules for front end , make sure that you're on the frontend folder

# for running the backend

run 
```npm run data:import ``` for importing the data into the databse

run
```npm run data:destroy``` for destroying the data from the database

then run
```npm run server```

# for running the front end

```npm install```

run 
```npm run client```

or 

```cd frontend```
```npm start```


### <i>todo</i> in server-side
- [ ] connection request 
- [ ] image upload for profile picture
- [ ] forget password method
- [ ] mailer

