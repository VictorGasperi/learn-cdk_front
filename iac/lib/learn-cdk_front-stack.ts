import * as cdk from "aws-cdk-lib";
import { BlockPublicAccess } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface LearnCdkFrontProps extends cdk.StackProps {
  stage?: string;
  path: string;
}

export class LearnCdkFrontStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: LearnCdkFrontProps) {
    super(scope, id, props);

    const { stage, path } = props;
    console.log(stage);

    const staticWebsiteBucket = new cdk.aws_s3.Bucket(
      this,
      `react-app-bucket-${stage}`,
      {
        bucketName: `learn-cdk-react-app-${stage}`,
        websiteIndexDocument: "index.html",
        websiteErrorDocument: "index.html",
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        blockPublicAccess: new cdk.aws_s3.BlockPublicAccess({
          blockPublicAcls: false,
          ignorePublicAcls: false,
          blockPublicPolicy: false,
          restrictPublicBuckets: false
        }),
        publicReadAccess: false
      }
    );

    staticWebsiteBucket.addToResourcePolicy(
      // torna o bucket publico
      new cdk.aws_iam.PolicyStatement({
        sid: "learn-cdk-s3BucketPublicRead",
        effect: cdk.aws_iam.Effect.ALLOW,
        actions: ["s3:GetObject"],
        principals: [new cdk.aws_iam.ArnPrincipal('*')],
        resources: [`${staticWebsiteBucket.bucketArn}/*`],
      })
    );

    const distribution = new cdk.aws_cloudfront.Distribution(
      this,
      `learn-cdk-react-app-disto-${stage}`,
      {
        priceClass: cdk.aws_cloudfront.PriceClass.PRICE_CLASS_100,
        defaultBehavior: {
          origin: new cdk.aws_cloudfront_origins.S3StaticWebsiteOrigin(staticWebsiteBucket)
        },
        comment: `CloudFront Distro for learn-cdk-react-app`
      }
    );

    new cdk.aws_s3_deployment.BucketDeployment(this,
      `learn-cdk-react-app-deployment-${stage}`,
      {
        destinationBucket: staticWebsiteBucket,
        sources: [ cdk.aws_s3_deployment.Source.asset(path) ],
        cacheControl: [
          cdk.aws_s3_deployment.CacheControl.maxAge(cdk.Duration.days(1))
        ],
        distribution
      }
    )
  }
}
