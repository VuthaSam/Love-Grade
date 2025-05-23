function setupFormPage() {
  const form = document.getElementById("gradeForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    addOrUpdateGrade();
  });
}

function addOrUpdateGrade() {
  const name = document.getElementById("studentName").value.trim();
  const subject = document.getElementById("subject").value;
  const marks = parseInt(document.getElementById("marks").value);

  if (!name || !subject || isNaN(marks) || marks < 0 || marks > 100) {
    alert("Please enter valid information.");
    return;
  }

  let data = getData();

  if (!data[name]) data[name] = [];

  if (data[name].some(entry => entry.subject === subject)) {
    alert("This subject already exists for this student.");
    return;
  }

  data[name].push({ subject, marks, letter: getLetterGrade(marks) });
  saveData(data);
  document.getElementById("gradeForm").reset();
  alert("Grade added!");
}
