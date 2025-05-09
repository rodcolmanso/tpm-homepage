/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// const promiseOfEvents = fetch("https://tpmonline.com.br/.netlify/functions/events?split_duels=1&date_from=2004-01-01")
//     .then(r=>r.json())
//     .then(data => {
//     return data;
// });

window.onload = async () => {
    //obter a lista de eventos do backend
    let d = new Date();
    d.setDate(d.getDate());

    let dTo = new Date();
    dTo.setDate(dTo.getDate()+45);
    
    var requestOptions = {
        'content-type': 'application/json',
         method: 'GET',
         redirect: 'follow'
        //  ,mode: 'no-cors'
       };
    
    // fetch("http://localhost:8888/.netlify/functions/events?split_duels=1&order=1&date_from="+d.toISOString().substring(0,10)+"&date_to="+d.toISOString().substring(0,10),
    fetch("https://tpmonline.com.br/.netlify/functions/events?split_duels=1&order=1&date_from="+d.toISOString().substring(0,10)+"&date_to="+dTo.toISOString().substring(0,10),
        requestOptions
       ).then(r=>r.json())
        // ).then(r=>console.log('AQUI+r'+r))
        .then(data => {
        // return data;
            
            // console.log(JSON.stringify(data, null, 2));
            buildAgenda(data);
        })
        // .finally(  )
    ;

}
function uuidv4() {
    try{
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }catch(e){
        return (Math.random()*1000000).toString();
    }
  }

function buildAgenda(events){
    let row='';
    let rowF='';

    var utc = new Date();
    var offset = utc.getTimezoneOffset();
    let dDate;

    for(let i=0;i<events.length;i++){
        let sDivisions="";
        for(let j=0;j<events[i].divisions.length;j++){
            if(j>0){
                sDivisions+=', ';    
            }
            sDivisions+=events[i].divisions[j].name;
        }
        dDate= new Date((new Date(events[i].date)).getTime() - (offset * 60000) );
        sHour= dDate.toISOString().substring(11,16);
        row+=`
        <div class="col-lg-4 col-sm-6">
            <!-- Portfolio item 6-->
            <div class="portfolio-item">
                <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal${events[i]._id}${dDate.toLocaleDateString().replaceAll('/','')}">
                    <div class="portfolio-hover">
                        <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                    </div>
                    
                        <img class="img-fluid" src="https://res.cloudinary.com/duk7tmek7/image/upload/c_limit,h_450,w_600/d_defaults:tmpyellow.jpg/${events[i]._id}.jpg?${uuidv4()}" alt="..." />
                    
                </a>
                <div class="portfolio-caption">
                    <div class="portfolio-caption-heading">${events[i].name}</div>
                    <div class="portfolio-caption-heading">${events[i].city}/${events[i].state}</div>
                    <div class="portfolio-caption-heading text-muted">${dDate.toLocaleDateString().substring(0,5)} ${sHour}</div>
                    <div class="portfolio-caption-subheading text-muted">${events[i].subTitle}</div>
                    <div class="portfolio-caption-subheading text-muted">${sDivisions}</div>
                </div>
            </div>
        </div>`;

        rowF+=
            `<div class="portfolio-modal modal fade" id="portfolioModal${events[i]._id}${dDate.toLocaleDateString().replaceAll('/','')}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="close-modal" data-bs-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-8">
                                    <div class="modal-body">
                                        <!-- Project details-->
                                        <h2 class="text-uppercase">${dDate.toLocaleDateString().substring(0,5)} ${events[i].name} as ${sHour} hs</h2>
                                        <p class="item-intro text-muted">${sDivisions}</p>
                                            <img class="img-fluid d-block mx-auto" src="https://res.cloudinary.com/duk7tmek7/image/upload/c_limit,h_450,w_600/d_defaults:tmpyellow.jpg/${events[i]._id}.jpg?${uuidv4()}" alt="..." />
                                        <p>${events[i].subTitle}</p>
                                        <p>${events[i].note}</p>
                                        <ul class="list-inline">
                                        <li>
                                                <strong>Clube:</strong>
                                                ${events[i].local}
                                            </li>
                                            <li>
                                                <strong>Endereço:</strong>
                                                ${events[i].address}, ${events[i].city} - ${events[i].state}
                                                <!--<br/><a target="_blank" href="https://www.clubedetiroraposo.com.br/" aria-label="CT Raposo Website">www.clubedetiroraposo.com.br </a>-->
                                                <br/>
                                            </li>
                                        </ul>
                                        <button class="btn btn-primary btn-xl text-uppercase" onclick="window.open('https://tpmonline.com.br/event-details.html?${events[i].short_id}','_blank')" type="button">
                                            <i class="fa-solid fa-right-to-bracket"></i>
                                            Inscreva-se pelo TPMOnline.com.br
                                        </button>
                                        <br>
                                        <br>
                                        <button class="btn btn-primary btn-sm text-uppercase" data-bs-dismiss="modal" type="button">
                                            <i class="fas fa-xmark me-1"></i>
                                            Fechar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

    }
    document.getElementById('eventRows').innerHTML= row;
    document.getElementById('portfolioModals').innerHTML= rowF;
}