function addSkill() {
    const div = document.createElement("input");
    div.type = "text";
    div.className = "skill";
    div.placeholder = "Enter skill";
    document.getElementById("skills-section").appendChild(div);
  }
  
  function addProject() {
    const div = document.createElement("input");
    div.type = "text";
    div.className = "project";
    div.placeholder = "Enter project";
    document.getElementById("projects-section").appendChild(div);
  }
  
  function generateResume() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const github = document.getElementById("github").value;
    const linkedin = document.getElementById("linkedin").value;
    const education = document.getElementById("education").value;
    const experience = document.getElementById("experience").value;
  
    const skills = [...document.querySelectorAll(".skill")]
      .map(s => s.value.toLowerCase())
      .filter(s => s);
  
    const projects = [...document.querySelectorAll(".project")]
      .map(p => p.value)
      .filter(p => p);
  
    const preview = `
      <h2>${name}</h2>
  
      <p>
        📧 <a href="mailto:${email}">${email}</a> |
        📱 ${phone}
      </p>
  
      <p>
        💻 <a href="${github}" target="_blank">GitHub</a> |
        🔗 <a href="${linkedin}" target="_blank">LinkedIn</a>
      </p>
  
      <h3>Skills</h3>
      <ul>${skills.map(s => `<li>${s}</li>`).join("")}</ul>
  
      <h3>Education</h3>
      <p>${education}</p>
  
      <h3>Experience</h3>
      <p>${experience}</p>
  
      <h3>Projects</h3>
      <ul>${projects.map(p => `<li>${p}</li>`).join("")}</ul>
    `;
  
    document.getElementById("resumePreview").innerHTML = preview;
  
    predictJob(skills);
  }
  
  function predictJob(skills) {
    const skillSet = skills.join(" ");
  
    let roles = [];
  
    if (skillSet.includes("html") || skillSet.includes("css") || skillSet.includes("javascript")) {
      roles.push("Frontend Developer");
    }
  
    if (skillSet.includes("react") || skillSet.includes("angular")) {
      roles.push("Frontend Engineer");
    }
  
    if (skillSet.includes("node") || skillSet.includes("express") || skillSet.includes("java")) {
      roles.push("Backend Developer");
    }
  
    if (skillSet.includes("python") && (skillSet.includes("ml") || skillSet.includes("machine learning"))) {
      roles.push("Data Scientist");
    }
  
    if (skillSet.includes("sql") || skillSet.includes("mongodb")) {
      roles.push("Database Engineer");
    }
  
    if (skillSet.includes("ui") || skillSet.includes("ux") || skillSet.includes("figma")) {
      roles.push("UI/UX Designer");
    }
  
    if (skillSet.includes("aws") || skillSet.includes("docker")) {
      roles.push("DevOps Engineer");
    }
  
    if (roles.length === 0) {
      roles.push("General Software Developer");
    }
  
    document.getElementById("jobPrediction").innerHTML =
      "🎯 Suggested Roles: <br>" + roles.join(", ");
  }
  
  function downloadPDF() {
    const element = document.getElementById("resumePreview");
  
    html2pdf().from(element).save("resume.pdf");
  }
  
  function resetForm() {
    localStorage.clear();
    location.reload();
  }
  
  function toggleTheme() {
    document.body.classList.toggle("dark");
  }
  
  // Load saved data
  window.onload = function () {
    const data = JSON.parse(localStorage.getItem("resumeData"));
    if (!data) return;
  
    document.getElementById("name").value = data.name;
    document.getElementById("email").value = data.email;
    document.getElementById("phone").value = data.phone;
    document.getElementById("education").value = data.education;
    document.getElementById("experience").value = data.experience;
  
    data.skills.forEach(s => addSkill());
    document.querySelectorAll(".skill").forEach((el, i) => el.value = data.skills[i] || "");
  
    data.projects.forEach(p => addProject());
    document.querySelectorAll(".project").forEach((el, i) => el.value = data.projects[i] || "");
  };
