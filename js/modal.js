let subscribeButton = document.querySelector('.subscribeButton');
let modal=document.querySelector('.contModal');
//초기값 display:none으로 설정
modal.style.display='none';

subscribeButton.addEventListener('click',(event)=>{
    let email=document.querySelector('.subscribeInput> input').value;
    event.preventDefault();
    if (!email){
        alert("이메일을 입력해주세요!");
        return;
    }
    modal.style.display='flex';
    //모달창 뜨면 스크롤 막기
    document.body.style.overflow='hidden';
})

let modalButton=document.querySelector('.modalButton');
modalButton.addEventListener('click',()=>{
    modal.style.display='none';
    location.reload();
})