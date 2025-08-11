output "public_ip" {
  description = "Public IP address of the VM"
  value       = module.vm.public_ip
}

output "vm_id" {
  description = "ID of the VM"
  value       = module.vm.vm_id
}
