import './style.css';
var i=0;
var image=['https://i.ebayimg.com/images/g/tlMAAOSw2ENW8EJM/s-l300.jpg','https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Star_Wars_-_Episode_II_Attack_of_the_Clones_%28movie_poster%29.jpg/220px-Star_Wars_-_Episode_II_Attack_of_the_Clones_%28movie_poster%29.jpg',
    'https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Star_Wars_Phantom_Menace_poster.jpg/220px-Star_Wars_Phantom_Menace_poster.jpg','https://images-na.ssl-images-amazon.com/images/I/51sNjN0MbdL._SY445_.jpg',
    'https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/ReturnOfTheJediPoster1983.jpg/220px-ReturnOfTheJediPoster1983.jpg',
    'https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/SW_-_Empire_Strikes_Back.jpg/220px-SW_-_Empire_Strikes_Back.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/71rZtELyYzL._SY450_.jpg'];
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://swapi.co/api/films/',true);
xhr.send(null);
xhr.onload = function () {
    var films = JSON.parse(xhr.responseText);
    var content = document.getElementById('film');
    while (i < films.count) {
        var block = document.createElement('div');
        block.className = 'content';
        content.appendChild(block);
        var poster = document.createElement('div');
        poster.className = 'poster';
        var img = document.createElement('img');
        img.src = image[i];
        poster.appendChild(img);
        block.appendChild(poster);
        var div = document.createElement('div');
        div.className = 'info';
        div.innerHTML += "<h2>" + films.results[i].title + "</h2>";
        div.innerHTML += "<h4> Episode " + films.results[i].episode_id + "</h4>";
        div.innerHTML += "<span><strong>Director: </strong>" + films.results[i].director + "</span>";
        div.innerHTML += "<span><strong>Release: </strong>" + films.results[i].release_date + "</span>";
        div.innerHTML += "<p>" + films.results[i].opening_crawl + "</p>";
        var button = document.createElement('button');
        button.className = "about";
        button.innerText = "More";
        div.appendChild(button);
        block.appendChild(div);
        var character = document.getElementsByClassName('about');
            character[i].addEventListener('click', function (i) {
                var modal=document.createElement('div');
                modal.id='modal_window';
                modal.style.opacity='1';
                content.appendChild(modal);
                var close = document.createElement('span');
                close.id='close';
                close.innerHTML='X';
                modal.appendChild(close);
                var title = document.createElement('h3');
                title.innerHTML='Characters';
                modal.appendChild(title);
                close.addEventListener('click', function () {
                    document.getElementById('modal_window').style.opacity='0';
                    modal.remove();
                });
                var head_name=document.createElement('div');
                head_name.className='left';
                head_name.innerHTML='<h4>Name</h4>';
                modal.appendChild(head_name);
                var head_gender=document.createElement('div');
                head_gender.className='right';
                head_gender.innerHTML='<h4>Gender</h4>';
                modal.appendChild(head_gender);
                for (var j = 0; j < films.results[i].characters.length; j++) {
                    (function () {
                        var left_content=document.createElement('div');
                        left_content.className='left';
                        var right_content=document.createElement('div');
                        right_content.className='right';
                        var peoples = new XMLHttpRequest();
                        peoples.open('GET', films.results[i].characters[j], true);
                        peoples.send(null);
                        peoples.onload = function () {
                            var people = JSON.parse(peoples.responseText);
                            left_content.innerHTML+= "<h4>"+people.name+"</h4>";
                            right_content.innerHTML+= "<h4>"+people.gender+"</h4>";
                            modal.appendChild(left_content);
                            modal.appendChild(right_content);
                        }
                    })();
                }

            }.bind(null,i));
        i++;
    }

};







