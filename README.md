
# Team Tasks App

## Overview
A minimal authenticated Next.js app (App Router) with Supabase backend, containerized with Docker, provisioned via Terraform, and deployed using GitHub Actions.

## Features
- Supabase Auth (Email OTP/Magic Link)
- CRUD for personal tasks
- Row Level Security (RLS)
- Dockerized deployment
- Infrastructure as Code (Terraform)
- CI/CD with GitHub Actions

## Architecture Diagram (ASCII)

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│  User       │ <--> │  Next.js    │ <--> │  Supabase   │
└─────────────┘      └─────────────┘      └─────────────┘
	   │                  │
	   ▼                  ▼
   GitHub Actions      Terraform
	   │                  │
	   ▼                  ▼
   Docker Image      Cloud VM
```

## Repo Structure
```
├─ app/ or src/                      # Next.js app
│  ├─ (routes)/...                   # App Router (recommended)
│  ├─ api/healthz/route.ts           # Health endpoint
│  └─ lib/supabase/*                 # Client/server helpers
├─ supabase/
│  ├─ schema.sql                     # table + RLS policies
│  └─ seed.sql                       # optional dev seed
├─ infra/
│  └─ terraform/
│     ├─ main.tf
│     ├─ variables.tf
│     ├─ outputs.tf
│     └─ cloud-init.sh               # or provisioner scripts
├─ .github/workflows/deploy.yml      # CI/CD
├─ Dockerfile
├─ docker-compose.yml                # optional
├─ .dockerignore
├─ README.md
└─ LICENSE (optional)
```

## Setup Instructions

### 1. Clone & Install
```bash
git clone <repo-url>
cd <project-folder>
pnpm install
```

### 2. Supabase
- Create a Supabase project.
- Set up Auth and `tasks` table.
- Enable RLS and apply policies.
- Add your Supabase keys to `.env.local`.

### 3. Run Locally
```bash
pnpm dev
```

### 4. Docker
```bash
docker build -t team-tasks .
docker run -p 3000:3000 team-tasks
```

### 5. Terraform
- Configure cloud provider credentials.
- Run `terraform init` and `terraform apply` in `infra/terraform/`.

### 6. GitHub Actions
- Push to main branch to trigger deployment.

## Config & Secrets
Use GitHub Encrypted Secrets for:
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SERVICE_ROLE_KEY` (if needed server-side).
- VM connection: `VM_HOST`, `VM_USER`, `VM_SSH_KEY`, `VM_SSH_PORT` (if not 22).
- Registry creds if needed.

## Trade-offs & Next Steps
- See Task.md for stretch goals and trade-offs.
- If scope is cut, document next steps here.

## License
MIT
