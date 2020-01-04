terraform {
  backend "s3" {
    bucket = "toro-terraform-state"
    key    = "terraform.tfstate"
    region = "us-east-1"
  }
}

module "toro" {
  providers = {
    aws = aws
  }
}