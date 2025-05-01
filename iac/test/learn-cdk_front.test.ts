import * as cdk from "aws-cdk-lib";
import { Match, Template } from "aws-cdk-lib/assertions";
import { LearnCdkFrontStack } from "../lib/learn-cdk_front-stack";  // Ajuste o caminho conforme sua estrutura de diretórios
import path = require("path");

describe("LearnCdkFrontStack", () => {
  const app = new cdk.App();
  const stage = "dev";
  const testPath = path.join(__dirname, '..', '..', 'dist');  // Caminho para os arquivos de build da sua aplicação React
  
  // Cria a stack com propriedades de teste
  const stack = new LearnCdkFrontStack(app, "TestStack", {
    stage: stage,
    path: testPath,
  });
  
  // Sintetiza a stack para gerar o template CloudFormation
  const template = Template.fromStack(stack);

  test("S3 Bucket criado com as configurações corretas", () => {
    // Verifica se um bucket S3 foi criado com o nome esperado
    template.hasResourceProperties("AWS::S3::Bucket", {
      BucketName: `learn-cdk-react-app-${stage}`,
      WebsiteConfiguration: {
        IndexDocument: "index.html",
        ErrorDocument: "index.html",
      },
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: false,
        BlockPublicPolicy: false,
        IgnorePublicAcls: false,
        RestrictPublicBuckets: false,
      },
    });
  });

  test("Política de bucket para acesso público está configurada", () => {
    template.hasResourceProperties("AWS::S3::BucketPolicy", {
      PolicyDocument: {
        Statement: [
          {
            Action: "s3:GetObject",
            Effect: "Allow",
            Principal: {
                "AWS": "*"
            },
            Resource: {
              "Fn::Join": [
                "",
                [
                  {
                    "Fn::GetAtt": [
                      Match.stringLikeRegexp("^reactappbucketdev"),
                      "Arn",
                    ],
                  },
                  "/*",
                ],
              ],
            },
            Sid: "learn-cdk-s3BucketPublicRead",
          },
        ],
      },
    });
  });

  test("CloudFront Distribution criada com configurações corretas", () => {
    template.hasResourceProperties("AWS::CloudFront::Distribution", {
      DistributionConfig: {
        PriceClass: "PriceClass_100",
        Comment: "CloudFront Distro for learn-cdk-react-app",
        DefaultCacheBehavior: {
          TargetOriginId: Match.stringLikeRegexp("learncdkreactappdistodev"),
        },
      },
    });
  });

  test("BucketDeployment criado para enviar os arquivos estáticos", () => {
    // Verifica se o custom resource para BucketDeployment existe
    template.hasResourceProperties("Custom::CDKBucketDeployment", {
      DestinationBucketName: {
        Ref: Match.stringLikeRegexp("reactappbucketdev"),
      },
      DistributionId: {
        Ref: Match.stringLikeRegexp("learncdkreactappdistodev"),
      },
    });
  });

  test("Conta todos os recursos esperados na stack", () => {
    // Verifica o número total de recursos de cada tipo
    template.resourceCountIs("AWS::S3::Bucket", 1);
    template.resourceCountIs("AWS::S3::BucketPolicy", 1);
    template.resourceCountIs("AWS::CloudFront::Distribution", 1);
    // O BucketDeployment cria resources customizados
    template.resourceCountIs("Custom::CDKBucketDeployment", 1);
  });
});