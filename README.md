# Classroom App
Classroom is a responsive class management web app using MERN Stack. It features a Node.js backend for providing RESTful APIs and uses MongoDB for storage. This project has user authentication and authorization, JWT token authentication, and a polished ReactJS frontend using Material UI and ANT Design. It uses Formik for form management and YUP for validation of the data. The State Management is done by using ReduxJS and Redux Toolkit.

# Features

* User authentication and authorization are done using JWT tokens.
* Formik + Yup for Forms and related Validations.
* Used Axios for RESTful API implementation.
* ReduxJS and Redux Toolkit for State Management.
* Redux Persist for local storage management.
* Toast Notifications.
* Separate level of access for Principal, Teachers and Students.
* MaterialUI and ANT Design for design and interface.

# Credentials

### Principal
* Username : Principal XYZ
* Email : principal@classroom.com
* Password : Admin

### Teachers
* Username : Mr Tom
* Email : tomteach@classroom.com
* Password : asd
* More users can be created

### Students
* Username : John Doe
* Email : johnny@classroom.com
* Password : test1
* More users can be created

# Deployment
* Deployed at : https://classroom-sayanchatt.netlify.app/

## Warnings
* The Backend is deployed on a free server which spins down after inactivity. The first request spins the server back up, which may take some time. The subsequent requests should be faster.
* Due to this slow server response, the payment gateway faces issues. You can download the files and host it on your localhost to get the proper response.
* This isn't a thorough project. Not all routes are provide with Auth Security. Forced API calls can be made and deleting or updating certain entries may cause errors.
  
