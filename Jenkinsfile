pipeline {
    agent any

    parameters {
        string(name: 'MONGO_URI', defaultValue: '', description: 'MongoDB connection string')
    }

    environment {
        MONGO_URI = credentials('mongo-uri-id')
    }

    stages {
        stage('Clonar el Repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/nickend12/escalamiento-master.git'
            }
        }
        stage('Construir imagen de Docker') {
            steps {
                script {
                    docker.build('proyectos-micro:v1', "--build-arg MONGO_URI=${env.MONGO_URI} .")
                }
            }
        }
        stage('Desplegar contenedores Docker') {
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            emailext (
                subject: "Status del build: ${currentBuild.currentResult}",
                body: "El build ha completado. Puede detallar en: ${env.BUILD_URL}",
                to: "oscar.garciajg@est.iudigital.edu.co",
                from: "jenkins@iudigital.edu.co"
            )
        }
    }
}
