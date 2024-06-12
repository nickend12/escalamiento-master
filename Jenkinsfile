pipeline {
    agent any

    stages {
        stage('Clonar el repositorio') {
            steps {
                git branch: 'main', credentialsId: 'escalamiento-master', url: 'https://github.com/nickend12/escalamiento-master.git'
            }
        }
        stage('Construir imagen de Docker') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')]) {
                        docker.build('proyectos-micro:v1', "--build-arg MONGO_URI=${MONGO_URI} .")
                    }
                }
            }
        }
        stage('Desplegar contenedores Docker') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')]) {
                        sh """
                            sed 's|\\${MONGO_URI}|${MONGO_URI}|g' docker-compose.yml > docker-compose-update.yml
                            docker-compose -f docker-compose-update.yml up -d
                        """
                    }
                }
            }
        }
    }
    post {
        always {
            emailext (
                subject: "Status del build: ${currentBuild.currentResult}",
                body: "Se ha completado el build. Puede detallar en: ${env.BUILD_URL}",
                to: "oscar.garciajg@est.iudigital.edu.co",  
                from: "jenkins@iudigital.edu.co"
            )
        }
    }
}
