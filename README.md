**DEVIGET Challenge**	
	For this challenge I've used the following 	technologies/platforms
* **React**
The frontend is written in ReactJS using the module "create-react-app" as scaffold.
I use Hooks and Redux to get all the state info in an only place.
* **Express**
The backend is written in the NodeJS framework ExpressJS, using 
the express-generator module as scaffolding
  **Mongo**
  As DB, I use MongoDB which manages data json alike data and stores it in collections
**AWS EC2**
 The app is uploaded in a Amazon EC2 Server
 **Mongo ATLAS**
 The database Mongo is hosted in Mongo ATLAS.
There are two collections:
   **Users**
      it manages the accounts/login in the system
	**Games** 
	It manages games, including the rows, cols, mines, timer, and current state which are one in 'active', 'win', 'defeat'

 You need to  in first to play the game:

 API DOCS http://ec2-54-167-152-205.compute-1.amazonaws.com:3000/api-docs/