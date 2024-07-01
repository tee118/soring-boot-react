# REACT APP SPRINGBOOT BACKEND 

## Overview
This project is a full-stack application consisting of a React frontend and a Spring Boot REST API backend, packaged as a single module Maven application. The application is deployed on AWS using Docker containers managed by ECS Fargate. Infrastructure is provisioned using Terraform, and CI/CD pipelines are implemented with GitHub Actions.


## CI/CD Pipelines

### Frontend CI/CD (`frontend.yaml`)
- **Steps:**
  1. Checkout code
  2. Install Node.js
  3. Install dependencies
  4. Build frontend
  5. Configure AWS credentials
  6. Create ECR repository if it doesn't exist
  7. Login to AWS ECR
  8. Build, tag, and push frontend Docker image
  9. Apply Terraform configuration

### Backend CI/CD (`backend.yaml`)
- **Steps:**
  1. Checkout code
  2. Set up JDK 11
  3. Install Maven
  4. Build with Maven
  5. Configure AWS credentials
  6. Create ECR repository if it doesn't exist
  7. Login to AWS ECR
  8. Build, tag, and push backend Docker image
  9. Apply Terraform configuration

### Terraform Destroy (`destroy.yaml`)
- **Steps:**
  1. Checkout code
  2. Set up Terraform
  3. Configure AWS credentials
  4. Initialize Terraform
  5. Destroy Terraform-managed infrastructure

## Infrastructure as Code (IaC)

### Terraform Configuration

#### `main.tf`
- **Resources:**
  - VPC, subnets, internet gateway, NAT gateway, route tables
  - Security group
  - ECR repositories for backend and frontend
  - IAM roles and policies for ECS tasks
  - CloudWatch log groups
  - ECS cluster and task definitions for backend and frontend
  - ECS services for backend and frontend
  - VPC endpoints for ECR, S3, CloudWatch Logs, and Secrets Manager

#### `outputs.tf`
- **Outputs:**
  - VPC ID
  - Public subnet IDs
  - Private subnet IDs
  - Security group ID

#### `variables.tf`
- **Variables:**
  - `db_username`: The username for the RDS instance
  - `db_password`: The password for the RDS instance
  - `db_name`: The name of the database

#### `backend.tf`
- **Provider and Backend Configuration:**
  - AWS provider with region `eu-west-2`
  - Terraform backend configured to use S3 and DynamoDB for state storage and locking

## Deployment Instructions

### Prerequisites
- AWS account with necessary permissions
- GitHub repository with required secrets configured (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_ACCOUNT_ID`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`)

### Steps to Deploy
1. **Fork the Repository:**
   - Fork this repository to your GitHub account.

2. **Configure Secrets:**
   - Add the following secrets to your GitHub repository:
     - `AWS_ACCESS_KEY_ID`
     - `AWS_SECRET_ACCESS_KEY`
     - `AWS_REGION`
     - `AWS_ACCOUNT_ID`
     - `DB_USERNAME`
     - `DB_PASSWORD`
     - `DB_NAME`

3. **Run CI/CD Pipelines:**
   - Trigger the `Frontend CI/CD` and `Backend CI/CD` workflows manually from the GitHub Actions tab to build, deploy, and configure the application.

4. **Destroy Infrastructure:**
   - Trigger the `Terraform Destroy` workflow manually from the GitHub Actions tab to clean up the resources.

## Rationale and Design Choices
- **Separation of Concerns:** Separate CI/CD pipelines for frontend and backend ensure modular and maintainable build processes.
- **Infrastructure as Code (IaC):** Using Terraform allows for version-controlled, repeatable, and auditable infrastructure provisioning.
- **AWS ECS Fargate:** Chosen for its serverless nature, eliminating the need to manage EC2 instances directly.
- **Security and Logging:** IAM roles and policies are configured for secure access to resources. CloudWatch log groups are used for logging.
- **Auto-scaling:** ECS services can be configured for auto-scaling based on load.

## Cleanup/Destroy Functionality
- A dedicated `Terraform Destroy` workflow ensures that all provisioned resources can be safely destroyed, preventing resource leakage and unnecessary costs.