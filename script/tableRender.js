function renderGradeTable() {
  const container = document.getElementById("gradesTable");
  const search = document.getElementById("searchInput")?.value.toLowerCase();
  const sort = document.getElementById("sortSelect")?.value;
  if (!container) return;

  let data = getData();
  let students = Object.keys(data);

  if (search) {
    students = students.filter(name => name.toLowerCase().includes(search));
  }

  let ranked = students.map(name => {
    const total = data[name].reduce((sum, entry) => sum + entry.marks, 0);
    const avg = total / data[name].length;
    return { name, avg, subjects: data[name] };
  });

  if (sort === "name-asc") ranked.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "name-desc") ranked.sort((a, b) => b.name.localeCompare(a.name));
  if (sort === "avg-asc") ranked.sort((a, b) => a.avg - b.avg);
  if (sort === "avg-desc") ranked.sort((a, b) => b.avg - a.avg);

  ranked.sort((a, b) => b.avg - a.avg);
  ranked.forEach((student, index) => student.rank = index + 1);

  let html = `<table class="table table-bordered">
    <thead class="table-light">
      <tr>
        <th>Rank</th>
        <th>Student</th>
        <th>Subjects & Grades</th>
      </tr>
    </thead>
    <tbody>`;

  if (ranked.length === 0) {
    html += `<tr><td colspan="3" class="text-center">No student data available.</td></tr>`;
  } else {
    ranked.forEach(({ name, avg, subjects, rank }) => {
      let subjectRows = subjects.map(entry => `
        <tr>
          <td>${entry.subject}</td>
          <td>${entry.marks} (${entry.letter})</td>
          <td>
            <button class='btn btn-sm btn-warning' onclick='editSubject("${name}", "${entry.subject}")'>Edit</button>
            <button class='btn btn-sm btn-danger' onclick='deleteSubject("${name}", "${entry.subject}")'>Delete</button>
          </td>
        </tr>
      `).join("");

      html += `
        <tr>
          <td>${rank}</td>
          <td><strong>${name}</strong><br>Average: ${avg.toFixed(2)} (${getLetterGrade(avg)})</td>
          <td>
            <table class="table table-sm m-0">
              <thead><tr><th>Subject</th><th>Marks</th><th>Actions</th></tr></thead>
              <tbody>${subjectRows}</tbody>
            </table>
          </td>
        </tr>`;
    });
  }

  html += `</tbody></table>`;
  container.innerHTML = html;
}
