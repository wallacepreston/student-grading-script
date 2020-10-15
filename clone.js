const path = require('path');
const fs = require('fs');
const simpleGit = require('simple-git')();
const students = require('./students');
const exec = require('child_process').exec;
console.log('students to clone: ', students);
const code = process.argv[2];
const repo = process.argv[3];

if(!code) {
  console.log('skipping code command');
}
if(!repo) {
  console.error('Please enter a git repo i.e. `node clone.js code repo-example-name`');
  process.exit(1);
}

const cloneOne = async ({name, username}) => {
  try {
    await exec(`mkdir student_projects`);
    const pathToLocalRepo = path.join(__dirname, 'student_projects', name);
    await simpleGit.clone(`https://github.com/${username}/${repo}.git`, pathToLocalRepo);
    console.log(pathToLocalRepo);
    const currSimpleGit = require('simple-git')(pathToLocalRepo);
    await currSimpleGit.checkoutBranch('feedback', 'master');
    if (code) await exec(`code ${pathToLocalRepo}`);
    await exec(`npm install --prefix ${pathToLocalRepo}`);
    console.log(`Successfully cloned and installed ${name}'s repo!`);
  } catch (error) {
    console.error(error);
  }
}

for (let student of students) {
  cloneOne(student);
}
