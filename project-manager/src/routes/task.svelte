<script> 
export let task;
export let deleteTask;
</script>


<tr>
    <td>{task.name}</td>
    <td>{task.description}</td>
    <td>{task.assignedTo}</td>
    <td>{task.due}</td>
    <!-- <td><div class="custom-checkbox"><input type="checkbox" bind:checked={task.complete}></div></td> -->
    <td><button on:click = {() => deleteTask(task)} >Delete</button></td>
</tr>

