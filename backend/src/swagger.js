/**
 * @swagger
 * components:
 *   schemas:
 *     User Expense:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         userId:
 *           type: string
 *         expenseId:
 *           type: string
 *         value:
 *           type: integer
 *         dateOfExpense:
 *           type: string
 *         modeOfExpense:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Expense:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         category:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Create Expense:
 *       type: object
 *       properties:
 *         expenseId:
 *           type: integer
 *         userId:
 *           type: string
 *         value:
 *           type: integer
 *         dateOfExpense:
 *           type: string
 *           format: date-time-string
 *         modeOfExpense:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: User Expense
 *   description: API for manage User Expenses
 */

/**
 * @swagger
 * /api/v1/expenses/categories:
 *   get:
 *     summary: Get all Expense Categories
 *     tags: [User Expense]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/expenses/all:
 *   get:
 *     summary: Get a book by ID
 *     tags: [User Expense]
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User Expense'
 *       404:
 *         description: No Expenses   found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/expenses/create:
 *   post:
 *     summary: Add a new book
 *     tags: [User Expense]
 *     requestBody:
 *       description: Create a new expense for an user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Create Expense'
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User Expense'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/expenses/update/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [User Expense]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: User Expense to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             parameters:
 *                updated:
 *                  type: array
 *     responses:
 *       201:
 *         description: Expense updated successfully
 *         content:
 *           application/json:
 *
 *       400:
 *         description: Bad request
 *       404:
 *         description: Exepense not found
 *       500:
 *         description: Internal server error
 */
