const path = require('path')
const fs = require('fs');
const simpleGit = require('simple-git')();
const students = require('./students')
const exec = require('child_process').exec;
console.log('students to clone: ', students);
const code = process.argv[2];

const cloneOne = async (studentName, URL) => {
  const pathToLocalRepo = path.join(__dirname, 'student_projects', studentName)
  await simpleGit.clone(URL, pathToLocalRepo)
  console.log(pathToLocalRepo)
  const currSimpleGit = require('simple-git')(pathToLocalRepo);
  await currSimpleGit.checkoutBranch('feedback', 'master');
  await fs.copyFile('RUBRIC.md', `${pathToLocalRepo}/RUBRIC.md`, (err) => {
    if (err) throw err;
    console.log(`RUBRIC.md was copied into ${studentName}'s repo!`);
  });
  if (code) await exec(`code ${pathToLocalRepo}`);
  await exec(`npm install --prefix ${pathToLocalRepo}`);
}

for (let student of students) {
  cloneOne(student.name, student.url);
}
