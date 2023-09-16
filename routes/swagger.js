

// Start Schemas

//User Schemas
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - display_name
 *         - password
 *         - is_admin
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user.
 *           unique: true
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *           unique: true
 *         display_name:
 *           type: string
 *           description: The display name of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         is_admin:
 *           type: boolean
 *           description: Indicates whether the user is an admin or not.
 *         phone_number:
 *           type: string
 *           description: The phone number of the user.
 *       timestamps:
 *         type: object
 *         properties:
 *           createdAt:
 *             type: string
 *             format: date-time
 *             description: The date and time when the user was created.
 *           updatedAt:
 *             type: string
 *             format: date-time
 *             description: The date and time when the user was last updated.
 *       example:
 *         username: john
 *         email: john@domin.com
 *         display_name: John Doe
 *         password: john
 *         is_admin: "false"
 *         phone_number: +1234567890
 */

//Category Schemas
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - create_by
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the category.
 *           unique: true
 *         desc:
 *           type: string
 *           description: The description of the category.
 *         create_by:
 *           type: string
 *           format: uuid
 *           description: The ID of the user who created the category.
 *       timestamps:
 *         type: object
 *         properties:
 *           createdAt:
 *             type: string
 *             format: date-time
 *             description: The date and time when the category was created.
 *           updatedAt:
 *             type: string
 *             format: date-time
 *             description: The date and time when the category was last updated.
 *       example:
 *         name: Example Category
 *         desc: This is an example category.
 *         create_by: 60f5a2d710a9b507f0328f41
 */

//Tickit Schemas
/**
 * @swagger
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       required:
 *         - title
 *         - status
 *         - create_by
 *         - category
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the ticket.
 *         description:
 *           type: string
 *           description: The description of the ticket.
 *         status:
 *           type: string
 *           enum: [open, close, in_progress, hold]
 *           default: open
 *           description: The status of the ticket. Must be one of open, close, in_progress, hold.
 *         end_date:
 *           type: string
 *           format: date
 *           description: The end date of the ticket (if applicable).
 *         create_by:
 *           type: string
 *           format: uuid
 *           description: The ID of the user who created the ticket.
 *         Assign_to:
 *           type: string
 *           format: uuid
 *           description: The ID of the user to whom the ticket is assigned (if applicable).
 *         category:
 *           type: string
 *           format: uuid
 *           description: The ID of the category to which the ticket belongs.
 *       example:
 *         title: Example Ticket
 *         description: This is an example ticket.
 *         status: open
 *         end_date: '2023-09-30'
 *         create_by: 60f5a2d710a9b507f0328f41
 *         Assign_to: 60f5a2d710a9b507f0328f42
 *         category: 60f5a2d710a9b507f0328f43
 */

// End Schemas




//Start Users : 

//Create Authentication Tag
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication operations
 */
//Add login 
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in to the application
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       401:
 *         description: Unauthorized
 */
//Add register
/** 
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *            
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad Request
 */
//Vreate User Management Tag
/**
 * @swagger
 * tags:
 *   name: User Management
 *   description: User management operations
 */
//Add create uesr 
/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
//Add update user
/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
//Add delete user
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
//Add get user by id
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
//Add Get a list of users
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get a list of users
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */


//End User


//Start Category

//Create Category Tag
/**
 * @swagger
 * tags:
 *   name: Category Management
 *   description: Category management operations
 */

//Add Get a list of categories
/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get a list of categories
 *     tags: [Category Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

//Add Get a category by ID
/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Category Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to retrieve
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 */

//Add Update a category by ID
/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Category Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 */

//Add Delete a category by ID
/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Category Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to delete
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 */

//Add Create a new category
/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Category Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       400:
 *         description: Bad Request
 */

//End Category



//Start Ticket

//Create Ticket Tag
/**
 * @swagger
 * tags:
 *   name: Ticket Management
 *   description: Ticket management operations
 */

//Add Create a new ticket
/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Create a new ticket
 *     tags: [Ticket Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */

//Add Update a ticket by ID
/**
 * @swagger
 * /api/tickets/{id}:
 *   patch:
 *     summary: Update a ticket by ID
 *     tags: [Ticket Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ticket to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       200:
 *         description: Ticket updated successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ticket not found
 */

//Add Update the status of a ticket by ID
/**
 * @swagger
 * /api/ticketsStatus/{id}:
 *   put:
 *     summary: Update the status of a ticket by ID
 *     tags: [Ticket Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ticket to update
 *     responses:
 *       200:
 *         description: Ticket status updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ticket not found
 */

//Add Pick up a ticket by ID
/**
 * @swagger
 * /api/tickets/pickup/{id}:
 *   put:
 *     summary: Pick up a ticket by ID
 *     tags: [Ticket Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ticket to pick up
 *     responses:
 *       200:
 *         description: Ticket picked up successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ticket not found
 */

//Add Pick down a ticket by ID
/**
 * @swagger
 * /api/tickets/pickdown/{id}:
 *   put:
 *     summary: Pick down a ticket by ID
 *     tags: [Ticket Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ticket to pick down
 *     responses:
 *       200:
 *         description: Ticket picked down successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ticket not found
 */

//Add Delete a ticket by ID
/**
 * @swagger
 * /api/tickets/{id}:
 *   delete:
 *     summary: Delete a ticket by ID
 *     tags: [Ticket Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ticket to delete
 *     responses:
 *       204:
 *         description: Ticket deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ticket not found
 */

//Add Get a list of tickets
/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Get a list of tickets
 *     tags: [Ticket Management]
 *     responses:
 *       200:
 *         description: List of tickets retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 *       401:
 *         description: Unauthorized
 */

//Add Get a ticket by ID
/**
 * @swagger
 * /api/tickets/{id}:
 *   get:
 *     summary: Get a ticket by ID
 *     tags: [Ticket Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ticket to retrieve
 *     responses:
 *       200:
 *         description: Ticket retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ticket not found
 */

//End Ticket
