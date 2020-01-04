resource "aws_db_instance" "toro_rds" {
  allocated_storage          = 20
  auto_minor_version_upgrade = false
  availability_zone          = "us-east-1a"
  backup_retention_period    = 7
  backup_window              = "05:27-05:57"
  copy_tags_to_snapshot      = true
  enabled_cloudwatch_logs_exports = [ ]
  engine                          = "mysql"
  engine_version                  = "5.6.44"
  identifier                      = var.environment
  instance_class                  = "db.t2.micro"
  multi_az                        = false
  name                            = var.environment
  port                            = 3306
  storage_encrypted               = false
  storage_type                    = "gp2"
  username                        = "root"
  //password                        = ""
  apply_immediately               = true
  publicly_accessible = true
  deletion_protection       = false

  tags = {
    "workload-type" = "other"
    Environment     = var.environment
  }
}