//nextMont && prevMont hover delete
const nextMonths = document.querySelectorAll('.nextMonth');
nextMonths.forEach(function(nextMonth){
  nextMonth.addEventListener('mouseover', function() {
    nextMonth.style.backgroundColor="#fff";
  });
});

//backSide open

function backSideOpen(){
  let isHideBackSide = false;
  const frontSides = document.querySelectorAll(".frontSide");
  frontSides.forEach(function (frontSide) {
    frontSide.addEventListener('click', function () {
      frontSide.parentElement.children[1].classList.add("convert");
    });
    backMains=document.querySelectorAll('.backMain');
    backMains.forEach(function(backMain){
      backMain.addEventListener('click', function(){
        frontSide.parentElement.children[1].classList.remove("convert");
      });
    });
  });
}

//first backSideOpen()
const frontSides = document.querySelectorAll(".frontSide");
frontSides.forEach(function(frontSide){
  frontSide.addEventListener('click', function(){
    frontSide.parentElement.children[1].classList.add("convert");
  });
  backMains=document.querySelectorAll('.backMain');
  backMains.forEach(function(backMain){
    backMain.addEventListener('click', function(){
      frontSide.parentElement.children[1].classList.remove("convert");
    });
  });
});