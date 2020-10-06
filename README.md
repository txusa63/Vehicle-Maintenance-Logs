# Vehicle-Maintenance-Logs
A vehicle maintenance log system that uses authentication and authorization.

The app can create an Administrator account that keeps track of the accounts of other users such as employees. The admin will create the accounts of the employees and each employee can log into the system with their respective credentials. 
Once logged in, each employee can see a list of logs if present and can add a log by filling out a form that is opened via a button. 

Once the form is submitted the list will update. These logs are recorded in a MongoDB cloud database. 
The logs appear as a list of buttons. Each button is clickable and once clicked, the button will expand showing all the information. If the button is clicked again, the log collapses again.

Each employee can see his/her own logs. The admin can see all of the information available to all users. 

The app uses route protection and if an unauthorized user tries to manually enter the route to the page where the todos are located, the app will always redirect the user to the login page.

# Available Scripts
In the project directory, you can run:

# npm run dev
Runs the whole app by running the client-side and server-side code at the same time.
Open http://localhost:3000 to view it in the browser.
