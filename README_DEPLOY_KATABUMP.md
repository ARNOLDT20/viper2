Deployment notes — generic Docker/Kubernetes steps

1) Build Docker image locally

```bash
# from repo root
docker build -t YOUR_REGISTRY/viper-22:latest .
```

2) Push image to a container registry (Docker Hub / private registry)

```bash
docker push YOUR_REGISTRY/viper-22:latest
```

3) Deploy to your platform (example: Kubernetes)

```bash
# update k8s/deployment.yaml image to YOUR_REGISTRY/viper-22:latest then:
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

4) If your platform uses Procfile/Git deploy (Heroku-like)

```bash
# Use the provided Procfile. For Heroku-style deploys either use git push heroku main
# or use the platform UI to deploy the Docker image.
```

Notes:
- Replace `YOUR_REGISTRY` with docker.io/youruser or your private registry path.
- If you need environment variables, add them via your platform UI, or in k8s create a Secret/ConfigMap and reference it in the pod spec.
- For platforms with limited persistent storage, ensure `data/` files are stored externally if needed.
