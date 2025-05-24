function clearAllData() {
  if (confirm("Are you sure you want to delete all student data?")) {
    localStorage.removeItem("studentGrades");
    renderGradeTable();
  }
}

function deleteSubject(name, subject) {
  const data = getData();
  if (!data[name]) return;

  data[name] = data[name].filter(entry => entry.subject !== subject);
  if (data[name].length === 0) delete data[name];

  saveData(data);
  renderGradeTable();
}

function editSubject(name, subject) {
  const data = getData();
  const entry = data[name]?.find(entry => entry.subject === subject);
  if (!entry) return;

  const newMark = prompt(`Edit marks for ${subject} (0-100):`, entry.marks);
  if (newMarks === null) {
    return;
  }
  
  const newMarks = parseInt(newMark);
  if (isNaN(newMarks) || newMarks < 0 || newMarks > 100) {
    alert("Invalid marks.");
    return;
  }

  entry.marks = newMarks;
  entry.letter = getLetterGrade(newMarks);
  saveData(data);
  renderGradeTable();
}
