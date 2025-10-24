pipeline { 
  agent any

  environment {
    IMAGE = "rkhank/status-api"
    TAG = "1.0.${env.BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Install') { steps { bat 'npm install' } }
    stage('Build Image') { steps { bat "docker build -t %IMAGE%:%TAG% ." } }

    stage('Login & Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          bat """
            echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
            docker push %IMAGE%:%TAG%
          """
        }
      }
    }

    stage('Deploy (demo)') {
      steps {
        bat """
          docker stop status-api || echo stopped
          docker rm status-api || echo removed
          docker run -d --name status-api -p 3000:3000 %IMAGE%:%TAG%
        """
      }
    }
  }
}
