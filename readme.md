# Curiosum Task

1. Open the Curiosum folder in VScode or any other editor.

2. Make sure you have mongoDb and nodeJs installed and running on your local machine.

3. Change the path of the terminal to the working directory "Curiosum", In the terminal type:

> node app.js

4. Hopefully, you'll get the message in the console:

> "Server has started".

5. Now open a web browser.In the address bar, type:

> localhost:3000

6. You are in the homepage now. To get the list of primes use the input box on the homepage and input accordingly. And press the Get primes list button, you'll get the list. After this go back to the home -----> 

> localhost:3000

7. Add users using the add users link. I've made sure that the added Email and phone number are unique everytime. And the email is added in right format.

8. Add contacts using the add contacts link. It will add a contact in the contacts collection and also connect the contacts collection to all the users. 

9. In case you delete a contact, its reference will be removed from the users collection when you click on the "show user info" link, in the homepage.

10. To validate that the contacts are connected to the user you can see on the "show user info" page that the "Contact count" changes everytime you add or remove a contact.(You can remove a contact by using db.contacts.remove({query}) method).

11. In case you want to add a new user after adding the contact/contacts then after adding the new user/users, go to the homepage and click **"Refrence all existing contact...."** button. This will add a refrence of contacts to the new users too.

**For any query mail me on mehul170104047@iitg.ac.in or call me on 9079776448**


