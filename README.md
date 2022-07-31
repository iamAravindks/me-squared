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


### mvp
- [x] login/sign up for both mentor and mentee
- [ ] mentor/mentee profile page for him/her self
- [x] mentee can search the mentors on the basis of tags
- [ ]  mentor can view the follow requests/followers
- [ ] mentor can accept or reject requests
- [ ] mentee can view the profile iff mentor accept his follow request
- [ ] mentee can chat on whatsapp iff mentee is a follower of mentor
