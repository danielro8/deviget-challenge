
# DEVIGET Challenge Minesweeper
	
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
 
 [Minessweeper game URL]
 (http://ec2-54-167-152-205.compute-1.amazonaws.com)
 
 [API DOCUMENTATION WITH SWAGGER]
 http://ec2-54-167-152-205.compute-1.amazonaws.com:3000/api-docs/
 
The **security token** gotten in the **login** is **stored** in a  **cookie** and sent in the **Authorization header** as a **bearer token**.

There are two **collections**:

   **Users**
      it manages the accounts/login in the system
	 **Registration**
	 A **user** can register in **/registration**
	 The **name, email, password and confirm password ** 	
	After the **registration**, you will be redirected to the home where  you can choose **start a game or resume a game**.
	
**Login**
	You can **login** in **/login**, where you need to input your **email and password** of your **account**
	Then you will be redirected to the home page where  you can choose **start a game or resume a game**.
**Logout**
You can **logout** by clicking in the **logout** link in the **header**

**Games** 
	It manages **games** including the **rows, cols, mines, timer**, and current **state** which are one in **'active', 'win', 'defeat'**
**Starting a game**
You can play a **new game** by clicking in the **Start a game** button in the **home**, or **go directly** to **/start-game**
You will have a form for choosing the **game parameters** **rows**, **cols** and **mines**.
The **game** will show the **minesweeper game** with **the parameters** set up previously with a **timer**.
Next to the **timer**, you will have a **restart  button** which will go to the **home** and a **save button** to **save** the **game**.

**Resuming a game**
You can **resume a game**, previously  **saved** with the **save button**, 
by clicking in the **"Resume a game" button** in the **home**, or going directly to **/resume-game**
There, you will have a **list of active games**, showing the **date and the rows, cols, mines, and timer**.
You can then **resume** a **game** by clicking in the **Resume button** of a specific game.