pipeline {
    agent any
    parameters {
        string(name: 'VERSION', defaultValue: 'v1', description: 'Application tag version to build (v1, v2, v3)')
        string(name: 'BRANCH', defaultValue: 'main', description: 'Git branch targeted for compilation tracking')
    }
    environment {
        // Step: Match this exact ID label value inside your Jenkins Credentials Provider Store
        DOCKERHUB_CREDENTIALS_ID = 'dockerhub-credentials' 
        IMAGE_NAME = 'yourdockerhubusername/my-devops-app'
    }
    stages {
        stage('Pull SCM Code') {
            steps {
                git branch: "${params.BRANCH}", url: 'https://github.com'
            }
        }
        stage('Docker Image Compilation') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${params.VERSION} ."
            }
        }
        stage('Push Image Registry Registry') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS_ID}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USER')]) {
                        sh "echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USER --password-stdin"
                        sh "docker push ${IMAGE_NAME}:${params.VERSION}"
                    }
                }
            }
        }
    }
}
