#!/bin/bash
hostnamectl set-hostname ${vm_hostname}
apt-get update
apt-get install -y docker.io
usermod -aG docker ${admin_username}
systemctl enable docker
systemctl start docker
