saveList();
plusBackPannel();
function plusBackPannel(){
  const backPannels = document.querySelectorAll(".backPannel");
  backPannels.forEach(function (backPannel) {
    const a = `<div class="plusBtn">+</div>`;
    const b = `<input class="search" onkeyup="enterkey()" value=""/>`;
    const c = `<ul class="list"><ul/>`;
    backPannel.innerHTML = a+b+c;
    const search = backPannel.querySelector(".search");
    const plusBtn = backPannel.querySelector(".plusBtn");
    search.addEventListener('focus', function () {
      search.classList.add('focused');
      search.setAttribute('placeholder','Enter after Input');
    });
    search.addEventListener('blur', function () {
      search.classList.remove('focused');
      plusBtn.classList.remove('focused');
      search.setAttribute('placeholder','');
    });
    plusBtn.addEventListener('click', function () {
      search.focus();
      plusBtn.classList.add('focused');
    })
  });
}

//toDoList[31] array
var toDoList = new Array(31);
for(var i=0;i<toDoList.length;i++){
  toDoList[i] = [];
}
//toDoList claer
function clearList(){
  for(var i=0;i<toDoList.length;i++){
    toDoList[i] = [];
  }
}

//enter event
function enterkey() {
  if(window.event.keyCode == 13){
    var obj = event.target;

    //year month day get
    day = getDay(obj);
    fullDay = getFullDay(getYearMonth(), getDay(obj));

    //local storage 저장(key값과 value값이 같은 경우에만 저장)
    if(obj.value!=''){
      toDoList[day-1].push(obj.value);
      localStorage.setItem(fullDay, JSON.stringify(toDoList[day-1]));
      setLi(obj);
    }
    deleteList(toDoList[day-1]);
    // check();
    obj.value='';
  }
}
function getYearMonth(){
  const yearMonth = document.querySelector('.yearMonth').textContent;
  return yearMonth
}
function getDay(obj){
  objParent = obj.parentElement;
  objGrandParent = objParent.parentElement;
  frontSide = objGrandParent.previousSibling;
  day = frontSide.firstChild.textContent;
  return day;
}
function getFullDay(yearMonth, day){
  var fullDayRaw = yearMonth + day;
  fullDay = fullDayRaw.replace(/ /,'').replace(/년/,'-').replace(/월/,'-');
  return fullDay;
}
function getDayInFrontSide(frontSide){
  day = frontSide.firstChild.textContent;
  return day;
}
function setLi(obj){
  var ul = obj.nextSibling;
  var li = document.createElement("li");
  var deleteBtn = document.createElement("div");
  var checkBtn = document.createElement("div");
  var content = document.createElement("p");

  deleteBtn.innerHTML = "✖";
  deleteBtn.classList.add("deleteBtn");
  checkBtn.innerHTML = "✔";
  checkBtn.classList.add("checkBtn");

  content.innerHTML = obj.value;
  li.classList.add('listLi');
  li.appendChild(content);
  li.appendChild(deleteBtn);
  li.appendChild(checkBtn);
  ul.appendChild(li);
}

function saveList(){
  const frontSides = document.querySelectorAll('.frontSide');
  frontSides.forEach(function(frontSide){
    frontSide.addEventListener('click', function(){
      yearMonth = getYearMonth();
      day = getDayInFrontSide(frontSide);
      fullDay = getFullDay(yearMonth, day);
      items = JSON.parse(localStorage.getItem(fullDay));
      ul = frontSide.nextSibling.children[1].children[2];
      const isLi = frontSide.nextSibling.querySelector('li');
      
      if (items != null){
        toDoList[day-1]=items;
        if(isLi==null){
          for (let i=0;i<items.length;i++){
            var li = document.createElement("li");
            var deleteBtn = document.createElement("div");
            var checkBtn = document.createElement("div");
            var content = document.createElement("p");

            deleteBtn.innerHTML = "✖";
            deleteBtn.classList.add("deleteBtn");
            checkBtn.innerHTML = "✔";
            checkBtn.classList.add("checkBtn");

            content.innerHTML = items[i];
            li.classList.add('listLi');
            li.appendChild(content);
            li.appendChild(deleteBtn);
            li.appendChild(checkBtn);
            ul.appendChild(li); 
          }
        }
      }
      deleteList(toDoList[day-1]);
      // check();
    })
  })
}

//delete
function deleteList(toDoList){
  const deleteBtns = document.querySelectorAll(".deleteBtn");
  deleteBtns.forEach(function(deleteBtn){
    deleteBtn.addEventListener('click', function(event){
      var obj = event.target;
      //deltet in local storage
      var content = obj.previousSibling.textContent;
      input = obj.parentElement.parentElement.previousSibling;
      day = getDay(input);
      fullDay = getFullDay(getYearMonth(), day);
      items = JSON.parse(localStorage.getItem(fullDay));

      for(let i=0;i<items.length;i++){
        if(content==items[i]){
          items.splice(i,1);
          toDoList.splice(i,1);
          console.log(toDoList[day-1]);
          localStorage.setItem(fullDay, JSON.stringify(items));
        }
      }
      if(items.length==0){
        localStorage.removeItem(fullDay);
      }
      //delete in html
      obj.parentElement.remove();
    });
  })
}

//check


// function check(){
//   const checkBtns = document.querySelectorAll(".checkBtn");
//   checkBtns.forEach(function(checkBtn){
//     checkBtn.addEventListener('click', function(event){
//       if(!checkBtn.parentElement.children[0].classList.contains("checked")){
//         checkBtn.parentElement.children[0].classList.add('checked');
//       }else {
//         checkBtn.parentElement.children[0].classList.remove('checked');
//       }
//     })
//   })
// }