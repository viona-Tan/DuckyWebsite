
// 1 detect event
function submit(e) {
    e.preventDefault();
    console.log('you are in fetch')
    const joke = document.getElementById("joke").value;
    const answer = document.getElementById("answer").value;
    console.log(joke)
    console.log(answer)
    // 2 send request
    fetch(`http://localhost:8000/form`, 
        {method : "POST",
        headers: {
                'Content-Type': 'application/json',
        },
        body: JSON.stringify({ joke:joke, answer:answer
        }),
    }). then(function(response){
        console.log(response)
        // 6 receive the response
        //7 process response
        if( response.status === 200) {
            alert('success')
        }else{
            alert('unknown error!')
            }
        })

}

var jokeid = 0;
function getJoke() {
    var frontcard = document.getElementById("joke")
    var backcard = document.getElementById("answer")
    fetch(`http://localhost:8000/jokes?jokeid=${jokeid}`, 
        {method : "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    }). then(function(response){
        
        // 6 receive the response
        //7 process response
        if( response.status === 200) {
            console.log('got jokes')
            console.log(response)
            return response.json().then(
                function (json) {
                    console.log(json)
                    frontcard.innerHTML = json.joke
                    backcard.innerHTML = json.answer
                }
            )
        }else if(response.status === 404){
            console.log('404')
            return response.text().then((text) =>{
                t = `<img src="./images/nojokes.png" class="endofjokes"/><div class="endofjokestext">${text}</div>`;
            document.getElementById('noJokes').innerHTML += t
            console.log(t)
        })
        }else{
            alert('unknown error!')
        }
        
    })
}


function like() {
    fetch(`http://localhost:8000/like?jokeid=${jokeid}`, 
    {method : "PUT",
    headers: {
        'Content-Type': 'application/json',
    },
    }). then(function(response){
    console.log(response)
    // 6 receive the response
    //7 process response
    if( response.status === 200) {
        alert('success')
            jokeid += 1;
            if (d.classList.contains('hover')) {
                d.classList.toggle('hover');
              }
                getJoke();
        }else{
            alert('unknown error!')
            }
        })
}

function dislike(){
        d.classList.toggle('shake');

        if (d.classList.contains('hover')) {
            setTimeout(function(){ 
                d.classList.toggle('shake') 
                d.classList.toggle('hover');
            }, 1500);
        }else{
        setTimeout(function(){ 
            d.classList.toggle('shake') 
        }, 1500);
    }
        setTimeout(function(){
            jokeid += 1;
            getJoke();
    }, 1600)
    
        

}


function getTopJokes() {
    fetch(`http://localhost:8000/scoreboard`, 
    {method : "GET",
    headers: {
            'Content-Type': 'application/json',
    },}). then(function(response){
    console.log(response)
    // 6 receive the response
    //7 process response
    if( response.status === 200) {
        alert('success')
        return response.json().then( (json) => {
            console.log(json.length)
        for (var i = 0; i < 5; i++) {
            console.log('here')
        var q =`
                <div class="flip-card" onclick="this.classList.toggle('hover');" id="d" style="margin-top: 30px;">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <p>${json[i].joke}</p>     
                  </div>
                  <div class="flip-card-back">
                    <p>${json[i].answer}</p>
                  </div>
                </div>
              </div>
              <button type="submit" class="mainbutton" style="margin-top: 5px;width: 14.5em; display: flex; justify-content: center;" onclick="like()" >
              <img src="./images/heart.png" style="width: 15%;"/>
              <span style="align-self: center;" id="Numberlikes">${json[i].likes}</span>
              </button>
                `
             document.getElementById('display-topJokes').innerHTML += q;
         } // when use like, disable button
         })
    }else{
        alert('unknown error!')
        }
    })
}