terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 3.0.0"
    }
  }
}

provider "azurerm" {
    resource_provider_registrations = "none"
    features {}
}

module "vm" {
  source = "./modules/vm"
  vm_name = var.vm_name
  resource_group_name = var.resource_group_name
  location = var.location
  admin_username = var.admin_username
  admin_password = var.admin_password
  tags = var.tags
  vm_hostname = var.vm_hostname
}
