const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

function run() {
  // 1- Get the inputs
  const bucket = core.getInput("bucket-name", { required: true });
  const buketRegion = core.getInput("bucket-region", { required: true });
  const sourceFolder = core.getInput("source-folder", { required: true });

  // 2- Upload the files to S3
  exec.exec(
    `aws s3 sync ${sourceFolder} s3://${bucket} --region ${buketRegion}`
  );
  const websiteUrl = `http://${bucket}.s3-website-${buketRegion}.amazonaws.com`;
  core.setOutput("website-url", websiteUrl);
  core.notice("Deploying to S3");
}
run();
