# goal-tracker

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

FRONTEND AND BACKEND
user edit file upload and fetch functionality -DONE (but...)
^ when i update a user photo i need to delete the old photo in uploads folder
^ i don't really like how i did it but for now i will leave it as is

Ability to delete account and retrieve forgotten password

FRONTEND
user edit form fields -DONE
user edit file upload functionality -DONE
login page -DONE
==============================================================
frontend will have routes! -WIP
profile page/route (including a user form for updates) -WIP
==============================================================
user edit modal should close upon submit -DONE
implement logout functionality
log workouts page/route
^ includes a form to log new activities (distance and reps cannot both be empty)
3rd route with previous workouts showing everything you did on a certain day

new landing page:
* Welcome Message: Display a greeting based on the time of day (e.g., "Good morning, [Username]!").
* Quick Stats: Show a brief overview of the day's or week's progress, like calories burned or minutes exercised.
somewhere mention in bigger words "you only fail when you stop trying" or "a comfort zone is a beautiful place but nothing grows there"? this would help with too much whitespace
