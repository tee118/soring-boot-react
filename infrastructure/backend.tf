provider "aws" {
  region = "eu-west-2"
}

terraform {
  backend "s3" {
    bucket         = "statelockterraform"
    key            = "terraform.tfstate"
    region         = "eu-west-2"
    dynamodb_table = "terraform-lock-table"
  }
}
