function MenuChoice()
{
    if (document.getElementById("menu").value == "View Categories")
    {
        document.getElementById("cat_list").style.visibility = "visible";
        document.getElementById("add_cat").style.visibility = "hidden";
        document.getElementById("cat_desc").style.visibility = "hidden";
        document.getElementById("del_cat").style.visibility = "hidden";
        document.getElementById("about").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Create Category")
    {
        document.getElementById("cat_list").style.visibility = "hidden";
        document.getElementById("add_cat").style.visibility = "visible";
        document.getElementById("cat_desc").style.visibility = "hidden";
        document.getElementById("del_cat").style.visibility = "hidden";
        document.getElementById("about").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Update Category Description")
    {
        document.getElementById("cat_list").style.visibility = "hidden";
        document.getElementById("add_cat").style.visibility = "hidden";
        document.getElementById("cat_desc").style.visibility = "visible";
        document.getElementById("del_cat").style.visibility = "hidden";
        document.getElementById("about").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Delete Category")
    {
        document.getElementById("cat_list").style.visibility = "hidden";
        document.getElementById("add_cat").style.visibility = "hidden";
        document.getElementById("cat_desc").style.visibility = "hidden";
        document.getElementById("del_cat").style.visibility = "visible";
        document.getElementById("about").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "About the Developer")
    {
        document.getElementById("cat_list").style.visibility = "hidden";
        document.getElementById("add_cat").style.visibility = "hidden";
        document.getElementById("cat_desc").style.visibility = "hidden";
        document.getElementById("del_cat").style.visibility = "hidden";
        document.getElementById("about").style.visibility = "visible";
    }
    else
    {
        document.getElementById("cat_list").style.visibility = "hidden";
        document.getElementById("add_cat").style.visibility = "hidden";
        document.getElementById("cat_desc").style.visibility = "hidden";
        document.getElementById("del_cat").style.visibility = "hidden";
        document.getElementById("about").style.visibility = "hidden";
    }
}

function GetCategories()
{
    var objRequest = new XMLHttpRequest();
    
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCategories";
    
    objRequest.onreadystatechange = function()
    {
            if (objRequest.readyState == 4 && objRequest.status == 200)
            {
                var output = JSON.parse(objRequest.responseText);
                DisplayOutput(output);
            }
    }
    objRequest.open("GET",url,true);
    objRequest.send();
}
function DisplayOutput(results)
{
    var count = 0;
    var displaytext = "<table><tr><th>Category ID</th><th>Category Name</th><th>Category Description</th></tr>";
    
    for (count = 0; count < results.GetAllCategoriesResult.length; count++)
    {
        displaytext += "<tr><td>" + results.GetAllCategoriesResult[count].CID + "</td><td>" + results.GetAllCategoriesResult[count].CName + "</td><td>" + results.GetAllCategoriesResult[count].CDescription + "</td></tr>";
    }
    results += "</table>";
    document.getElementById("categorydisplay").innerHTML = displaytext;
}    

function CreateCategory()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCategory";
    
    var cat_name = document.getElementById("catname").value;
    var cat_desc = document.getElementById("catdesc").value;
    
    var newcategory = '{"CName":"' + cat_name + '","CDescription":"' + cat_desc +'"}';
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
        var result = JSON.parse(objRequest.responseText);
        OperationResult(result);
        }
    }

    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcategory);
}

function OperationResult(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("newcatdisplay").innerHTML = "The category was added."
    }
    else
    {
        document.getElementById("newcatdisplay").innerHTML = "The category could not be added." + "<br>" + output.Exception;
    }
}

function UpdateCategory()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
    
    var catID = document.getElementById("category_id").value;
    var catDesc = document.getElementById("category_description").value;
    
    var newupdate = '{"CID":"' + catID + '","CDescription":"' + catDesc +'"}';
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            ChangeResult(result);
        }
    }

    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newupdate);
}

function ChangeResult(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("result").innerHTML = "The category description was updated."
    }
    else if (output.WasSuccessful == 0)
    {
        document.getElementById("result").innerHTML = "The category description could not be updated due to an unspecified error." + "<br>" + output.Exception;
    }
    else if (output.WasSuccessful == -2)
    {
        document.getElementById("result").innerHTML = "The category description could not be updated because the data string supplied could not be deserialized into the service object." + "<br>" + output.Exception;
    }
    else
    {
        document.getElementById("result").innerHTML = "The category description could not be updated because a record with that Category ID could not be found." + "<br>" + output.Exception;
    }
}

function ConfirmDelete()
{
    var msg;
    msg= "Are you sure you want to delete the data ?";
    var agree=confirm(msg);
    if (agree)
    {
        DeleteCategory() ;
    }
}

function DeleteCategory()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
    url += document.getElementById("category_ID").value;

    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            DeleteResult(result);
        }
    }
    objRequest.open("GET",url,true);
    objRequest.send();
}
   
function DeleteResult(output)
{
    if (output.DeleteCategoryResult.WasSuccessful == 1)
    {
        document.getElementById("delresult").innerHTML = "The category has been deleted."
    }
    else
    {
        document.getElementById("delresult").innerHTML = "The category could not be deleted." + "<br>" + output.Exception;
    }
}

