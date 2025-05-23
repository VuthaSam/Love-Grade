function getLetterGrade(mark) {
    if (mark >= 90) return "A";
    if (mark >= 80) return "B";
    if (mark >= 70) return "C";
    if (mark >= 60) return "D";
    if (mark >= 50) return "E";
    return "F";
  }
  
  function getData() {
    return JSON.parse(localStorage.getItem("studentGrades")) || {};
  }
  
  function saveData(data) {
    localStorage.setItem("studentGrades", JSON.stringify(data));
  }