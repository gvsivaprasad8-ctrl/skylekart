output "instance_id" {
  description = "ID of the RHEL EC2 instance."
  value       = module.ec2_instance.id
}

output "public_ip" {
  description = "Public IPv4 address of the instance."
  value       = module.ec2_instance.public_ip
}

output "ami_id" {
  description = "RHEL 9 AMI selected in the configured region."
  value       = module.ec2_instance.ami
}

output "vpc_id" {
  description = "ID of the VPC created for the EC2 instance."
  value       = aws_vpc.main.id
}

output "subnet_id" {
  description = "ID of the public subnet created for the EC2 instance."
  value       = aws_subnet.ec2.id
}
