
  let DATA=[];

 let btnSave= document.getElementById("btn-Save");
 if(btnSave){
  btnSave.addEventListener('click',TakeData);
    
 }
 function TakeData(){
    let dropDown=document.querySelector(".status").value;
    let name=document.querySelector(".Name").value;
    let contact=document.querySelector(".contact").value;
    let payment=document.querySelector(".Payment").value;
    let Client={
        Status : dropDown,
        Name : name,
        Contact : contact,
        Payment :payment,
    };
    addData(Client);
    GotoIndex();
};


let btnUpdate= document.getElementById("btn-Update");
 if(btnUpdate){
  btnUpdate.addEventListener('click',UpDatedata);
    
 }
function UpDatedata(){
   let dropDown=document.querySelector(".status").value;
   let id=Number(document.querySelector(".id").value);
    let name=document.querySelector(".Name").value;
    let contact=document.querySelector(".contact").value;
    let payment=document.querySelector(".Payment").value;
    let Client={
        Status : dropDown,
        Name : name,
        Contact : contact,
        Payment :payment,
    };
    updateHtml(id, Client);
ReloadPage();
GotoIndex();
}
function updateHtml(id,user){
   indexedDB.open("MyAppDB", 1).onsuccess = e => { 
    db = e.target.result; 
    UpdateUser(id, user);
  };
}

function UpdateUser(id,User){
  
  
  let tx = db.transaction('tasks','readwrite');
  let store = tx.objectStore('tasks');
  

  let getRequest = store.get(id);

  getRequest.onsuccess = () => {
    let data = getRequest.result; 
    
    if(!data){
      alert("Item nahi mila");
      return;
    }

  
    data.Name = User.Name;     
    data.Status = User.Status; 
    data.Contact=User.Contact;
    data.Payment=User.Payment;

  

    let putRequest = store.put(data);

    putRequest.onsuccess = () => {
   
    }
  }

  getRequest.onerror = () => {
    alert('Error getting data');
  }

}

 function ReloadPage(){
  window.location.reload();
}
function GotoIndex(){
  window.location="index.html";
}
// indexed

let db; 

function display(){
  indexedDB.open("MyAppDB",1).onsuccess= e=>{
  db=e.target.result;
  loadData();
}
}



async function loadData() {
  await initDB(); 
  let d = await getAllData(); 
  console.log("SARA123 ::", d); 
}






indexedDB.open("MyAppDB", 1).onupgradeneeded = e => { 
  db = e.target.result; 
  db.createObjectStore("tasks", {keyPath: "id", autoIncrement: true});
};

indexedDB.open("MyAppDB", 1).onsuccess = e => { 
  db = e.target.result; 

};
 function addData(item){
  if(!db) return alert("DB load nahi hui"); 
  
  let tx = db.transaction("tasks", "readwrite"); 
  tx.objectStore("tasks").add(item); 
  DATA.push(item);
  alert("Save ho gaya");
}
export function InsertData(item){
   if(!db) return alert("DB load nahi hui"); 
  
  let tx = db.transaction("tasks", "readwrite"); 
  tx.objectStore("tasks").add(item); 
  alert("Save ");
}

// function   getAllData(){
// debugger
//   if(!db){
//     console.log("none"); 
//     return;}
//   let tx = db.transaction("tasks", "readonly"); 
//   let request = tx.objectStore("tasks").getAll(); 
//   request.onsuccess = e => {
//     let dataGet = e.target.result; 
    
//       // dataGet.forEach(element => {
//       //   //DATA.push(element);
//       // });
//       console.log("DATABASE :",dataGet);
    
//    return dataGet;
//   };
  
// }
// function  getAllData() {
//   return new Promise((resolve, reject)  => { 
//     if(!db){
      
//       return resolve([]); 
//     }

//     let tx = db.transaction("tasks", "readonly");
//     let request = tx.objectStore("tasks").getAll();

//     request.onsuccess = (e) => {
//       let dataGet = e.target.result; 
//       resolve(dataGet); 
//     }

//     request.onerror = (e) => {
//       reject(e.target.error);
//     }
//   });
// }


// export  function display(){

// let v;
//     indexedDB.open("MyAppDB", 1).onsuccess = async e => { 
//   db = e.target.result; 
//  v= await getAllData();
//   return  v;
// };
// return v;

// }

 function ClearAll(){
  
  let tx=db.transaction('tasks','readwrite');
  let store=tx.objectStore('tasks');
  let request=store.clear();
  request.onsuccess=()=>{
    alert('deleted');
  }
}

export function deleteAll(){
  indexedDB.open("MyAppDB", 1).onsuccess = e => { 
  db = e.target.result; 
 ClearAll();
};
}

export function initDB() { 
  return new Promise((resolve) => {
    let request = indexedDB.open("MyAppDB", 1);
    request.onsuccess = (e) => {
      db = e.target.result;
      resolve();
    }
  })
}

export function getAllData() {
  return new Promise((resolve, reject) => {
    if(!db) return resolve([]);
    let tx = db.transaction("tasks", "readonly");
    let request = tx.objectStore("tasks").getAll();
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
}
function DeleteById(id){
  
  let tx = db.transaction('tasks','readwrite');
  let store = tx.objectStore('tasks');
  let Did=Number(id);
  let request = store.delete(Did);
  
  request.onsuccess = () => {
    alert('Item deleted: ' + id);
  
  
  }
  request.onerror = () => {
    alert('Error deleting: ' + id);
  }
}

export function deleteTask(id){
  indexedDB.open("MyAppDB", 1).onsuccess = e => { 
    db = e.target.result; 
    DeleteById(id);
  };
}

function UpdateById(id, newData){
  
  
  let tx = db.transaction('tasks','readwrite');
  let store = tx.objectStore('tasks');
  

  let getRequest = store.get(id);

  getRequest.onsuccess = () => {
    let data = getRequest.result; 
    
    if(!data){
      alert("Item nahi mila");
      return;
    }

  
    data.name = newData.name;     
    data.Status = newData.Status; 
  

    let putRequest = store.put(data);

    putRequest.onsuccess = () => {
   
    }
  }

  getRequest.onerror = () => {
    alert('Error getting data');
  }
}

export function updateTask(id, newData){
  indexedDB.open("MyAppDB", 1).onsuccess = e => { 
    db = e.target.result; 
    UpdateById(id, newData);
  };
}