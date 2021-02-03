# google-finance-helpers
[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

## Clasp Docs
https://developers.google.com/apps-script/guides/clasp

## Testing Locally
Using gas-local to test: https://github.com/mzagorny/gas-local


## Run Tests
Run `npm test`

## Create a Clasp Project Settings File
Create a `.clasp.json` file. This file is not committed to source control.

```
{
  "scriptId": "YOUR_SCRIPT_ID_HERE",
  "rootDir": "src/"
}
```

More info here [Clasp Project Settings](https://github.com/google/clasp#project-settings-file-claspjson)

## Login to Clasp
```
clasp login
```

## Deploy latest changes to the google sheets document  
It reads off the "HEAD" deployment - which is Development Mode  
```
clasp push
```

## Deploy a new version to be used as a library  
This can be referenced from another Google Apps Scripts project. You can reference a library by the version that was last deployed
https://developers.google.com/apps-script/concepts/deployments  
```
clasp push
clasp deploy -V [version] -d [description]
clasp deployments
```

Other commands:
```
clasp versions
clasp undeploy <deploymentId>
clasp redeploy <deploymentId> <version> <description>
```

## Open the project on Google Apps Script
```
clasp open
```
