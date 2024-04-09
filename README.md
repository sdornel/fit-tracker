# fit-tracker

i want to create a full stack application
i will have angular frontend, nestjs backend, postgres database

DB:
3 tables. users, userexercises, exercises -DONE

users will have profile picture, date created, date updated (last logged in), name, email, password -DONE

exercises will be exercise type, distance (optional field), repetitions (optional field), date created -DONE
^ distance and repetitions cannot both be empty -DONE


backend will ideally have full crud
users crud
^ auth with email/password
exercises crud

frontend will have routes!
add auth for login page with email/password
profile page/route (including a user form for updates)
log workouts page/route
^ includes a form to log new activities (distance and reps cannot both be empty)
3rd route with previous workouts showing everything you did on a certain day
