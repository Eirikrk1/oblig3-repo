function antallValidering() {
    let antallTest = $("#antall").val();
    if(isNaN(antallTest)) {
        alert("Not a number");
        $("#antall").val("");
    }
}

function epostValidering() {
    let epostTest = $("#epost").val();
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(epostTest)) {
        return true;
    }
    else {
        alert("Not a valid email");
        $("#epost").val("");
    }
}

function telefonValidering() {
    let telefonTest = $("#telefonnr").val();
    if (/^[0-9]{8}$/.test(telefonTest)) {
        return true;
    }
    else {
        alert("Not a valid number");
        $("#telefonnr").val("");
    }
}

function lagreBilletter() {
    let film = $("#velgfilm").val();
    let antall = $("#antall").val();
    let fornavn = $("#fornavn").val();
    let etternavn = $("#etternavn").val();
    let telefonnr = $("#telefonnr").val();
    let epost = $("#epost").val();

    const billett = {
        film : film,
        antall : antall,
        fornavn : fornavn,
        etternavn : etternavn,
        telefonnr : telefonnr,
        epost : epost
    }

    if (!film || !antall || !fornavn || !etternavn || !telefonnr || !epost) {
        alert("Du må fylle inn alle felt");
        return;
    }
    else {
        $.post("/lagre", billett, function () {
            hentRegister();
        })
    }

    $("#velgfilm").val("");
    $("#antall").val("");
    $("#fornavn").val("");
    $("#etternavn").val("");
    $("#telefonnr").val("");
    $("#epost").val("");
}

function hentRegister() {
    $.get("/hent", function (data) {
        formaterBilletter(data);
    })
}

function formaterBilletter(billettRegister) {
    let ut = "<table class='table table-striped'><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th>" +
        "<th>Telefonnr</th><th>Epost</th>";
    for (let billett of billettRegister) {
        ut += "<tr><td>"+ billett.film +"</td><td>"+ billett.antall +"</td><td>"+ billett.fornavn +"</td>" +
            "<td>"+ billett.etternavn +"</td><td>"+ billett.telefonnr +"</td><td>"+ billett.epost +"</td></tr>"
    }
    ut+="</table>";
    $("#utskrift").html(ut);
}

function slettBilletter() {
    $.get("/slett", function() {
        hentRegister();
    })
}