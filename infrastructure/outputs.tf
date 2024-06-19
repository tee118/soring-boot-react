output "vpc_id" {
  value = aws_vpc.main.id
}

output "public_subnet_ids" {
  value = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  value = aws_subnet.private[*].id
}

output "security_group_id" {
  value = aws_security_group.main.id
}

output "db_endpoint" {
  value = aws_rds_cluster.default.endpoint
}

output "db_subnet_group_name" {
  value = aws_db_subnet_group.main.name
}
