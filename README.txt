
Projects and taasks: 


tasks: 

{
      "name": "name of task (unique identifier)", 
      "description": "description", 
      "assignedTo": "assigned to", 
      "due": "due date", 
      "complete": "complete"
}


API CALL BODY: 

{
    type: type 
    data: {projectName: pname, taskName: tname }
}


UI -> CREATE PROJECT -> PROJECT API: 

{
    "postName": "postName"
}