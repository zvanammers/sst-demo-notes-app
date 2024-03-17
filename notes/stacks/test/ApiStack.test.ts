import { it } from "vitest";
import { initProject } from "sst/project";
import { App, getStack } from "sst/constructs";
import { Template } from "aws-cdk-lib/assertions";
import { ApiStack } from "../ApiStack";
import { StorageStack } from "../StorageStack";

it("StorageStack has correct attributes", async () => {
  await initProject({});
  const app = new App({ mode: "deploy" });
  // WHEN
  app.stack(StorageStack).stack(ApiStack);
  // THEN
  const template = Template.fromStack(getStack(ApiStack));
  template.resourceCountIs("AWS::Lambda::Function", 7);
});