// https://blog.devops.dev/devops-jenkins-pipelines-docker-containers-postgres-nodejs-jenkins-520b773c8919

pipeline {
  
  agent any

  environment 
    {
        BRANCH_NAME     = "${GIT_BRANCH}" 
        JOB_NAME        = "${JOB_NAME}"
        BUILD_NUMBER    = "${BUILD_NUMBER}"
        BUILD_URL       = "${BUILD_URL}"
        BUILD_DURATION  = "${currentBuild.duration}"
        GIT_COMMIT_MSG  = "${currentBuild.description}"
        SLACK_CHANNEL   = "#the-danger-zone"
    }  

  stages 
    {

    stage('Starting Build') 
    {
         steps 
            {
                slackSend channel: "${env.SLACK_CHANNEL}",
                          message: "*STARTED: *\n *Jenkins Build Number*: #${env.BUILD_NUMBER}\n *Repository:* ${env.JOB_NAME}\n *Branch:* ${GIT_BRANCH}\n *More Info:* ${BUILD_URL}\n",
                            color: "#439FE0" 
            }
        }

    stage('Docker Container NodeJS - Git Checkout')
    {
        agent 
           {
             docker { image 'node:10.16.3-alpine' }
           }
        steps 
           {
       echo "BRANCH_NAME: $GIT_BRANCH"
       echo "GIT_COMMIT:  $GIT_COMMIT"
       sh   "npm install" 
           } 
    }

    stage('Installing Dependacies')
    {
        agent 
            {
            docker { image 'node:10.16.3-alpine' }
            }
        steps 
            {
            sh 'npm install'
            }
    }

    stage ('Execute Unit Tests')
    {
        agent 
            {
            docker 
                { image 'postgis/postgis' 
                  args '--network="host"'
                }
            }
        steps
        {
            sh "echo some test command /path/to/tests.js"
        }
    }

    stage('Test Passed')
    {
    agent any
    steps 
        {
          sh  'echo Test Coverage Passed.... Build Complete.... Sending Build Completion update.....'
        }
    }
    
    stage('Deploying Code')
    {
    when { expression { return BRANCH_NAME =~ 'develop'} }
    agent {docker {image 'ttruong101/rennie-ansibleNodeJS-1.0.0'}}
    steps 
        {
       script
            {    
            sh """
            #!/bin/bash
            ansible deployment_playbook.yml
            """
            }   
        }
    }
}

    post {
    success 
        {
        slackSend channel: "${env.SLACK_CHANNEL}",
                  message: "*SUCCESS:*\n *Jenkins Build Number*: #${env.BUILD_NUMBER}\n *Repository:* ${env.JOB_NAME}\n *Branch:* ${GIT_BRANCH}\n *More Info:* ${BUILD_URL}\n",
                    color: "#43e06f"
        }
    failure 
        {
        slackSend channel: "${env.SLACK_CHANNEL}",
                  message: "*FAILURE:*\n *Jenkins Build Number*: #${env.BUILD_NUMBER}\n *Repository:* ${env.JOB_NAME}\n *Branch:* ${GIT_BRANCH}\n *More Info:* ${BUILD_URL}\n",
                    color: "#FF5733"
  
        }
    aborted 
        {
        slackSend channel: "${env.SLACK_CHANNEL}",
                  message: "*STOPPED:*\n *Jenkins Build Number*: #${env.BUILD_NUMBER}\n *Repository:* ${env.JOB_NAME}\n *Branch:* ${GIT_BRANCH}\n *More Info:* ${BUILD_URL}\n",
                    color: "##808080"
        }
    }   
}