# Assignment 2

This Express application utilizes TypeScript to manage products and orders effectively. It provides APIs for various CRUD operations related to products and orders management.

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/mdyasenrafe/assignment-2
cd assignment_2
yarn
```

## # Running the Application

To start the application in development mode :

```bash
yarn dev
```

To start the application in production mode:

```bash
yarn start
```

## API Routes

### Products Routes

- GET /api/products - Retrieve all products or search for products with a query ?searchTerm=your_search_term.
- POST /api/products - Create a new product.
- GET /api/products/:productId - Get a specific product by its ID.
- PUT /api/products/:productId - Update details of a specific product by its ID.
- DELETE /api/products/:productId - Delete a specific product by its ID.

### Orders Routes

- GET /api/orders - Retrieve all orders or filter by email with ?email=user@example.com.
- POST /api/orders - Create a new order based on product ID and quantity.

## Live Deployment

Visit the live application at [live website](https://assignment-2-five-rust.vercel.app/). The [live version](https://assignment-2-five-rust.vercel.app/) supports all the operations described above.

Testing with Postman
To test these APIs, you can use Postman:

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/23250497-e1316df0-d22a-49fc-b71f-953d42e0d88d?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D23250497-e1316df0-d22a-49fc-b71f-953d42e0d88d%26entityType%3Dcollection%26workspaceId%3D26545fbb-51aa-48f2-b7b0-b77dc36dc3fd)
