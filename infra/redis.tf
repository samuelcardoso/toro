resource "aws_elasticache_cluster" "redis_servicesol" {
  engine               = "redis"
  node_type            = "cache.t2.micro"
  cluster_id           = "toro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis5.0"
  engine_version       = "5.0.4"
  port                 = 6379
  tags                 = {
     Environment = var.environment
  }
  apply_immediately = true
}