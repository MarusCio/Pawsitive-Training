let culori=["blue","green","yellow","cyan","red","orange","white","pink","lime","olive","silver","maroon","grey"];


function getRandomInt(max) {
return Math.floor(Math.random()*max);
}


function schimb_design(){

try {
let titlu1= document.getElementById('importanta_dresaj');
titlu1.id="importanta_dresajului";
titlu1.style.color='#5B9AA0';


let titlu2= document.getElementById('comenzi');
titlu2.style.fontFamily = 'Trebuchet MS';
titlu2.style.color = '#5B9AA0';

let subtitluri= document.getElementsByTagName('h2');
for(let i=0; i<subtitluri.length; i++){
  let culoare=culori[getRandomInt(culori.length)]
subtitluri[i].style.color = culoare;
subtitluri[i].style.fontSize = '220%';
}


let imagine1=document.getElementById('poza_inlocuia');
imagine1.src="poze/caine_asteapta.jpg";


let imagine2=document.getElementById('posterPawsitive');
imagine2.style.height="250px";
imagine2.style.width="auto";
imagine2.style.display="block";
imagine2.style.marginLeft = 'auto';
imagine2.style.marginRight = 'auto';



let butonCumpara=document.getElementById('cumparaCurs');
butonCumpara.style.display='block';
butonCumpara.style.margin="20px auto"
butonCumpara.style.marginTop="50px";
butonCumpara.style.fontSize="20px";
butonCumpara.style.backgroundColor="pink";
butonCumpara.style.color="purple";
butonCumpara.style.border="none";
butonCumpara.style.borderRadius="25px";

let divPlalta=document.getElementById('divPlata');
divPlata.style.display="none";
divPlata.style.position="fixed";
divPlata.style.top="50%";
divPlata.style.left="50%";
divPlata.style.transform= "translate(-50%, -50%)";
divPlata.style.background= "white";
divPlata.style.border= "10px solid cyan";
divPlata.style.padding= "20px";
divPlata.style.zIndex= "1000";

let overlay = document.getElementById('overlay');
overlay.style.display = "none";
overlay.style.position = "fixed";
overlay.style.top= "0";
overlay.style.left= "0";
overlay.style.width= "100%";
overlay.style.height= "100%";
overlay.style.zIndex= "999";

}
catch(error){
  console.error("er",error);
}
}



function adaug_elemente(){
try{
let sectiune_pt_paragraf=document.getElementById('sec_adaugata_cu_js');

let titlu_studii=document.createElement('p');
titlu_studii.textContent="Experienta instructorilor:";
titlu_studii.style.fontSize="40px";
titlu_studii.style.fontFamily= "Garamond";
titlu_studii.fontWeight= "bold";
titlu_studii.style.color="#E9BCB9";
sectiune_pt_paragraf.appendChild(titlu_studii);

let studii_M=document.createElement('p');
studii_M.textContent="Numele meu este Ciobanu Marius, am 30 de ani, iar in ultimii 15 de ani am trait si am studiat in Germania. Ultimii ani pe care i-am petrecut in Germania i-am consacrat studiului chinologiei (stiinta care se ocupa cu studiul cainilor), psihologiei si comportamentului canin la Academia \"Canis Kynos\" din Germania.M-am intors in Romania in anul 2019 cu dorinta de a oferii oamenilor posibilitati de sustinere si ajutor pentru a avea o viata frumoasa si plina de armonie alaturi de cel mai bun prieten al lor, cainele.";
studii_M.style.fontSize="20px";
studii_M.style.color="#E9BCB9;";
sectiune_pt_paragraf.appendChild(studii_M)

}
catch(error){
  console.error("er",error);
}
}


function plateste(){

  const butonCumpara=document.getElementById('cumparaCurs');
  const divPlata = document.getElementById('divPlata');
  const overlay = document.getElementById('overlay');
  const inchidePlata = document.getElementById('inchidePlata');
  const FormPlata = document.getElementById('FormPlata');


  butonCumpara.addEventListener('click', () => {
    divPlata.style.display = 'block';
    overlay.style.display = 'block';
  });

  inchidePlata.addEventListener('click', () => {
    divPlata.style.display = 'none';
    overlay.style.display = 'none';
  });


  FormPlata.addEventListener('submit', (e) => {
    e.preventDefault(); // Previne comportamentul default al formularului (reîncărcarea paginii)

    let numeCard = document.getElementById('numeCard').value;
    let nrCard = document.getElementById('numarCard').value;
    let data_exp = document.getElementById('data_exp').value;
    let cvv = document.getElementById('cvv').value;
    let nr_tel=document.getElementById('nrtel').value;
    let cvvBun = /^\d{3}$/;
    let nrTelefonBun=/^\d{10}$/;
    let numeCardBun = /^[a-zA-Z\s]+$/;
    let dataExpBuna = /^(0[1-9]|1[0-2])\/(2[4-9]|[3-9][0-9])$/;
    const numarCardBun = /^\d{16}$/;


    let erori=[];

if (!nrTelefonBun.test(nr_tel)) {
    erori.push('Numarul de telefon introdus nu este corect');
}

if (!cvvBun.test(cvv)) {
        erori.push('CVV-ul introdus nu este corect');
}

if (!numeCardBun.test(numeCard)) {
   erori.push('Numele de pe card trebuie să conțină doar litere mari, mici și spații.');
 }

 if (!dataExpBuna.test(data_exp)) {
   erori.push('Data expirării trebuie să fie în format MM/YY, unde MM este între 01 și 12, iar YY între 25 și 99.');
 }

 if (!numarCardBun.test(nrCard)) {
    erori.push('Numărul cardului trebuie să fie format din exact 16 cifre.');
  }

 if (erori.length > 0) {
    alert(erori.join('\n'));
    return;
  }

  else  if (nr_tel && numeCard && nrCard && data_exp && cvv) {

      const dateCard = {
        telefon: nr_tel,
        numeCard: numeCard,
        nrCard: nrCard,
        data_exp: data_exp,
        cvv: cvv

      };

      localStorage.setItem('dateCard', JSON.stringify(dateCard));

      alert("Plata a fost realizata cu succes! Datele dvs. au fost salvate.");
      divPlata.style.display = 'none';
      overlay.style.display = 'none';

      FormPlata.reset();
      window.location.href = 'joc.html';
    }
  });

}




window.onload=function(){
schimb_design();
adaug_elemente();
plateste();
}
