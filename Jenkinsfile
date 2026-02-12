pipeline {
    agent any

    environment {
        IMAGE_NAME = "node-deploy"
        CONTAINER_NAME = "express-api"
        PORT = "8088"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh '''
                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true
                '''
            }
        }

        stage('Run New Container') {
            steps {
                sh '''
                docker run -d -p 8088:8088 --name $CONTAINER_NAME $IMAGE_NAME
                '''
            }
        }
    }
}
