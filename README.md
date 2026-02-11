Node.js Express TypeScript Deployment

A boilerplate for building a Node.js Express server using TypeScript, containerizing it with Docker, and deploying to AWS ECR & ECS Fargate.

🛠️ Tech Stack

Node.js & Express

TypeScript

Docker

AWS: ECR, ECS Fargate, ALB, CloudWatch

⚡ Project Setup
1. Initialize Node.js & Install Dependencies
# Initialize npm project
npm init -y

# Install runtime dependencies
npm install express

# Install dev dependencies
npm install -D typescript ts-node-dev @types/node @types/express

2. TypeScript Configuration

Initialize TypeScript:

npx tsc --init


Update tsconfig.json:

{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}

3. Project Structure
project-root/
│
├─ src/
│   └─ index.ts
│
├─ dist/       # Compiled output
├─ package.json
├─ tsconfig.json
└─ Dockerfile


Example src/index.ts:

import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

🐳 Docker Setup

Dockerfile example:

# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build TypeScript
RUN npx tsc

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "dist/index.js"]

Build & Test Locally
# Build Docker image
docker build -t node-deploy .

# Run container
docker run -p 3000:3000 node-deploy

☁️ AWS Deployment
1. Configure AWS CLI
aws --version
aws configure


Enter:

aws_access_key_id

aws_secret_access_key

aws_session_token (if needed)

Default region: us-east-1

Default output format: json

Verify identity:

aws sts get-caller-identity

2. Push Docker Image to ECR -- (you can get this using amazon ecr push command)
# Authenticate Docker with ECR
aws ecr get-login-password --region us-east-1 | \
docker login --username AWS --password-stdin 628199441331.dkr.ecr.us-east-1.amazonaws.com

# Tag Docker image
docker tag node-deploy:latest 628199441331.dkr.ecr.us-east-1.amazonaws.com/node-deploy:latest

# Push image
docker push 628199441331.dkr.ecr.us-east-1.amazonaws.com/node-deploy:latest

3. Deploy on ECS Fargate

Create ECS Cluster (Fargate).

Create Task Definition:

Use pushed ECR image

Set CPU/Memory

Map port 3000

Create Service with Application Load Balancer (ALB)

Enable logging with CloudWatch

Test endpoint via ALB DNS

✅ Notes

Ensure TypeScript is compiled before containerization.

Adjust AWS IAM roles for ECS tasks to allow ECR pull and CloudWatch logging.

ALB allows traffic routing to ECS Fargate services.

📦 Scripts (Optional)

Add to package.json:

"scripts": {
  "dev": "ts-node-dev src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}

🎯 References

Express Documentation

TypeScript Documentation

Docker Docs

AWS ECS & ECR Guide