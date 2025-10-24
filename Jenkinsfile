pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Image') {
            steps {
                bat 'docker build -t rkhank/status-api:1.0.5 .'
            }
        }

        stage('Login & Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat '''
                    echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                    docker push rkhank/status-api:1.0.5
                    '''
                }
            }
        }

        stage('Deploy (demo)') {
            when {
                expression { currentBuild.currentResult == 'SUCCESS' }
            }
            steps {
                echo '🚀 Deployment step (you can define it later)'
            }
        }
    }
}
