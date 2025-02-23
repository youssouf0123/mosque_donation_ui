// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
   apiUrl: 'http://localhost:8081/autoshop',
//  apiUrl: 'http://ec2-100-26-108-194.compute-1.amazonaws.com:8081/autoshop',
  production: false,
  apiKey: 'devKey',
  taxRate: 5
};