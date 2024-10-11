{
  "name": "prediction-game-express-backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "tsc": "tsc",
    "start": "npm run build:live",
    "build": "npm run tsc",
    "build:live": "nodemon --exec ./node_modules/.bin/ts-node -- ./app/server.ts"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/mysql": "^2.15.5",
    "express": "^4.16.3",
    "mysql": "^2.15.0",
    "rxjs": "^6.2.0",
    "typescript": "^2.9.1",
    "js-yaml": "^3.13.1",
    "mixin-deep": "^2.0.1",
    "set-value": "^3.0.1",
    "kind-of": "^6.0.3",
    "minimist": "^1.2.3",
    "dot-prop": "^4.2.1",
    "ini": "^1.3.6"
  },
  "devDependencies": {
    "@types/body-parser": "^1.17.0",
    "@types/express": "^4.16.0",
    "@types/node": "^10.3.3",
    "nodemon": "^1.17.5",
    "ts-node": "^6.1.0",
    "tslint": "^5.10.0"
  }
}

| Package        | Vulnerability Description                                                                 | Status      |
|----------------|-------------------------------------------------------------------------------------------|-------------|
| js-yaml        | Code Injection (versions prior to 3.13.1)                                               | Fixed       |
| mixin-deep     | Prototype Pollution (versions prior to 2.0.1 or 1.3.2)                                  | Fixed       |
| set-value      | Prototype Pollution (versions prior to 3.0.1 or 2.0.1)                                  | Fixed       |
| kind-of        | Validation Bypass (versions prior to 6.0.3)                                             | Fixed       |
| minimist       | Prototype Pollution (affected versions)                                                  | Fixed       |
| dot-prop       | Prototype Pollution (versions before 4.2.1)                                             | Fixed       |
| ini            | Prototype Pollution (versions before 1.3.6)                                             | Fixed       |

## Recommendations
- Upgrade the packages to their latest minor versions as specified in the vulnerabilities.
