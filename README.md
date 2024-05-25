# Pixlon

Pixlon is a Next.js application designed to allow admins to upload and manage profile pictures, banners, and other related media that can be downloaded by visitors. This project uses Prisma with MongoDB for data management, NextAuth for authentication, and Docker for containerization.

## Features

- User authentication using NextAuth
- Image upload and management
- Prisma ORM for database interactions
- MongoDB as the database
- Docker for containerization

## Prerequisites

- Node.js
- Docker and Docker Compose
- MongoDB

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/pixlon.git
cd pixlon
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables:

```plaintext
DATABASE_URL="mongodb://root:example@mongo:27017/mydatabase?authSource=admin"
NEXTAUTH_URL="http://localhost:3000"
IMAGE_UPLOAD_DIR="/app/public/uploads"
```

### 4. Docker Setup

Ensure Docker and Docker Compose are installed on your machine. Then, build and start the Docker containers:

```bash
docker-compose build
docker-compose up
```

### 5. Access the Application

The application will be available at `http://localhost:3000`.

## Project Structure

- `app/` - Contains the Next.js pages
- `app/api/` - Contains the API routes
- `lib/` - Contains configuration files and utility functions
- `models/` - Contains Mongoose models
- `prisma/` - Contains Prisma schema
- `public/uploads/` - Directory to store uploaded images

## API Endpoints

### Image Upload

- **Endpoint**: `POST /api/upload`
- **Description**: Handles image uploads
- **Request Body**: `file` (multipart/form-data)

### Create Admin User

- **Endpoint**: `POST /api/admin/create`
- **Description**: Creates an admin user
- **Request Body**:
  ```json
  {
    "username": "admin",
    "password": "password123"
  }
  ```

## Development

### Running Locally

To run the application locally without Docker:

1. Ensure MongoDB is running locally or adjust `DATABASE_URL` in `.env.local`.
2. Install dependencies and run the development server:

```bash
npm install
npm run dev
```

### Building for Production

To create a production build:

```bash
npm run build
npm start
```

## Troubleshooting

### Common Issues

- **Container Restarting**: Ensure the `next build` command runs successfully during Docker image build.
- **Environment Variables**: Verify that all required environment variables are correctly set in `.env.local`.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [MongoDB](https://www.mongodb.com/)
- [NextAuth](https://next-auth.js.org/)
- [Docker](https://www.docker.com/)