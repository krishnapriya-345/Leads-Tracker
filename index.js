let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
//console.log(ulEl);

const deleteBtn = document.getElementById("delete-btn");

//["lead1", "lead2"] or null
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
//console.log(leadsFromLocalStorage);
const tabBtn = document.getElementById("tab-btn");

if(leadsFromLocalStorage){ //truthy value
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

tabBtn.addEventListener("click", function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        //console.log(tabs);
        myLeads.push(tabs[0].url); //catching tab's url
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
        
    })
})


function render(leads){
    let listItems = "";
for(let i=0; i < leads.length; i++){
    //console.log(myLeads[i]);
    //ulEl.textContent = myLeads[i];
    
    //listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>";
    listItems += `
    <li>
    <a target='_blank' href='${leads[i]}'>
    ${leads[i]}
    </a>
    </li>
    `
    //console.log(listItems);
    //Another way
    // const li = document.createElement("li"); //create list element
    // li.textContent = myLeads[i];
    // ulEl.append(li);
    
}
ulEl.innerHTML = listItems; //dom manipulation has a cost //this is best
    
}
deleteBtn.addEventListener("dblclick", function(){
    //console.log("double click");
    localStorage.clear(); //clear local storage
    myLeads = []; //clear myLeads
    render(myLeads); //clear the DOM //just render empty array
    
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value);
    inputEl.value = " ";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    //console.log(myLeads);
    
    //console.log(localStorage.getItem("myLeads"));
   
})

