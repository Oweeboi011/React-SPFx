'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

build.initialize(gulp);

// const sppkgDeploy = require('node-sppkg-deploy');
// sppkgDeploy.deploy({
//     username: "cromwel.m.penaranda@accenturemanilapdc.onmicrosoft.com", // The user that will deploy the file
//     password: "Avanade1234", // The password of the user
//     tenant: "tenant", // The tenant name. Example: contoso
//     absoluteUrl: "https://accenturemanilapdc.sharepoint.com/sites/AkuminaAddIn/AppCatalog", // Absolute path to the app catalog site
//     skipFeatureDeployment: true, // Do you want to skip the feature deployment (SharePoint Framework)
//     //filename: "akumina_all_in_one_package.sppkg", // Filename of the package
//     verbose: true // Do you want to show logging during the deployment
// });