<script> 
import Project from './project.svelte';
let taskList = [];
$: tableData = [];
let projectName = ''
async function getData() {
        const response = await fetch(`http://172.29.112.1:4000/data`);
        let tasks = await response.json();
        taskList = [...tasks];
        console.log(taskList);
}
getData();

async function setData(task) {
    await getData();
    tableData = [...task.data]
    projectName = task.name
    console.log(projectName);
}
function getRndColor() {
    return 'hsl(' + (360 * Math.random()) + ',50%,50%)'; // H,S,L
}
async function addProject() {
    try {
        await fetch(`http://172.29.112.1:4005/events`, {
        method: 'POST',
        body: JSON.stringify({type: "ProjectCreated", data: {projectName: projectName}}),
        headers: { 'Content-Type': 'application/json' },
        });
  } catch (err) {
      console.log(err);
  }
  await getData();
}
</script> 

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
            {#each taskList as task (task.name)}
                <button style="background-color: {getRndColor()}" on:click = {() => {setData(task); tableData = tableData;}}>{task.name}</button>  
            {/each}
            <div class="row g-3 align-self-end" style="float:right">
                <div class="col-auto">
                    <input id="inputPassword6" class="form-control" placeholder = "project name" bind:value={projectName}>
                </div>
                <div class = "col-auto"> 
                    <button class = "btn btn-primary" on:click = {() => addProject()}>Create Project</button>
                </div>
            </div>
    </nav>
    {#key tableData}
        <Project tasks = {tableData} projectName = {projectName}/>
    {/key}
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
    
