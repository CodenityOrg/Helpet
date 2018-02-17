"use strict";

let PostView = (function(){
    function renderList() {
        const cardsContainer = document.getElementById("tab-perdidos");
        const cardBodyTemplate = 
            '<div class="tarjeta__titulo">'+
                '<img class="user-image" src="img/perfil.png" alt="foto de perfil">' +
                '<span class"user-name">Alvaro M</span>'+
            '</div>'+
            '<div class="tarjeta__imagen">' +
                '<img class="pet-image" src="http://cdne.elshow.pe/thumbs/uploads/articles/images/facebook-conoce-el-caso-de-wes-PNG_1000x563.png" alt="perrito perdido">' +
            '</div>'+
            '<div class="tarjeta__descripcion">'+
                '<p class="description descripcion">Este perrito lo encontré en la calle cerca a mi casa, espero que encuentre a su dueño.</p>'+
                '<p class="address direccion">Avenida 11 cuadra 4</p>'+
                '<div class="features caracteristicas">' +
                    '<p>Características</p>' +
                    '<span class="caracteristica">pelo negro</span>' +
                    '<span class="caracteristica">oreja cortada</span>' +
                    '<span class="caracteristica">raza pequeña</span>' +
                '</div>' +
            '</div>';
    
        const genCardTemplate = function(){
            var template = document.createElement("div");
            template.className = "tarjeta tarjeta--perrito-perdido";
            template.innerHTML = cardBodyTemplate;
            return template;
        }
    
        fetch("/posts")
            .then(res => res.json())
            .then((posts) => {
                for (let i = 0,post; post = posts[i]; i++) {
                    const postItem = genCardTemplate();
                    postItem.getElementsByClassName("user-name")[0].innerHTML = post.user.name;
                    postItem.getElementsByClassName("pet-image")[0].src = post.image;
                    postItem.getElementsByClassName("description")[0].innerHTML = post.description;
                    postItem.getElementsByClassName("address")[0].innerHTML = post.address;
    
                    var features = post.features;
                    for (var j = 0,feature; feature = features[j]; j++) {
    
                        var featureItem = document.createElement('span');
                        featureItem.innerHTML = feature.name;
                        postItem.getElementsByClassName("features")[0].appendChild(featureItem);
                    }
                }
            })
    }

    function create(form){
        const formData = new FormData(form);

        fetch("post",{
            method: "POST",
            body: formData,
            credentials: "same-origin"
        }).then(response => {

        });
    }

    function initTabs(mapbox){
        const $tabs = document.getElementsByClassName("posts-tab");
        const $tabsContent = document.getElementsByClassName("tab-content");

        for (let i = 0, $tab; $tab = $tabs[i] ; i++) {
            $tab.onclick = function(e){
                const id = this.id;
                const tabBody = this.getAttribute("data-tab");
                const type = Number(this.getAttribute("data-type"));

                for (let j = 0, $nTab; $nTab = $tabs[j]; j++) {
                    $nTab.className = "posts-tab tab-link";
                }
                this.className = "posts-tab tab-link active";
                
                for (let k = 0, $tabContent; $tabContent = $tabsContent[k]; k++) {
                    $tabContent.className = "tab-content oculto";
                    
                    if ($tabContent.id === tabBody) {
                        $tabContent.className = "tab-content active";
                    }
                }

                mapboxView.fetchPostTypeMap(type);
                
            }
        }

    }

    function initView(){
        initTabs();
    }

    return {
        create,
        initView,
        initTabs,
        renderList
    }

})
