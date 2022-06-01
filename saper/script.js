function start1() {
    start = 0.00;
    document.getElementById("rozmiar").style.display = "none";
    document.getElementById("submit").style.display = "none";
    document.getElementById("label").style.display = "none";
    //rozmiar gry
    var rozmiar = document.getElementById('rozmiar');
    var rozmiarValue = rozmiar.value;
    rozmiarValue = parseInt(rozmiarValue);

    if(rozmiarValue == 1){
        wysokosc = 9;
        szerokosc = 9;
        il_bomb = 10;
    } else if (rozmiarValue == 2){
        wysokosc = 16;
        szerokosc = 16;
        il_bomb = 40;
    } else if (rozmiarValue == 3){
        wysokosc = 23;
        szerokosc = 23;
        il_bomb = 99;
    }

    var t = [];

    function utworzplansze(){
        for(wiersz=0; wiersz< wysokosc; wiersz++){
            t[wiersz] = [];
            for(kolumna=0; kolumna < wysokosc; kolumna++){
                t[wiersz][kolumna] = 0;
            }
        }
    }

    function sasiad(wiersz, kolumna){
        //sasiad z prawej, wiersz ten sam, kolumna+1
        if(kolumna < szerokosc-1){
            if (t[wiersz][kolumna+1] != -1) {
                t[wiersz][kolumna+1]++;
            }
        }
        //sasiad z lewej, wiersz ten sam, kolumna-1
        if(kolumna > 0){
            if (t[wiersz][kolumna-1] != -1) {
                t[wiersz][kolumna-1]++;
            }
        }

        //sasiad z gory
        if(wiersz > 0){
            if (t[wiersz-1][kolumna] != -1) {
                t[wiersz-1][kolumna]++;
            }
        }

        //sasiad z dolu
        if(wiersz < wysokosc-1){
            if (t[wiersz+1][kolumna] != -1) {
                t[wiersz+1][kolumna]++;
            }
        }

        //skosy

        //prawo gora
        if(kolumna < szerokosc-1 && wiersz > 0){
            if (t[wiersz-1][kolumna+1] != -1) {
                t[wiersz-1][kolumna+1]++;
            }
        }

        //prawo dol
        if(kolumna < wysokosc-1 && wiersz < 8){
            if (t[wiersz+1][kolumna+1] != -1) {
                t[wiersz+1][kolumna+1]++;
            }
        }

        //lewo gora
        if(kolumna > 0 && wiersz > 0){
            if (t[wiersz-1][kolumna-1] != -1) {
                t[wiersz-1][kolumna-1]++;
            }
        }

        //lewo dol
        if(kolumna > 0 && wiersz < wysokosc-1){
            if (t[wiersz+1][kolumna-1] != -1) {
                t[wiersz+1][kolumna-1]++;
            }
        }
    }

    function postawbomby(ile) {
        if(ile==0){
            return;
        }
            var wiersz = Math.trunc(wysokosc * Math.random());
            var kolumna = Math.trunc(szerokosc * Math.random());
            if(t[wiersz][kolumna] == -1){
                postawbomby(ile);
            } else {
                t[wiersz][kolumna] = -1;
                sasiad(wiersz, kolumna);
                postawbomby(ile-1);
            }
    }

    function ukryj(wiersz, kolumna) {
        var id = "id" + wiersz + "x" + kolumna;
        var button = document.getElementById(id);
        if(button == null){
            return;
        }
        if(button.style.display == "none"){
            return;
        }
        button.style.display = "none";
        if(t[wiersz][kolumna] == -1){
            alert("przegrałeś");
            location.reload();
            //window.location.reload(true); //przeładowuje stronę
        }
        if(t[wiersz][kolumna] == 0){
            //z prawej
            ukryj(wiersz, kolumna+1);
            //z lewej
            ukryj(wiersz, kolumna-1);
            //z góry
            ukryj(wiersz-1, kolumna);
            //z dołu
            ukryj(wiersz+1, kolumna);

        }
    }

    function pokazplansze(){
        var table = document.getElementById("plansza");
        for(let wiersz=0; wiersz<=wysokosc; wiersz++){
            var tr = document.createElement("tr");
            for(let kolumna = 0; kolumna<szerokosc; kolumna++){
                var td = document.createElement("td");
                td.textContent = t[wiersz][kolumna];
                td.className = "p" + t[wiersz][kolumna];

                let button = document.createElement("button");
                button.id = "id" + wiersz + "x" + kolumna;
                button.onclick = function() {
                    ukryj(wiersz, kolumna);
                }
                button.oncontextmenu = function(event) {
                    //alert("ok")
                    event.preventDefault();
                    if (button.className != 'flag'){
                        button.className = 'flag';
                    } else {
                        button.className = '';
                    }
                }
                td.appendChild(button);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
    }

    utworzplansze();
    postawbomby(il_bomb);
    pokazplansze();
    console.log(t);
}