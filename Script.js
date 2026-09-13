                                        
                                                         
import { initDB, getAllData ,deleteTask,InsertData,updateTask } from './DataBase.js';

await initDB(); 
var data=[]; 
 let  d = await getAllData(); 
 let dat=JSON.stringify(d);
 let abc=JSON.parse(dat);
 let FullData=[];
 let ToDo=[];
 let Progress =[];
 let Done =[];
// myabc();
// function myabc(){

// for(let i=0;i<abc.length;i++){
//  console.log(abc[i].Name);
// }
function ReloadPage(){
  window.location.reload();
}
InsertToAll();
SelectionData();

function InsertToAll(){
  console.log("InsertFull",FullData);
for(let i=0;i<abc.length;i++){
  FullData.push(abc[i]);
}
}

function SelectionData(){
  console.log("Agyh ",FullData);
for(let i=0;i<FullData.length;i++){
  if(FullData[i].Status === "TO_DO"){
     ToDo.push(FullData[i]);

  }
  else if(FullData[i].Status === "Done"){
    Done.push(FullData[i]);
  }
  else if(FullData[i].Status === "Progress"){
    Progress.push(FullData[i]);
  }
 
}
}

  



// async function loadData() {
  
//   //console.log(d);
//   for (var i=0 ;i<d.length;i++){
     
//         data.push(d[i]);

//   }
                                                                                                                                                                                                             
// }

//loadData();
//DataAll();
//   async function DataAll(){
    
     
//     data.forEach((item,index)=>{

//       console.log(item.name,item.status);
//     })

// }



let Donecontainer = document.querySelector(".classDone");
let ProgressContainer =document.querySelector(".classProgress");
let TodoContainer =document.querySelector(".classTodo");

display();

function display(){
     let mycode='';
 Done.forEach(e => {
    mycode+=`<div id="ClientsINFO" class="info ,DONE,${e.id}" draggable="true" >Name :${e.Name}
     <br> Stauts : ${e.Status} </br> Contact : ${e.Contact} </br> Payment : ${e.Payment}
     </br> ID : ${e.id} </div>`;
});
Donecontainer.innerHTML=mycode;
mycode='';
Progress.forEach(e => {
    mycode+=`<div id="ClientsINFO" class="info ,Progress,${e.id}" draggable="true" >Name :${e.Name}
     <br> Stauts : ${e.Status} </br> Contact : ${e.Contact} </br> Payment : ${e.Payment}
     </br> ID : ${e.id} </div>`;
});
ProgressContainer.innerHTML=mycode;
mycode='';
ToDo.forEach(e => {
    mycode+=`<div id="ClientsINFO" class="info ,Todo,${e.id}" draggable="true" >Name :${e.Name}
     <br> Stauts : ${e.Status} </br> Contact : ${e.Contact} </br> Payment : ${e.Payment}
     </br> ID : ${e.id} </div>`;
});
TodoContainer.innerHTML=mycode;

}
 let btnRemove= document.getElementById("btn_RemoveTask");
 if(btnRemove){btnRemove.addEventListener('click',RemoveUser);}
 function RemoveUser(){
let id=prompt("Enter User Id");
deleteTask(id);
ReloadPage();

 }




let boxes = document.querySelectorAll('.info'); 
let columns = document.querySelectorAll('.innerCol'); 


boxes.forEach(card => {
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('dragend', dragEnd);
});


columns.forEach(column => {
  column.addEventListener('dragover', dragOver); 
  column.addEventListener('dragenter', dragEnter);
  column.addEventListener('dragleave', dragLeave);
  column.addEventListener('drop', dragDrop);
});

let draggedCard = null;

function dragStart(e){
  console.log("start 123");
  draggedCard = e.target;
  console.log(e.target.age, e.target.name);
 
}

function dragEnd(e){
  console.log("end");
  
  e.target.classList.remove('hold');
  e.target.classList.remove('hide');
}

function dragOver(e){
  e.preventDefault(); 
}

function dragEnter(e){
  e.preventDefault();
  console.log("drag enter");
  //this.classList.add('over'); 
}

function dragLeave(e){
 // this.classList.remove('over');
}

function dragDrop(e){
  console.log("drop");
  e.preventDefault();

 let num =draggedCard.className;
 let num1=num.split(",");
 let status =num1[1];
 let idData =Number(num1[2]);
 if(status === "DONE"){
  
   let item= ReturnData();
   let clasName=this.className
    console.log(clasName);
    if(this.className == "innerCol classProgress"){
    
      item.Status="Progress";
      FullData.push(item);
      console.log("Data",FullData);
      updateTask(item.id,item);
    }
    if(this.className == "innerCol classTodo"){
      item.Status="TO_DO";
      FullData.push(item);
      console.log("TODO",FullData);
      updateTask(item.id,item);
    }
    if(this.className == "innerCol classDone"){
       item.Status="Done";
      FullData.push(item);
      console.log("Dpne",FullData);
      updateTask(item.id,item);
    }
  
 }
 else if(status === "Progress"){
      let item= ReturnData();
   let clasName=this.className
    console.log(clasName);
    if(this.className == "innerCol classProgress"){
    
      item.Status="Progress";
      FullData.push(item);
      console.log("Data",FullData);
      updateTask(item.id,item);
    }
    if(this.className == "innerCol classTodo"){
      item.Status="TO_DO";
      FullData.push(item);
      console.log("TODO",FullData);
      updateTask(item.id,item);
    }
    if(this.className == "innerCol classDone"){
       item.Status="Done";
      FullData.push(item);
      console.log("Dpne",FullData);
      updateTask(item.id,item);
    }

 }
 else if(status === "Todo"){
 let item= ReturnData();
   let clasName=this.className
    console.log(clasName);
    if(this.className == "innerCol classProgress"){
    
      item.Status="Progress";
      FullData.push(item);
      console.log("Data",FullData);
      updateTask(item.id,item);
    }
    if(this.className == "innerCol classTodo"){
      item.Status="TO_DO";
      FullData.push(item);
      console.log("TODO",FullData);
      updateTask(item.id,item);
    }
    if(this.className == "innerCol classDone"){
       item.Status="Done";
      FullData.push(item);
      console.log("Dpne",FullData);
      updateTask(item.id,item);
    }
 }

  this.appendChild(draggedCard); 
  ReloadPage();
}

function ReturnData (){
let getData;
let num =draggedCard.className;
 let num1=num.split(",");
 let status =num1[1];
 let idData =Number(num1[2]);
  for(let i=0;i<abc.length;i++){
    let num3=abc[i].id;
    console.log("id data",typeof(idData));
    console.log("number",typeof(num3));
    if (num3 === idData){
       getData=abc[i];
     
    }
  }
    
   REMOVE(getData);
   return getData;

}
function REMOVE(data){
  let Full= FullData.filter(item=>item.id !== data.id);
  FullData=Full;
  console.log("Full",FullData);
}

function AddAllTODataBase(Arr){
  for(let i=0;i<Arr.length;i++){
    console.log("fnfidsfkdsfdoidsf",Arr[i]);
    InsertData(Arr[i]);
  }
}