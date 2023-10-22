# Full_Stack_project_7
A full-stack property management system built using React, Material-UI, Node.js, Express, and MySQL, following the MVC (Model-View-Controller) architecture. 
## Project Overview 
The Property Management System is designed to help property management companies efficiently manage their properties and provide tenants with easy access to property details and reporting capabilities.
 Key features of the system include:
  - Tenant Login:
    -  View property details, such as Garbage Removal Times and General Payment Details. 
    - Make payments securely online.
    - Report faults in the building, including cleaning faults, maintenance faults, or special requests. 
    - Upload pictures to accompany fault reports. 
   - Manager Dashboard: 
     - Access a comprehensive overview of tenant details, including payment history and reported faults. 
     - Modify property details and manage tenant accounts. 
  ## Technologies Used  
  -  **Frontend:**  
     - React
     - Material-UI
  -  **Backend:** 
       - Node.js
       - Express
       - MySQL
  ## Database Setup  
  1.  **Database Initialization:**  
  - Create a MySQL database named `project7`. 
  - You can use the provided `tebels.txt` file to import the initial database structure and data. 
  2.  **Environment Variables:**  
  - Create a `.env` file in the `server` directory to store environment variables required for the application. Populate it with the following data:
   ```dotenv 
   ACCESS_TOKEN_SECRET=a_secret_token 
   REFRESH_TOKEN_SECRET=a_different_secret_token 
   DB_HOST=localhost 
   DB_USER=root 
   DB_PASSWORD=user's_password 
   DB_NAME=project7
   ```
   Replace the placeholder values with your actual secrets and database connection details.
## Getting Started 
Follow these steps to get the Property Management System up and running on your local machine: 
-  **Clone the repository:** 
```bash
git clone https://github.com/KobiPollak/Full_Stack_project_7
```
- **Install dependencies**:
```bash 
# Install frontend dependencies
cd client/project_7
npm install

# Install backend dependencies
cd ../../server
npm install
```
- **Run the application:**
```bash
# Start the backend server 
 cd server 
 npm start 
 # Start the frontend development server  
 cd ../client/project_7
 npm start
 ```
