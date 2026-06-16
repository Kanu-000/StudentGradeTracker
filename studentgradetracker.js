let students = [];

function getGrade(avg){
    if(avg >= 90) return "A+";
    if(avg >= 80) return "A";
    if(avg >= 70) return "B";
    if(avg >= 60) return "C";
    return "D";
}

function addStudent(){

    let name =
        document.getElementById("studentName").value.trim();

    let gradeInput =
        document.getElementById("studentGrades").value.trim();

    if(name === "" || gradeInput === ""){
        alert("Please enter name and grades");
        return;
    }

    if(students.length >= 5){
        alert("Maximum 5 students allowed");
        return;
    }

    let grades = gradeInput
        .split(",")
        .map(x => Number(x.trim()))
        .filter(x => !isNaN(x));

    let average =
        grades.reduce((a,b)=>a+b,0)/grades.length;

    let highest = Math.max(...grades);
    let lowest = Math.min(...grades);

    students.push({
        name,
        grades,
        average,
        highest,
        lowest
    });

    document.getElementById("studentName").value = "";
    document.getElementById("studentGrades").value = "";

    renderStudents();
    updateProgress();
}

function updateProgress(){

    document.getElementById("progressText").innerText =
        `${students.length} / 5 students`;

    for(let i=1;i<=5;i++){

        let dot =
            document.getElementById("dot"+i);

        if(i <= students.length)
            dot.classList.add("active");
        else
            dot.classList.remove("active");
    }
}

function renderStudents(){

    let container =
        document.getElementById("studentCards");

    container.innerHTML = "";

    students.forEach((student,index)=>{

        container.innerHTML += `

<div class="studentCard">

<h2>${student.name}</h2>

<p>
Grades :
${student.grades.join(", ")}
</p>

<h2>
${student.average.toFixed(2)}
</h2>

<p>
Highest : ${student.highest}
&nbsp;&nbsp;
Lowest : ${student.lowest}
</p>

<div class="gradeBadge">

${getGrade(student.average)}

</div>

<div class="actionBtns">

<button
class="editBtn"
onclick="editStudent(${index})">

Edit

</button>

<button
class="removeBtn"
onclick="removeStudent(${index})">

Remove

</button>

</div>

</div>

`;

    });

}

function removeStudent(index){

    students.splice(index,1);

    renderStudents();
    updateProgress();
}

function editStudent(index){

    let student = students[index];

    document.getElementById("studentName").value =
        student.name;

    document.getElementById("studentGrades").value =
        student.grades.join(",");

    students.splice(index,1);

    renderStudents();
    updateProgress();
}

function showSummary(){

    if(students.length < 3){
        alert("Add at least 3 students");
        return;
    }

    document.getElementById("homePage").style.display =
        "none";

    document.getElementById("summaryPage").style.display =
        "block";

    let sorted =
        [...students].sort((a,b)=>b.average-a.average);

    let top = sorted[0];

    document.getElementById("topStudentName").innerText =
        top.name;

    document.getElementById("topAverage").innerText =
        top.average.toFixed(2);

    document.getElementById("totalStudents").innerText =
        students.length;

    let classAverage =
        students.reduce((sum,s)=>sum+s.average,0)
        / students.length;

    document.getElementById("classAverage").innerText =
        classAverage.toFixed(2);

    document.getElementById("highestScore").innerText =
        Math.max(...students.map(s=>s.highest));

    document.getElementById("lowestScore").innerText =
        Math.min(...students.map(s=>s.lowest));

    let comparisonBox =
        document.getElementById("comparisonBox");

    comparisonBox.innerHTML = "";

    sorted.forEach(student=>{

        comparisonBox.innerHTML += `

<div style="margin-bottom:20px">

<b>${student.name}</b>

<div style="
height:18px;
background:#ffdce8;
border-radius:20px;
overflow:hidden;
margin-top:8px">

<div style="
height:100%;
width:${student.average}%;
background:linear-gradient(45deg,#ff2f7f,#ff8f42)">
</div>

</div>

</div>

`;

    });

    let table =
        document.getElementById("resultTable");

    table.innerHTML = "";

    sorted.forEach((student,index)=>{

        table.innerHTML += `

<tr>

<td>${index+1}</td>

<td>${student.name}</td>

<td>${student.average.toFixed(2)}</td>

<td>${student.highest}</td>

<td>${student.lowest}</td>

<td>${getGrade(student.average)}</td>

</tr>

`;

    });

}

function goBack(){

    document.getElementById("summaryPage").style.display =
        "none";

    document.getElementById("homePage").style.display =
        "block";

}