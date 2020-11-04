const path = require('path')
const fs = require('fs');
const simpleGit = require('simple-git')();
const students = require('./students')

console.log('students to clone: ', students);

const pushOne = async (studentName, URL) => {
  const pathToLocalRepo = path.join(__dirname, 'student_projects', studentName);
  const currSimpleGit = require('simple-git')(pathToLocalRepo);
  await currSimpleGit
    .add('./*')
    .commit("Add Feedback")
    .push('origin', 'feedback');
}

for (let student of students) {
  pushOne(student.name, student.url);
}
