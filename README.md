# fit-tracker

i want to create a full stack application
i will have angular frontend, nestjs backend, postgres database

DB:
3 tables. users, userexercises, exercises -DONE
users will have profile picture, date created, date updated (last logged in), name, email, password -DONE
exercises will have exercise type, distance (optional field), repetitions (optional field), date created, resistance -DONE
^ distance and repetitions cannot both be empty -DONE
join table -DONE


BACKEND
backend will ideally have full crud
users crud -DONE
^ auth with email/password -DONE
exercises crud -DONE
add new DB column for resistance. -DONE
add auth for login page with email/password -DONE
prevent unauthorized users from getting past login page -DONE
==============================================================
need to salt passwords with bcrypt!


FRONTEND
login page -DONE
==============================================================
frontend will have routes! -WIP
profile page/route (including a user form for updates) -WIP
==============================================================
user edit form fields -DONE
user edit file upload functionality
user edit modal should close upon submit
implement logout functionality
log workouts page/route
^ includes a form to log new activities (distance and reps cannot both be empty)
3rd route with previous workouts showing everything you did on a certain day

