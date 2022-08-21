const { log } = require("console");

const cardContainer = document.querySelector('.cardContainer');

async function injectRealStudentsCards()
{

    const data = await fetch("http://127.0.0.1:4000/get/students")
    const realStudens = await data.json()
    console.log("Here: " + realStudens);

    images = ['../Assets/Anna.jpg', '../Assets/Leo.jpg', '../Assets/Mauro.png', '../Assets/Vivian.jpg', '../Assets/Jackson.jpg']
    let index=0;
    realStudens.forEach(student =>
    {
        let card = cardTemplate(images[index], student.firstName, student.lastName, student.school, student.description, student.email, student.cell, student.advice)

        index++;
        cardInjecter(card)
    })
}

async function injectCards()
{
    try
    {
        //IPVC schools
        const schools = ['Escola superior de educação', 'Escola Superior Agrária', 'Escola Superior de Tecnologia e Gestão', 'Escola Superior de Saúde', 'Escola Superior de Ciências Empresariais', 'Escola Superior de Desporto e Lazer']

        //Students descriptions
        const descriptions = ['Mestre das cabulas', 'Aluno de excelencia', 'O cantor da escola', 'Lider dos malandros', 'hearthbreaker', 'A charmosa']

        const translatingLanguage = 'pt';

        let translatedSlip=null;

        // 5 random users fetch from API
        const randomUserResponse = await fetch('https://randomuser.me/api/?results=5')
        const students = await randomUserResponse.json();

        console.log(students);
        console.log("MAde it");

        students.results.forEach(async (result) =>
        {
            //advice fetch
            const slipResponse = await fetch(`https://api.adviceslip.com/advice/${Math.floor(Math.random() * 200) + 1}`)

            const advice = await slipResponse.json();
            console.log(advice);

            //translated advice fetch
            translatedSlip = await fetch("http://127.0.0.1:4000/get/translation", {
                 method: 'POST',
                 body: JSON.stringify({
                     text: advice.slip.advice,
                     language:translatingLanguage
                 }), headers: { "Content-Type": "application/json; charset=UTF-8" }

             }).then(function (response)
             {
                 return response.json()
             }).then(function (data)
             {             
                 return data;
             })


            let card = cardTemplate(result.picture.large, result.name.first, result.name.last, schools[Math.floor(Math.random() * 5) + 0], descriptions[Math.floor(Math.random() * 5) + 0], result.email, result.cell, translatedSlip || advice.slip.advice);

            cardInjecter(card);
        })
    } catch (e)
    {
        console.log(e)
    }
}

/**
 * 
 * @param {*} picture 
 * @param {*} firstName 
 * @param {*} lastName 
 * @param {Student's school name} school 
 * @param {Student descriptionm} description 
 * @param {*} email 
 * @param {*} cell 
 * @param {Students advice} advice 
 * @returns card
 */
function cardTemplate(picture, firstName, lastName, school, description, email, cell, advice)
{
    return card =
        `<div class="col-md-4"><div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front"><div class="card-header"><img class="i" src=${picture} "class="card-img-top"alt="..."/><div class="card-body"><h5 class="card-title">${firstName} ${lastName}</h5><h6 class="card-subtitle mb-2 text-muted">${school}</h6></div><p class="card-text">${description}</p><p>${email}</p><p> ${cell}</p></div></div><div class="flip-card-back"><h1>Conselho para os estudantes em formação:</h1 ><p class="advice">${advice}</p></div></div></div></div>`;
}

/**
 * 
 * @param {*card top inject on the html} card 
 */
function cardInjecter(card)
{
    document.querySelector(".row").innerHTML += card;
}
