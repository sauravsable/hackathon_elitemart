Project Title: EliteMart - A Collaborative Shopping Solution

Problem Statement:
Our prototype addresses the inefficiencies of collaborative shopping in e-commerce. Currently, users rely on external messaging apps to share product links, discuss options, and then return to the e-commerce platform to finalize purchases. This process is frustrating, time-consuming, and often results in lost links or miscommunication. Our solution streamlines this experience by enabling multiple users to add products    to a shared cart and discuss them in real-time within the platform. Whether it’s friends choosing a gift, a family making home purchases, or roommates selecting groceries, our prototype eliminates the need for external coordination, making group shopping more efficient and seamless.

Solution Overview: 
Group Cart is an innovative feature that enables seamless collaborative shopping by allowing multiple users to create and share a shopping cart within an e-commerce platform. Instead of switching between messaging apps and the e-commerce site, users can add products, invite others, and discuss purchases in real time—all in one place.

Setup & Installation Guide
  Prerequisites
  Ensure you have the following software installed:
    • Node.js v18+
  
  Follow these step-by-step instructions to set up and run the project.
    1. Clone the Repository
          Open Git Bash and run:
          git clone https://github.com/sauravsable/hackathon_elitemart.git
    
    2. Navigate to the Project Directory
          cd hackathon_elitemart
    
    3. Install Dependencies	
          Navigate to both the frontend and backend folders and install dependencies:
            cd frontend  
            npm install –force  // Dependencies Conflicts
            cd backend  
            npm install  
            
    4. Set Up Environment Variables
          •	Create a .env file inside the backend folder.
          •	Steps to get Environment Variables:

      1.	MongoDB URI (env variable - MONGO_URI)
           • Go to MongoDB Atlas.
           • Create a free cluster or log in to your existing cluster.
           • Click on Database Deployments → Connect.
           • Choose "Connect your application".
           • Copy the connection string (it looks like this) mongodb+srv://<username>:<password>@cluster0.utg2cxw.mongodb.net/<Database_Name>
           • Replace <username>, <password>, and <database> with your values.

      2.	Steps to Get Aws Access Key, Aws Secret Key  (env variable - AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
          • Log in to AWS Console
          • Go to AWS Console
          • In the AWS Console, search for IAM.
          • Click IAM to open the IAM service.
          • Create a New IAM User
          • Click Users in the left panel.
          • Click Add users.
          • Enter a username (e.g., elitemart).
          • Select Access key - Programmatic access.
          • Set Permissions for the User
          • Choose "Attach policies directly".
          • Attach the policies.
          • Click Next.
          • Create the User and Get Credentials
          • Click Create user.
          • Copy the Access Key ID and Secret Access Key.

      3.	Create an S3 Bucket (env variable – BUCKET, AWS_REGION)
          • Go to the AWS S3 Console
          • Open the S3 Service.
          • Click "Create bucket".
          • Enter Bucket Details
              o	Bucket name: (e.g., elitemart) → Must be unique.
              o	AWS Region: Select the region where you want the bucket (e.g., us-east-1).
          • Configure Bucket Settings
          • Click Create Bucket
          • Paste that bucket name and region in the env 


      4.	Create an SQS Queue (env variable - AWS_SQS_QUEUE_URL)
          • Go to the AWS SQS Console
          • Open the SQS Service.
          • Click Create queue.
          • Choose Queue Type
          • Select Standard Queue (or FIFO Queue if message order matters).
          • Configure Queue Settings
              o	Queue name: (e.g., my-app-queue).
              o	Visibility timeout: Set it to 30 seconds (or as needed).
              o	Message retention period: Default is 4 days.
              o	Leave other settings as default.
          • Create the Queue
          • Click Create queue.
          • Copy the Queue URL from the console.

      5.	Redis Credentials (env variables - REDIS_HOSTNAME, REDIS_PORT, REDIS_PASSWORD)
          • Go to Redis Cloud.
          • Create a Free Redis database.
          • Get: 
              o	REDIS_HOSTNAME
              o	REDIS_PORT
              o	REDIS_PASSWORD

      6.	OAuth Credentials (env variables - user, clientID, clientSecret, refreshToken, accessToken)
          User is the Email that you are using for google console
            • Go to Google Cloud Console.
            • Create a new project and enable OAuth 2.0.
            • Navigate to APIs & Services → Credentials.
            • Click Create Credentials → OAuth 2.0 Client ID.
            • Get: 
                o	ClientID
                o	clientSecret
            • Generate a refresh token using Google OAuth Playground: 
                o	Visit OAuth Playground.
                o	Select Gmail API → Authorize.
                o	Exchange for a refreshToken.
                o	Get the access token and refresh token.

      7.	Stripe API Keys (env variables - STRIPE_API_KEY, STRIPE_SECRET_KEY)
          • Go to Stripe Dashboard.
          • Navigate to Developers → API Keys.
          • Copy: 
              o	STRIPE_API_KEY (Public key)
              o	STRIPE_SECRET_KEY (Secret key)

      8.	Remaining Environment Variables
          • JWT_SECRET = any string
          • JWT_EXPIRE = 5d
          • COOKIE_EXPIRE = 5
          • SESSION_SECRET = "any size string"
          • SECRET_KEY= "any size string"

5.	 Start Zookeeper & Kafka –
     Go to app.js and paste your IP_Address at line number 92 ( brokers: ["IP_ADDRESS:9092"])
     Firstly you need to install Docker Desktop 
     Run the following commands in Terminal:
        •	To Start Zookeeper
            docker run -p 2181:2181 zookeeper
        •	To start Kafka
            docker run -d --name kafka`
            -p 9092:9092 `
            -e KAFKA_ZOOKEEPER_CONNECT=<YOUR_IP_ADDRESS>:2181 `
            -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<YOUR_IP_ADDRESS>:9092`
            -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 `
             confluentinc/cp-kafka

6.	Run the Project
   Start both the frontend and backend:
   cd frontend  
   npm start  
   cd ./backend  
   npm start  
   Your project should now be up and running!


How to Test the Prototype
    •	Register & Verify Email (Token-Based Verification)
      o	Create Account 1 (Admin)
        	Sign up with email & password.
        	Receive a verification email with a secure token.
        	Click the link to verify your email.
      o	Create Account 2 (User)
         Repeat the same steps for another account.
         Keep this account in the user role.

    •	Change One Account to Admin (Database Update)
      o	Open your database (MongoDB).
      o	Find Account 1 (Admin) in the users collection.
      o	Change the role from "user" to "admin".
      o	Log out and log back in.

    •	Add New Products (Admin Only)
      o	Go to the Add Product.
      o	Fill in product details (name, price, image, etc.).
      o	Click Submit, and the product will be added.

    •	Create & Manage Carts
      o	Create a cart with a unique name (Group Cart).
      o	Search for users to invite.
      o	The system sends an email invitation with a secure token.
      o	The invited user clicks the link → Token is verified → Access is granted.

    •	Add Products to a Cart & Real-Time Updates
      o	Choose a product and select a cart (personal/group).
      o	Product is added, and all cart members see updates instantly.
      o	Members can discuss the product in the chat section.
    
    •	Now You can place the order or skip it.

API Documentation

1. User Authentication & Management
    1. Register User
      •	Endpoint: POST /register
      •	Body: { name, email, password }
      •	Response: { "message": "An Email sent to your account, please verify" }

    2. Verify Email
      •	Endpoint: GET /users/:id/verify/:token
      •	Response: { "message": "Email verified successfully" }

    3. Login User
      •	Endpoint: POST /login
      •	Body: { email, password }
      •	Response: { "success": true, Store Token in Cookie }

    4. Forgot Password
      •	Endpoint: POST /password/forgot
      •	Body: { email }
      •	Response: { "message": "Password reset email sent" }

    5. Reset Password
      •	Endpoint: PUT /password/reset/:token
      •	Body: { password, confirmPassword }
      •	Response: { "message": "Password reset successfully" }

    6. Logout
      •	Endpoint: GET /logout
      •	Response: { "message": "Logged out" }

    7. Get User Details
      •	Endpoint: GET /me (Auth Required)
      •	Response: { user }

    8. Update Password
      •	Endpoint: PUT /password/update (Auth Required)
      •	Body: { oldPassword, newPassword, confirmPassword }
      •	Response: { "message": "Password updated successfully" }

    9. Update Profile
      •	Endpoint: PUT /me/update (Auth Required)
      •	Body: { name, email }
      •	Response: { "success": true }

    10. Update Profile Image
      •	Endpoint: PUT /me/updateProfileImage (Auth Required)
      •	Body: avatar (file)
      •	Response: { "success": true }

    11. Get All Users
      •	Endpoint: GET /users (Auth Required)
      •	Response: { "users": [...] }


2.	Product Management
    1. Get All Products
      •	Endpoint: GET /products
      •	Response: { "products": [...] }

    2. Get Product Details
      •	Endpoint: GET /product/:id
      •	Response: { "product": { "id": "123", "name": "Phone" } }

  	3. Search Products
      •	Endpoint: GET /allproducts?keyword=phone
      •	Response: { "products": [...] }

  	4. Create New Product (Admin Only)
      •	Endpoint: POST /admin/product/new (Auth Required)
      •	Body: { name, price, category, images }
      •	Response: { "message": "Product created successfully" }


4.	Payment Processing
    1. Process Payment
      •	Endpoint: POST /payment/process (Auth Required)
      •	Body: { amount, currency, paymentMethodId }
      •	Response: { "message": "Payment successful" }

  	2. Get Stripe API Key
      •	Endpoint: GET /a/stripeapikey (Auth Required)
      •	Response: { "stripeApiKey": "pk_test_123456" }

6.	Order Management
    1. Create Order
      •	Endpoint: POST /order/new (Auth Required)
      •	Body: { cartId, totalAmount, paymentStatus }
      •	Response: { "message": "Order placed successfully" }

  	2. Get Order Details
      •	Endpoint: GET /order/:id (Auth Required)
      •	Response: { "order": { "id": "123", "status": "Processing" } }

    3. Get User Orders
      •	Endpoint: GET /myorders (Auth Required)
      •	Response: { "orders": [...] }

5.	 Cart Management
    1. Create a New Cart
      •	Endpoint: POST /create/cart (Auth Required)
      •	Body: { cartname }
      •	Response: { "message": "Cart Created Successfully" }

  	 2. Get All Carts of User
      •	Endpoint: GET /getcarts (Auth Required)
      •	Response: { "carts": [...] }
    
    3. Get Cart Details
      •	Endpoint: GET /getcartDetails/:id (Auth Required)
      •	Response: { "cartDetails": { ... } }

    4. Remove Cart
      •	Endpoint: POST /removeCart (Auth Required)
      •	Body: { cartId }
      •	Response: { "message": "Cart Deleted Successfully" }

    5. Send Cart Invitation
      •	Endpoint: POST /send-cart-invitation (Auth Required)
      •	Body: { cartId, userId }
      •	Response: { "message": "Invitation sent" }
    
    6. Accept Cart Invitation
      •	Endpoint: POST /accept-invitation
      •	Body: { cartId, userId, token }
      •	Response: { "message": "Invitation accepted" }
    
    7. Reject Cart Invitation
      •	Endpoint: POST /reject-invitation
      •	Body: { cartId, userId, token }
      •	Response: { "message": "Invitation rejected" }

    8. Remove User from Cart
      •	Endpoint: POST /remove-cart-member (Auth Required)
      •	Body: { cartId, userId }
      •	Response: { "message": "User removed from cart" }

    9. Add Product to Cart
      •	Endpoint: POST /add-product-to-cart (Auth Required)
      •	Body: { cartId, productId, quantity }
      •	Response: { "message": "Product added/updated in the cart" }
    
    10. Remove Product from Cart
      •	Endpoint: POST /remove-product-from-cart (Auth Required)
      •	Body: { cartId, productId }
      •	Response: { "message": "Product removed from the cart" }
    
    11. Remove All Products from Cart
      •	Endpoint: POST /remove-all-products-from-cart (Auth Required)
      •	Body: { cartId }
      •	Response: { "message": "All products removed from the cart" }

