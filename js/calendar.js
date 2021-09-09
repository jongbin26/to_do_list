const calendar = document.querySelector(".calendar");
now = calendar.querySelectorAll("div")[0];
controller = calendar.querySelectorAll("div")[1];
table = calendar.querySelector("table");
tbody = table.querySelector("tbody");

const date = new Date();
let time = [date.getDate(), date.getMonth(), date.getFullYear(), date.getDay()];
const lastdate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function nowCalendar(){
  now.innerHTML = `<div class="yearMonth">${time[2]}년 ${time[1]+1}월</div>`;
  controller.innerHTML = `<button class="back">▲</button><button class="next">▼</button>`;

  const back = document.querySelector(".back");
  const next = document.querySelector(".next");

  //윤달 계산
  if(time[2]%4==0 && time[2]%100!=0 && time[2]%400==0) lastdate[1]=29;
  else lastdate[1]=28;

  let a;
  let b = 0;
  let day = 0;

  //변수 a에 저번달 마지막 날 할당
  if(time[1]==0) a = lastdate[11]; //(월==1)이면 변수 a에 12월 마지막 날 할당
  else a = lastdate[time[1]-1];    //(월!=1)이면 변수 a에 전달 마지막 날 할당

  for(let i=0; i<6; i++){          //변수 i == row
    let tr = document.createElement("tr");  //tr 태그 생성
    tbody.appendChild(tr); //tr 태그 tbody 자식으로 삽입
    
    for(let j=1; j<=7; j++){       //변수 j == column (요일 column)

      if(new Date(time[2], time[1], 1).getDate() == 1){     //현재 년도, 현재 월의 1일 == 1이면
        if(i == 0){                                         //첫번째 row에 존재하면
          if(j >= new Date(time[2], time[1], 1).getDay()+1){  //현재 년도, 현재 월의 1일의 요일보다 column보다 크면
            day++;                                          //달력에서 줄바뀜이 있으면 날짜 ++1
          }
        }else {
          day++;                                            //줄바뀜이 없어도 날짜 ++1
        }
      }
      
      if(day > lastdate[time[1]]){                           
        day = 1;                      //날짜가 lastdate보다 커지면 날짜를 1로 초기화
        b = 1;                        //b를 1로
      }

      if(day >= 1){                   //day가 1보다 크면서
        if(b == 0){                   //b가 0이면 (즉, 다음달로 넘어가지 않았으면)
          if(j == 1){                 //일요일이면
            let td = document.createElement("td");
            const frontSide = document.createElement("div");
            frontSide.classList.add('frontSide');
            const backSide = document.createElement("div");
            backSide.classList.add("backSide");
            td.append(frontSide, backSide);
            td.classList.add("day");
            backSide.innerHTML = `<div class="backMain">✖</div><div class="backPannel"></div>`;
            frontSide.innerHTML = `<span style="color:red">${day}</span>`;
            if(date.getFullYear() == time[2]){
              if(date.getMonth() == time[1]){
                if(day == time[0]){
                  frontSide.innerHTML = `<span style="color:red">${day}</span>`;
                  frontSide.classList.add('today');
                }
              }
            }
            tr.appendChild(td);
          }else {                     //일요일이 아니라면
            let td = document.createElement("td");
            const frontSide = document.createElement("div");
            frontSide.classList.add('frontSide');
            const backSide = document.createElement("div");
            backSide.classList.add("backSide");
            td.append(frontSide, backSide);
            td.classList.add("day");
            backSide.innerHTML = `<div class="backMain">✖</div><div class="backPannel"></div>`;
            frontSide.innerHTML = `<span style="color:#000">${day}</span>`;
            if(date.getFullYear() == time[2]){
              if(date.getMonth() == time[1]){
                if(day == time[0]){
                  frontSide.classList.add('today');
                }
              }
            }
            tr.appendChild(td);
          }
        }else {                                           //다음달로 넘어간 경우(b==1)
          let td = document.createElement("td");
          td.innerHTML = `<span style="color:#c2c2c2">${day}</span>`;
          td.classList.add('nextMonth');
          tr.appendChild(td);
        }
      }else {                                             //저번달인 경우
        let td = document.createElement("td");
        td.innerHTML = `<span style="color:#c2c2c2">${a}</span>`;
        td.classList.add('prevMonth');
        tr.prepend(td);
        a--;
      }
    }
  }

  //back 버튼
  back.addEventListener("click",function(){
    time[1]--;

    if(time[1] < 0){
      time[2]--;
      time[1]=11;
    }
    for(let k=0; k<6; k++){
      tbody.removeChild(tbody.querySelectorAll("tr")[1]);
    }
    nowCalendar();
    plusBackPannel();
    backSideOpen();
    clearList();
    saveList();
  });

  //next 버튼
  next.addEventListener("click",function(){
    time[1]++;

    if(time[1] > 11){
      time[2]++;
      time[1]=0;
    }
    for(let k=0; k<6; k++){
      tbody.removeChild(tbody.querySelectorAll("tr")[1]);
    }
    nowCalendar();
    plusBackPannel();
    backSideOpen();
    clearList();
    saveList();
  });
}

function init(){
  nowCalendar();
}

init();