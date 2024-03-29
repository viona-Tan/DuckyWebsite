
// 1 detect event
function submit(e) {
    e.preventDefault();
    console.log('you are in fetch')
    const joke = document.getElementById("joke").value;
    const answer = document.getElementById("answer").value;
    console.log(joke)
    console.log(answer)
    // 2 send request
    fetch(`https://ducky-got-jokes.herokuapp.com/form`, 
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
        if( response.status === 201) {
            alert('success')
        }else{
            alert('unknown error!')
            }
        })

}

var jokeid = 1;
function getJoke() {
    var frontcard = document.getElementById("joke")
    var backcard = document.getElementById("answer")
    fetch(`https://ducky-got-jokes.herokuapp.com/jokes?jokeid=${jokeid}`, 
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
                    if(json.length != 0){
                        console.log(json)
                        frontcard.innerHTML = json[0].joke
                        backcard.innerHTML = json[0].answer
                    }else{    
                            t = `<img src="./images/nojokes.png" class="endofjokes"/><div class="endofjokestext">That is the end of jokes</div>`;
                        document.getElementById('noJokes').innerHTML += t
                        console.log(t)
                    }
                }
            )
        }else{
            alert('unknown error!')
        }
        
    })
}


function like() {
    fetch(`https://ducky-got-jokes.herokuapp.com/like?jokeid=${jokeid}`, 
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

function likeTop(id) {
    fetch(`https://ducky-got-jokes.herokuapp.com/likeTop?jokeid=${id}`, 
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
    fetch(`https://ducky-got-jokes.herokuapp.com/scoreboard`, 
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
            console.log(json)
        var q =`
                <div class="flip-card" onclick="this.classList.toggle('hover');" id="d" style="margin-top: 30px;">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <h2 style="margin-top: 5em;">${json[i].joke}</h2>     
                  </div>
                  <div class="flip-card-back">
                    <h2 style="margin-top: 5em;">${json[i].answer}</h2>
                  </div>
                </div>
              </div>
              <button type="submit" class="mainbutton" style="margin-top: 5px;width: 14.5em; display: flex; justify-content: center;" onclick="likeTop(${json[i].id})" >
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