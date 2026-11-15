variable "aws_region" {
  description = "AWS region in which to create the instance."
  type        = string
  default     = "ap-south-1"
}

variable "instance_type" {
  description = "EC2 instance type. The default t3.micro provides 1 GiB of memory."
  type        = string
  default     = "t3.micro"
}

variable "vpc_cidr" {
  description = "IPv4 CIDR block for the VPC."
  type        = string
  default     = "10.0.0.0/16"
}

variable "subnet_cidr" {
  description = "IPv4 CIDR block for the public EC2 subnet."
  type        = string
  default     = "10.0.1.0/24"
}

variable "key_name" {
  description = "Name of the existing EC2 key pair in the configured region."
  type        = string
  default     = "linuxkey"
}

variable "ssh_allowed_cidrs" {
  description = "CIDR ranges allowed to connect over SSH."
  type        = list(string)
  default     = ["10.0.0.0/16"]
}

variable "name" {
  description = "Name tag for the instance and security group."
  type        = string
  default     = "redhat-linux"
}
