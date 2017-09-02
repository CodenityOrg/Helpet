var gomodal = document.getElementById('start-login');
var modalbody = document.getElementById('modal-login');
var modalclose = document.getElementById('close-login');

if(gomodal){
    gomodal.addEventListener('click',function(){
        modalbody.classList.toggle('showlogin');
    });

}
if(modalclose){
modalclose.addEventListener('click',function(){
    modalbody.classList.toggle('showlogin');
});
    
}
