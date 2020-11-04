const path = require('path');
const simpleGit = require('simple-git');
const students = require('./students');
const exec = require('child_process').exec;
console.log('students to clone: ', students);
const code = process.argv[2];

if(!code) {
  console.log('skipping code command');
}


const updateOne = async ({name}) => {
  try {
    const pathToLocalRepo = path.join(__dirname, 'student_projects', name);
    console.log(`Pulling updates from ${name}'s repo...`);
    const currSimpleGit = simpleGit(pathToLocalRepo);
    await currSimpleGit.pull('origin', 'master');
    if (code) await exec(`code ${pathToLocalRepo}`);
    await exec(`npm install --prefix ${pathToLocalRepo}`);
    console.log(`Successfully updated ${name}'s repo!`);
  } catch (error) {
    console.error(error);
  }
}

const updateAll = async () => {
  try {
    await Promise.all(students.map(updateOne))
  } catch(err) {
    console.error(err);
    process.exit(1)
  } finally {
    process.exit(0)
  }
}

updateAll();
