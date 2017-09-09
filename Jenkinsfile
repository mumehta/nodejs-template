#!/usr/bin/env groovy

try {
		node('ubu-slave-1') {
				stage ('Clean workspace') {
				    deleteDir()
				        sh 'ls -lah'
        }

        stage ('Checkout source') {
          checkout scm
        }

        stage ('Run Test Case') {
              echo 'Running test cases'
              echo "Passed test cases"
        }

        stage 'Build docker image'
              println "Building and packaging nodejs template application"
              sh 'sleep 5'
              def img = docker.build('nodejs-template', '.')

       stage 'Publish image'
               echo "Publishing docker images"
               sh "\$(aws ecr get-login --region ap-southeast-2)"
               docker.withRegistry('https://077077460384.dkr.ecr.ap-southeast-2.amazonaws.com', 'ecr:ap-southeast-2:AWS-SVC-ECS') {
                  docker.image('nodejs-template').push('latest')
                  docker.image('nodejs-template').push("build-develop-${env.BUILD_NUMBER}")
                }

        stage 'Pull and deploy app'
              echo "Pulling and deploying app from ECR"
              withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'b0097933-cea0-4729-8b7a-1e1f8702299f', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
				          sh 'aws s3 cp s3://isentia-kube-config/dev/kubeconfig .'
				          sh("kubectl apply --namespace=templates --kubeconfig=kubeconfig -f deployment.yaml --record")
              }
          }
}
catch (exc) {

		echo "Caught: ${exc}"
		String recipient = 'munish.mehta@isentia.com'

		mail subject: "${env.JOB_NAME} (${env.BUILD_NUMBER}) failed",
						body: "It appears that ${env.BUILD_URL} is failing, somebody should do something about that",
							to: recipient,
				 replyTo: recipient,
						from: 'isentia.jenkins@gmail.com'
}
