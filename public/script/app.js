async function deleteTodo (id){
    try{
    console.log("deleteTodo")
    console.log(id)
    var apiUrl ='http://localhost:5000/api/todo/'+id;
    console.log(apiUrl);
    var response = await fetch (apiUrl,{method:"delete",headers:{
        authorization:"a eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicGhvbmUiOiI5ODY0NTczOTA4IiwiaWF0IjoxNzEyMjg2NjYyLCJleHAiOjE3MTIzNzMwNjJ9.TTPbGkTpE3YMsux701KkHqShabH1-DdMS0ZMWE6NZnk"
    }})
    if(response.status == "400" ||response.status =="404" ||response.status =="500")
    {

    }
    else
    {
        Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "deleted"
          });
    }
}
catch(error)
{
    console.log("error")
}
}
