var btnopen = document.getElementById('start-register');
var bgback = document.getElementById('bg-register');
var btnclose = document.getElementById('close-register');

if(btnopen){
btnopen.addEventListener('click',function(){
    bgback.classList.toggle('showregister');
})

btnclose.addEventListener('click',function(){
    bgback.classList.toggle('showregister');
})
}
