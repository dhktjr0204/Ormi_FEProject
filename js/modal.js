let subscribeButton = document.querySelector('.subscribeButton');
let modal=document.querySelector('.contModal');

subscribeButton.addEventListener('click',(event)=>{
    let email=document.querySelector('.subscribeInput> input').value;
    event.preventDefault();
    if (!email){
        alert("이메일을 입력해주세요!");
        return;
    }else if(!isEmail(email)){
        alert("이메일 형식에 맞게 입력해주세요");
        return;
    }
    modal.showModal();
    //모달창 뜨면 스크롤 막기
    document.body.style.overflow='hidden';
})
function isEmail(email){
    let regex=/^[a-zA-Z0-9]([-_.]?[0-9a-zA-Z])*@[a-zA-Z0-9.-]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,4}$/i;
    return regex.test(email);
}

let modalButton=document.querySelector('.modalButton');
modalButton.addEventListener('click',()=>{
    location.reload();
})