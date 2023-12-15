<script>
    import Task from './task.svelte'
    export let tasks;
    export let projectName;
    let taskList = [...tasks];
    let name = '';
    let description = '';
    let assignedTo = '';
    let dueDate = '';
    async function addTask() {
        let taskObj = {name: name, description: description, assignedTo: assignedTo, due: dueDate, complete: false}
        console.log(taskObj);
        try {
            await fetch(`http://172.29.112.1:4005/events`, {
            method: 'POST',
            body: JSON.stringify({type: "TaskCreated", data: {projectName: projectName, task: taskObj}}),
            headers: { 'Content-Type': 'application/json' },
            });
        } catch (err) {
            console.log(err);
        }
        taskList.push(taskObj);
        taskList = [...taskList];
    }
    async function deleteTask(taskObj) {
        try {
            await fetch(`http://172.29.112.1:4005/events`, {
            method: 'POST',
            body: JSON.stringify({type: "TaskRemoved", data: {projectName: projectName, task: taskObj}}),
            headers: { 'Content-Type': 'application/json' },
            });
        } catch (err) {
            console.log(err);
        }
        taskList = taskList.filter(task => JSON.stringify(task) !== JSON.stringify(taskObj));
        console.log(taskList);
        taskList = [...taskList];
    }
</script>
<html lang = 'en'>
<head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</head>

<body> 
    <table class="table table-primary table-striped">
        <thead>
          <tr>
            <th scope="col">Project Name</th>
            <th scope="col">Description</th>
            <th scope="col">Assigned To</th>
            <th scope="col">Due Date</th>
            <!-- <th scope="col">Complete</th> -->
          </tr>
        </thead>
        <tbody>
        {#key taskList}
           {#each taskList as task}
                <Task task = {task} deleteTask = {deleteTask}/> 
            {/each}
        {/key}
        </tbody>
      </table>
        
      <form class = "border border-dark border-2">
        <div class="form-group">
          <label for="exampleInputEmail1">Task Name</label>
          <input class="form-control" id="task-name" placeholder="Enter task name" bind:value={name}>
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Description</label>
            <input class="form-control" id="description" placeholder="Description" bind:value={description}>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Assigned To</label>
            <input class="form-control" id="assignedto" placeholder="Assigned To" bind:value={assignedTo}>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Due Date</label>
            <input class="form-control" id="dueDate" placeholder="Due Date" bind:value={dueDate}>
          </div>
        <button type="submit" class="btn btn-primary" on:click = {()=> addTask()}>Submit</button>
      </form>
</body>
</html>

