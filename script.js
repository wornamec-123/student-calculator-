let courseCount = 0;

// =======================
// Grade Conversion
// =======================

function getGradeInfo(score) {
  if (score >= 80) return { grade: "A", point: 4.0, css: "grade-A" };
  if (score >= 75) return { grade: "B+", point: 3.5, css: "grade-Bp" };
  if (score >= 70) return { grade: "B", point: 3.0, css: "grade-B" };
  if (score >= 65) return { grade: "C+", point: 2.5, css: "grade-Cp" };
  if (score >= 60) return { grade: "C", point: 2.0, css: "grade-C" };
  if (score >= 55) return { grade: "D+", point: 1.5, css: "grade-Dp" };
  if (score >= 50) return { grade: "D", point: 1.0, css: "grade-D" };
  if (score >= 45) return { grade: "E", point: 0.5, css: "grade-E" };

  return { grade: "F", point: 0.0, css: "grade-F" };
}

// =======================
// Degree Classification
// =======================

function getDegreeClass(gpa) {
  if (gpa >= 3.60) return "🏆 First Class";
  if (gpa >= 3.00) return "⭐ Second Class Upper";
  if (gpa >= 2.00) return "👍 Second Class Lower";
  if (gpa >= 1.00) return "Third Class / Pass";

  return "Fail";
}

// =======================
// Add Course
// =======================

function addCourse() {

  courseCount++;

  const list =
    document.getElementById(
      "courses-list"
    );

  if (
    courseCount === 1 &&
    !document.querySelector(".labels")
  ) {

    list.innerHTML = `
      <div class="labels">
        <span>Course Name</span>
        <span>Credits</span>
        <span>Score</span>
        <span></span>
      </div>
    `;
  }

  const row =
    document.createElement("div");

  row.className =
    "course-row";

  row.id =
    `course-${courseCount}`;

  row.innerHTML = `

<input
type="text"
placeholder="e.g. DCIT104"
id="name-${courseCount}"
/>

<input
type="number"
min="1"
max="6"
value="3"
id="credits-${courseCount}"
/>

<input
type="number"
placeholder="Score"
min="0"
max="100"
id="score-${courseCount}"
oninput="previewGrade(this)"
/>

<button
class="btn-remove"
onclick="removeCourse(${courseCount})"
>
×
</button>

`;

  list.appendChild(row);

}

// =======================
// Remove Course
// =======================

function removeCourse(id) {

  const row =
    document.getElementById(
      `course-${id}`
    );

  if (row) {
    row.remove();
  }

}

// =======================
// Live Grade Preview
// =======================

function previewGrade(input) {

  const score =
    Number(input.value);

  if (
    isNaN(score) ||
    score < 0 ||
    score > 100
  ) {

    input.title = "";

    return;

  }

  const info =
    getGradeInfo(score);

  input.title =
    `${info.grade} (${info.point})`;

}

// =======================
// Calculate GPA
// =======================

function calculateGPA() {

  const rows =
    document.querySelectorAll(
      ".course-row"
    );

  if (
    rows.length === 0
  ) {

    alert(
      "Please add at least one course."
    );

    return;

  }

  let totalPoints = 0;
  let totalCredits = 0;

  const results = [];

  for (
    const row of rows
  ) {

    const id =
      row.id.split("-")[1];

    const name =
      document
      .getElementById(
        `name-${id}`
      )
      .value
      .trim();

    const credits =
      Number(
        document
        .getElementById(
          `credits-${id}`
        )
        .value
      );

    const score =
      Number(
        document
        .getElementById(
          `score-${id}`
        )
        .value
      );

    // Validation

    if (!name) {

      alert(
        "Enter all course names."
      );

      return;

    }

    if (
      isNaN(score) ||
      score < 0 ||
      score > 100
    ) {

      alert(
        "Scores must be 0–100."
      );

      return;

    }

    if (
      isNaN(credits) ||
      credits < 1
    ) {

      alert(
        "Credits must be at least 1."
      );

      return;

    }

    const info =
      getGradeInfo(score);

    const earned =
      info.point *
      credits;

    totalPoints +=
      earned;

    totalCredits +=
      credits;

    results.push(`

<div class="result-row">

<span>

<strong>${name}</strong>

<br>

<small>

${credits} cr ·
${score}% ·
${earned.toFixed(1)} pts

</small>

</span>

<span class="grade-badge ${info.css}">

${info.grade}

</span>

</div>

`);

  }

  if (
    totalCredits === 0
  ) {

    alert(
      "Credits cannot be zero."
    );

    return;

  }

  const gpa =
    totalPoints /
    totalCredits;

  document
    .getElementById(
      "course-results"
    )
    .innerHTML =
    results.join("");

  document
    .getElementById(
      "gpa-value"
    )
    .textContent =
    gpa.toFixed(2);

  document
    .getElementById(
      "degree-class"
    )
    .textContent =
    getDegreeClass(gpa);

  document
    .getElementById(
      "results"
    )
    .style.display =
    "block";

  document
    .getElementById(
      "results"
    )
    .scrollIntoView({
      behavior:
        "smooth"
    });

}

// =======================
// Default Courses
// =======================

addCourse();
addCourse();
addCourse(); 
