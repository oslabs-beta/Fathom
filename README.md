# Fathom for Kubernetes



<p align="center">
  <img width="350" src="./public/fathom-full-white.png">
</p>


Fathom is an open-source application that provides comprehensive monitoring and analysis of Kubernetes metrics. With Fathom, you can easily monitor the performance and health of your Kubernetes clusters, compare metric snapshots, and gain insights across multiple clusters.

For more information visit our [website](https://www.fathom.nyc)

<br/>

<div align="center">

[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Javascript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://www.javascript.com/)
[![NextJS](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![NextAuth](https://img.shields.io/badge/NextAuth-%23F05033.svg?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://next-auth.js.org/)
[![tRPC](https://img.shields.io/badge/trpc-%235755d9.svg?style=for-the-badge&logo=trpc&logoColor=white)](https://trpc.io/)
[![Prisma](https://img.shields.io/badge/Prisma-%233b3e44?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![Grafana](https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&logo=grafana&logoColor=white)](https://grafana.com/)
[![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white)](https://prometheus.io/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)


</div>

<br/>

## Features
1. Real-time Cluster Monitoring: Get immediate insights into your Kubernetes clusters with real-time monitoring and visually appealing Grafana charts.
2. OAuth for Secure User Authentication: Safeguard user data and access to Fathom through OAuth integration for authentication.
3. Tabbed Navigation between Clusters: Seamlessly switch between multiple clusters within Fathom's interface for efficient management and monitoring.
4. Dashboard Snapshots for Easy Comparison: Capture and save dashboard snapshots to analyze and compare metric trends over time.
5. Flexible Data Storage Options: Choose between local or cloud-hosted databases to store and retrieve dashboard snapshots based on your needs.
6. Dual Dashboard Display: Compare and contrast snapshots side by side with Fathom's dual dashboard display, enabling comprehensive analysis of multiple clusters.


<br/>

# Getting Started

Before you begin, set up your kubernetes cluster with Prometheus, Grafana as external services, and allow embedding - [Example Initializing on Google Kubernetes Engine](https://github.com/oslabs-beta/Fathom/blob/dev/clusterSetup.md) 

Make sure to take note of the Grafana external IP!


## Locally
1. Fork and clone this repo
2. Install dependencies `pnpm install` (optionally, use `npm` as your package manager instead for the remainder of the instructions)
3. Start up the application `pnpm run dev` and visit the localhost address in a web browser
4. Add the Grafana IP of the cluster you want to monitor

## Through Docker-hub
1. Install/run [Docker desktop](https://www.docker.com/products/docker-desktop/)
2. Pull the [docker image](https://hub.docker.com/r/fathomforkubernetes/fathom-beta) `docker pull fathomforkubernetes/fathom-beta`
3. Run the image passing in your oAuth Client_ID and Secret and exposing port 3000 `docker run <br> -e GITHUB_CLIENT_ID=<your_github_client_id> \ -e GOOGLE_CLIENT_ID=<your_google_client_id> \ -e GITHUB_CLIENT_SECRET=<your_github_client_secret> \ -e GOOGLE_CLIENT_SECRET=<your_google_client_secret> \ -p 3000:3000 fathomforkubernetes/fathom-beta:0.1`
4. visit the localhost address in a web browser
5. Add the Grafana IP of the cluster you want to monitor

## Through our website
1. Visit our [application website](https://www.fathom.watch/)
2. Allow insecure content from Site settings
3. Add the Cluster IP of the cluster you want to monitor


<br/>

# Contributing
We appreciate your interest in contributing to Fathom-for-Kubernetes! Whether you want to report a bug, propose new features, or submit improvements to the project, we welcome your contributions.

To contribute to Fathom, please follow these guidelines:

- Fork the repository and create your own branch for the feature/bug fix you intend to work on.

- Ensure that your code adheres to the project's coding conventions and style guidelines.

- Write clear, concise, and well-documented code. Include necessary comments to help others understand your contributions.

- Test your changes thoroughly to ensure they do not introduce any new issues and that existing functionality remains intact.

- Commit your changes and provide a descriptive and meaningful commit message.

- Push your changes to your forked repository.

- Submit a pull request to the main repository, clearly outlining the purpose and details of your contribution. Include any relevant information that helps reviewers understand the context and purpose of your changes.

- Be responsive to feedback and actively participate in discussions related to your pull request.

By contributing to Project Name, you agree that your contributions will be licensed under the [MIT LICENSE](License).

Thank you for your valuable contributions to Fathom! We greatly appreciate your help in making this project even better.


<br/>

# Fathom Team
| Developed By       | Github          | LinkedIn        |
| :------------------: | :-------------: | :-------------: |
| Melissa Armstrong | [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mkarmstr) | [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mkarmstr/) |
| Sun Jin Kim | [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sjin-k) | [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/) |
| Faisal Rahman | [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/fairahman) | [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/faisal-rahman-348a22203/) |
| Wayland Singh | [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/waylandsingh) | [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/wayland-singh/) |
