const path = require('path');
const simpleGit = require('simple-git');
const git = simpleGit();
const students = require('./students');
const exec = require('child_process').exec;
console.log('students to clone: ', students);
const repo = process.argv[2];
const code = process.argv[3];

if(!code) {
  console.log('skipping code command');
}
if(!repo) {
  console.error('Please enter a git repo i.e. `node clone.js repo-example-name code`');
  process.exit(1);
}

const cloneOne = async ({name, username}) => {
  try {
    await exec(`mkdir student_projects`);
    const pathToLocalRepo = path.join(__dirname, 'student_projects', name);
    await git.clone(`https://github.com/${username}/${repo}.git`, pathToLocalRepo);
    console.log(pathToLocalRepo);
    if (code) await exec(`code ${pathToLocalRepo}`);
    await exec(`npm install --prefix ${pathToLocalRepo}`);
    console.log(`Successfully cloned and installed ${name}'s repo!`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

const cloneAll = async () => {
  try {
    await Promise.all(students.map(cloneOne))
  } catch(err) {
    console.error(err);
    process.exit(1)
  } finally {
    process.exit(0)
  }
}

cloneAll();