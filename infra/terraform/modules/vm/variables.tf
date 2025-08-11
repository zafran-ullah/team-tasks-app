variable "vm_name" {
  type        = string
  description = "Name of the VM"
}

variable "resource_group_name" {
  type        = string
  description = "Name of the resource group"
}

variable "location" {
  type        = string
  description = "Azure region"
}

variable "admin_username" {
  type        = string
  description = "Admin username for VM"
}

variable "admin_password" {
  type        = string
  description = "Admin password for VM"
  sensitive   = true
}

variable "tags" {
  type        = map(string)
  description = "Tags for resources"
  default     = {}
}
variable "vm_hostname" {
  description = "The hostname for the VM."
  type        = string
}
