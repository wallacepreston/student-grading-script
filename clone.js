const path = require('path')
const fs = require('fs');
const simpleGit = require('simple-git')();
const students = require('./students')

console.log('students to clone: ', students);

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
}

for (let student of students) {
  cloneOne(student.name, student.url);
}
