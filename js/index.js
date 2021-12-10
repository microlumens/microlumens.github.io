var language;


function getLanguage() {
    (localStorage.getItem('language') == null) ? setLanguage('en-US'): false;
    $.ajax({
        url: './lang/' + localStorage.getItem('language') + '.json?gets=12',
        dataType: 'json',
        async: false,
        dataType: 'json',
        success: function(lang) { language = lang }
    });
}

function setLanguage(lang) {
    localStorage.setItem('language', lang);
}

function encryptls(action, data) {
    var ls = new SecureLS();
    if (action === "enc") {
        var lstech = ls.set('secured', data);
    }
    if (action === "dcr") {
        var lstech = ls.get('secured');
    }
    return lstech;
}




function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
    var algo = str.replace("MICRO", "").replace("XYZ", "=")
    return decodeURIComponent(escape(window.atob(algo)));
}

function hash2key() {
    var fileToLoad = document.getElementById("fileToLoad").files[0];

    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        try {
            var kobj = JSON.parse(textFromFileLoaded);
            document.getElementById("seed").value = b64_to_utf8(kobj.key2hash);
        } catch (e) {
            bulmaToast.toast({
                message: 'Unsupported',
                type: 'is-danger',
                animate: { in: 'fadeIn',
                    out: 'fadeOut'
                },
            })
        }
    };

    fileReader.readAsText(fileToLoad, "UTF-8");
}

function checkcond() {
    var cbox = document.getElementById('switchRoundedInfo').checked;
    if (cbox) {
        var cinf = document.getElementById('hiddenkeys').setAttribute('type', 'text')
    } else {
        var cinf = document.getElementById('hiddenkeys').setAttribute('type', 'password')
    }
    return cinf;
}

if (window.location.hash) {
    var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
    setLanguage(hash);
    getLanguage();
    // hash found
} else {
    setLanguage("en-US");
    getLanguage();
}


for (key in language) {

    if (language.hasOwnProperty(key)) {
        // document.getElementsByTagName(key).innerHTML = language[key];
        // console.log(key);
        // allDom.innerHTML = language[key];
        $("#" + key).html(language[key]);
        //    document.querySelector('[data-tag="' + key + '"]')[0] = language[key]
        // console.log("%c " + key + " = " + language[key], "color:cyan");
    }
}



$(document).ready(function() {

    $(".navbar-item.has-dropdown")
        .click(function() {
            $(this).children(".navbar-dropdown").toggleClass("is-active");
        });
});

function enablelogin() {
    document.getElementById("unlocking").disabled = false;
}

function showtrade() {
    document.getElementById("tradeshow").classList.add("is-active");
}

function tradeclose() {
    document.getElementById("tradeshow").classList.remove("is-active");
}

function hidetxh() {
    var x = document.getElementById("historyt");
    if (x.style.display === "none") {
        x.style.display = "block";
        document.getElementById("btnshwr").innerHTML = "<i class='bi bi-eye-slash-fill'></i>&nbsp; Hide History";
    } else {
        x.style.display = "none";
        document.getElementById("btnshwr").innerHTML = "<i class='bi bi-eye-fill'></i>&nbsp; Show History";
    }
}



function fullscreen() {
    var el = document.documentElement,
        full = el.requestFullscreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullscreen;

    full.call(el);

}

function IsEmpty() {

    if (document.form.question.value == "") {
        bulmaToast.toast({
            message: 'Empty.',
            type: 'is-danger',
            animate: { in: 'fadeIn',
                out: 'fadeOut'
            },
        })
    }
    return;
}







//document.getElementsByTagName()

document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);


    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {
                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);
                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }



});


var switchnet = document.getElementById("switchNetwork").addEventListener("change", slchain);

function slchain() {
    var chain = document.getElementById("switchNetwork").value;
    if (chain === 'testnet') {
        localStorage.setItem('chainrpc', "https://horizon-testnet.stellar.org/");
    } else {
        localStorage.setItem('chainrpc', "https://horizon.stellar.org/");
    }
    alert(chain);
}




/**
 * Login page template
 * 
 */
let loginPage = `
    <section class="section" style="padding-top: 0;">
        <div class="column container box is-one-quarter" style="background-image: linear-gradient(to right bottom, #177899, #008da9, #00a3b4, #00b8b9, #12cdba);border-radius:1rem;box-shadow: 10px 12px 24px -6px rgba(84,81,81,0.31); -webkit-box-shadow: 10px 12px 24px -6px rgba(84,81,81,0.31); -moz-box-shadow: 10px 12px 24px -6px rgba(84,81,81,0.31);">
    <div id="mainhome" class="m-3"> 
        <div class="control m-1">
        <button onclick="newwallet();document.getElementById('jsonkey').style.display = 'none';document.getElementById('formsignin').style.display = 'block';document.getElementById('unlocking').disabled = true;document.getElementById('isbackup').style.display = 'block';document.getElementById('new').style.display = 'block';" class="button is-medium is-fullwidth is-white">
        <span class="icon is-medium">
        <i class="bi bi-plus-square" style="color:hsl(348, 100%, 61%);"></i>
        </span>
        <span class="is-size-6">New wallet</span>
      </button>
      </div>
        <div class="is-divider" data-content="OR"></div>
        <div class="control m-1">
        <button onclick="document.getElementById('jsonkey').style.display = 'none';document.getElementById('formsignin').style.display = 'block';document.getElementById('unlocking').disabled = false;document.getElementById('isbackup').style.display = 'none';document.getElementById('isbackup').innerHTML = '';document.getElementById('new').style.display = 'none';document.getElementById('mainhome').style.display = 'none';document.getElementById('loginwallet').style.display = 'block';" class="button is-medium is-fullwidth is-outlined is-white">
        <span class="icon is-medium">
        <i class="bi bi-key-fill" style="color:hsl(141, 53%, 53%);"></i>
        </span>
        <span class="is-size-6">Sign in with key</span>
      </button>
      </div>


      <div class="control m-1">
      <button onclick="document.getElementById('jsonkey').style.display = 'block';document.getElementById('unlocking').disabled = false;document.getElementById('formsignin').style.display = 'none';document.getElementById('isbackup').style.display = 'none';document.getElementById('isbackup').innerHTML = '';document.getElementById('new').style.display = 'none';document.getElementById('mainhome').style.display = 'none';document.getElementById('loginwallet').style.display = 'block';" class="button is-medium is-fullwidth is-outlined is-white">
      <span class="icon is-medium">
      <i class="bi bi-journal-code" style="color:hsl(217, 71%, 53%)"></i>
      </span>
      <span class="is-size-6">Sign In with JSON</span>
    </button>
    </div>
    </div>
        



        <div id="loginwallet" style="display:none;">

        <!---- <h1 class="subtitle has-text-info-light" id="titlexm">
            ${language.ltitlelogin}
            </h1> --->
            <div class="columns">
                <div class="column ">
                    
           
                <div id="jsonkey" class="file is-small is-boxed is-centered m-4" style="display:none;">
                  <label class="file-label">
                    <input id="fileToLoad" onchange="hash2key()" class="file-input" type="file" name="resume">
                    <span class="file-cta">
                      <span class="file-icon">
                      <i class="bi bi-file-arrow-up"></i>
                      </span>
                      <span class="file-label">
                        JSON Keystore…
                      </span>
                    </span>
                  </label>
                </div>


                    <div class="field" id="formsignin">
                        <label class="label has-text-info-light">${language.lsecret}</label>
                        <div class="control">
                            <input id="seed" class="input is-primary" type="text" placeholder="SCHABCJ............IOEJ7">
                        </div>
                    </div>
                    <div id="new" class="is-size-7" style="margin-bottom: 25px;"></div>
                    <div div class="field" id="isbackup"></div>
                    <div class="field">
                        <div class="control">
                            <button onclick="login('login');" class="button is-light is-fullwidth mb-2" id="unlocking">${language.lsignin}</button>
                            <button onclick="document.getElementById('mainhome').style.display = 'block';document.getElementById('loginwallet').style.display = 'none';" class="button is-info is-inverted is-outlined is-fullwidth mb-2" id="newacc">Back</button>
                        </div>
                     </div>
                </div>
            </div>

        </div>

        </div>
    </section>      
`
    /**
     * LoggedInPage
     * 
     * @param {any} key 
     * @param {any} number 
     */
let loggedInPage = (key, number) => `
    <section class="section" style="padding-top: 0;">
        <div class="column container box is-one-third">
        <div style="border-radius:7px;padding:1rem;background-image: linear-gradient(to right bottom, #177899, #008da9, #00a3b4, #00b8b9, #12cdba);">
        <h3 class="title" style="color:white;font-size:1.5rem;">
        ${language.lbalance}
            </h3>
            <h3 id="balance" class="subtitle" style="color:white;">
            </h3>
            <h4 class="title" style="color:white;margin-top:1px;font-size:1.5rem;">
            ${language.lpublic}
            </h4>
            <h4 class="subtitle" style="color:white;font-size:1rem;">
                ${key.publicKey()}
            </h4>
            <div class="control">
            <button class="button is-light is-small mb-1 is-fullwidth" onclick="document.getElementById('trsshow').classList.add('is-active');"><i class="bi bi-shield-fill-check" style="color:hsl(141, 53%, 53%);"></i>&nbsp;Trustline</button>
           
            <!------ <button class="button is-light is-small mb-1 is-fullwidth" onclick="document.getElementById('trsshow').classList.add('is-active');"><i class="bi bi-boxes" style="color:hsl(217, 71%, 53%);"></i>&nbsp;Labs</button> ----->
            <button class="button is-dark is-small mb-1 is-fullwidth" onclick="document.getElementById('pkeys').classList.add('is-active');"><i class="bi bi-device-hdd-fill" style="color:hsl(204, 86%, 53%);"></i>&nbsp;Export Wallet</button>
            <button class="button is-dark is-small mb-1 is-fullwidth" onclick="window.open('https://stellarterm.com/exchange/XLM-native/MICRO-GC3RQUPP6GHEZ33SCVZI22KFSH4CEJEZAKMLWIDCRM2BVBZMO5LEDVAJ');"><i class="bi bi-coin" style="color:hsl(48, 100%, 67%);"></i>&nbsp;Buy Micro</button>
            </div>
            </div>
            <br>
            <div class="column">
                <h2 class="subtitle">
                ${language.lntransaction}
                </h2>
                <div class="columns" style="">
                    <div class="column is-full">
                    <div class="field">
                    <label class="label">${language.lasset}</label>
                    <div class="control">
  <div class="select is-primary" >
    <select style="" id="ascd">
    <option disabled>ㅤㅤㅤㅤ ㅤㅤㅤㅤ ㅤㅤㅤㅤ ㅤㅤㅤㅤ ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ</option>
    <option id="myassets" style="display:none;">MICRO</option>
      
    </select>
  </div>
</div>
</div>
                        <div class="field">
                            <label class="label">${language.lrec}</label>
                            <div class="control">
                                <input id="destination" class="input is-primary is-fullwidth" type="text" placeholder="GBZNF2TXVCF4OXAWBR7WYMNVRI5INI7SGMJHEHRAVMJQG3MU5ZXQHI45" required>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">${language.lamount}</label>
                            <div class="control">
                                <input id="amount" class="input is-primary is-fullwidth" type="number" placeholder="0.0000" required>
                                </div>
                        </div>     
                        <div class="field">
                        <label class="label">Memo</label>
                        <div class="control">
                            <input id="inputmemo" class="input is-primary is-fullwidth" type="text" placeholder="${language.dem}" required>
                            </div>
                    </div>      
                                      
                        <div class="field">
                            <div class="control">
                                <button class="button is-primary is-fullwidth mb-2" id="txmshow"><i class="bi bi-pencil-square"></i>&nbsp;${language.lsend}</button>
                                <button class="button is-dark  is-fullwidth mb-2" onclick="hidetxh()" id="btnshwr"><i class="bi bi-eye-fill"></i>&nbsp;Show History</button>
                            </div>
                        </div>

          
                    </div>
                </div>
            </div>
            <div class="content">
                <div id="payment-error" class="error">
                </div> 
            </div>          
        </div>
        <div class="column container box is-one-third is-centered mb-5" id="historyt" style="display:none;">
            <h4 class="title mt-3 is-4">
            ${language.lhistory}
            </h4>
            

            <table class="table">
            <thead>
            <tr>
                <th>${language.dtc}</th>
                <th>${language.status}</th>
            </tr>
        </thead>
            <tbody id="transactions">

            </tbody>
            </table>
            <center>
            <a class="button is-danger is-light is-small is-rounded" href="${isExplorer}account/${key.publicKey()}" target="_blank">${language.mexp}</a>
            </center>
        </div>
    </section>  
    <div id="confshow" class="modal"> <div class="modal-background"></div> <div class="modal-content"> <div class="card m-6" style="border-radius:1rem"> <div class="card-content"> <div class="content "><h4 class="mb-5">${language.txconf}</h4><div class="is-info">
  
    <strong>${language.lasset} :</strong><br> <label id="assetnx"></label><br>
    <strong>${language.lrec} :</strong><br> <label id="assetrx"></label><br>
    <strong>${language.lamount} :</strong><br> <label id="assetax"></label><br>
    <strong>Memo :</strong><br> <label id="assetmx">-</label><br>
    <strong>XDR :</strong><br<div class="control">
    <textarea class="textarea" id="xdrarea" readonly>loading...</textarea>
  </div><br>
  </div>
  <div class="buttons">
  <button class="button is-danger"  onclick="document.getElementById('confshow').classList.remove('is-active');">${language.cancel}</button>
  <button id="payment-button" class="button is-success" onclick="document.getElementById('confshow').classList.remove('is-active');">${language.confirm}</button>
</div>
  </div> </div> </div> </div> </div> 

  <div class="modal" id="pkeys">
  <div class="modal-background"></div>
  <div class="modal-content">
  <div class="card m-6" style="border-radius:1rem">
  <div class="card-content">
    <div class="content">
    <div class="field is-small" style="text-align:center;">
    <input id="switchRoundedInfo" type="checkbox" name="switchRoundedInfo" class="switch is-rounded is-danger is-small" onclick="checkcond();">
    <label for="switchRoundedInfo">Reveal</label>
  </div>
    <div class="field">
    <div class="control is-small">
      <input class="input is-small is-danger is-rounded is-fullwidth" id="hiddenkeys" type="password" value="${encryptls('dcr', 'ok')}" readonly style="color:hsl(0, 0%, 21%);">
    </div>
  </div>

  
    </div>
  </div>
</div>
    <!-- Any other Bulma elements you want -->
  </div>
  <button class="modal-close is-large" aria-label="close" onclick="document.getElementById('pkeys').classList.remove('is-active');"></button>
</div>


  <div id="trsshow" class="modal"> <div class="modal-background"></div> <div class="modal-content"> <div class="card m-6"> <div class="card-content"> <div class="content "><button class="modal-close is-large" aria-label="close" onclick="document.getElementById('trsshow').classList.remove('is-active');"></button><h4 class="mb-5">${language.ttrustline}</h4>
  <div class="field">
  <p class="control">
    <input id="tassetIssuerAddress" class="input is-primary" type="text" placeholder="Issuer Address" oninput="let p=this.selectionStart;this.value=this.value.toUpperCase();this.setSelectionRange(p, p);">
  </p>
</div>
<div class="field">
  <p class="control">
    <input id="tassetCode" class="input is-primary" type="text" placeholder="Symbol" oninput="let p=this.selectionStart;this.value=this.value.toUpperCase();this.setSelectionRange(p, p);">
  </p>
</div>
<div class="field">
  <p class="control">
    <button class="button is-success" id="addtrustline">
    ${language.tadd}
    </button>
  </p>
</div>
</div> </div> </div> </div> </div> 
`
    /**
     * Check the balance of account 
     * We are only checking for lumens currently
     * 
     * @param {any} key 
     */
let getBalance = (key) => {
    server.loadAccount(key).catch(stellar.NotFoundError, () => {
        document.getElementById('balance').innerHTML = `<p>Account not found on network. Please register the account by sending lumens to it before using the client.</p>`
    }).then(acc => {

        acc.balances.forEach(balance => {
            if (balance.asset_type === 'native') {
                document.getElementById('myassets').insertAdjacentHTML("beforebegin", `<option value="native">XLM ~ ${balance.balance.substring(0, balance.balance.length - 8)}</option>`)
                document.getElementById('myassets').insertAdjacentHTML("beforebegin", `<option value="GC3RQUPP6GHEZ33SCVZI22KFSH4CEJEZAKMLWIDCRM2BVBZMO5LEDVAJ|MICRO">MICRO ~ 0.00000</option>`)

                document.getElementById('balance').innerHTML = `${balance.balance.substring(0, balance.balance.length - 5)} XLM`
                    //  console.log(`${balance.balance} XLM`)
            }

            if (balance.asset_type !== 'native') {

                document.getElementById('myassets').insertAdjacentHTML("beforebegin", `<option value="${balance.asset_issuer}|${balance.asset_code}">${balance.asset_code} ~ ${balance.balance}</option>`)

                var assets_info = isServer + "/assets?asset_code=" + balance.asset_code + "&asset_issuer=" + balance.asset_issuer

                $.getJSON(assets_info, function(data) {
                    var reqtoml = data._embedded.records[0]._links.toml.href
                        // console.log(reqtoml)
                    $.get(reqtoml, function(data2) {

                        var resptoml = toml(data2)
                        var issueraddress = resptoml["[CURRENCIES"]["issuer"]
                        var issuerimage = resptoml["[CURRENCIES"]["image"]
                        localStorage.setItem(issueraddress, issuerimage);
                        console.log(localStorage.getItem(issueraddress))
                    });
                });


            }


        })

        $("#ascd option").each(function() {
            $(this).siblings('[value="' + this.value + '"]').remove();
        });
    })
}


/**
 * Renders logged in page
 * 
 * @param {any} secretSeed 
 */
let renderLoggedInPage = (secretSeed) => {
        let keyPair = keypairFromSecret(secretSeed)

        let noTx = server.transactions().forAccount(keyPair.publicKey()).limit("10").order("desc").call().then(page => {
            bulmaToast.toast({
                message: language.loginsc,
                type: 'is-success',
                animate: { in: 'fadeIn',
                    out: 'fadeOut'
                },
            })
            document.getElementById('app').innerHTML = loggedInPage(keyPair, page.length)
            document.getElementById('signout').innerHTML = `<a class="button bd-tw-button is-rounded" href="" onclick="logout()">
            <span class="icon">
            <i class="bi bi-door-open-fill"></i>
        </span>
            <span>${language.lsignout}</span>
        </a>`

            page.records.forEach(key => {

                var hash = key.hash
                    //   var resp = hash.substring(10, 55)
                    // var resp = hash.replace(resp, '_._._._')
                    // if (key.memo == undefined) { var memotext = 'NaN' } else { var memotext = key.memo }
                if (key.successful == true) { var statustx = '<p class="status status-paid">Success</p>' } else { var statustx = '<p class="status status-unpaid">Failed</p>' }
                var getDate = key.created_at.slice(0, 10).split('-'); //create an array
                let _time = key.created_at.match(/\d\d:\d\d/);
                var _date = getDate[1] + '/' + getDate[2] + '/' + getDate[0] + ' - [' + _time[0] + '] ';



                document.getElementById('transactions').innerHTML += `<tr><td><a style="color:#00D1B2;" href="${isExplorer}tx/${key.hash}" target="_blank"> ${_date}</a></td><td> ${statustx}</td></tr>`

            })



            document.getElementById('payment-button').addEventListener('click', () => {
                document.getElementById('payment-button').disabled = true
                setTimeout(() => {
                    document.getElementById('payment-button').disabled = false
                }, 10000)
                sendXLM(keyPair)
            })

            document.getElementById('addtrustline').addEventListener('click', () => {
                document.getElementById('addtrustline').disabled = true
                setTimeout(() => {
                    document.getElementById('addtrustline').disabled = false
                }, 10000)
                addtrust(keyPair)
            })

            document.getElementById('txmshow').addEventListener('click', () => {
                txmshow(keyPair)
            })

        }).then(log => {
            getBalance(keyPair.publicKey())
        }).catch(err => {
            document.getElementById("mainhome").style.display = "none";
            document.getElementById("loginwallet").style.display = "block";

            document.getElementById('new').innerHTML = `<div class="field">
            <img src="https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${keyPair.publicKey()}" style="display: block; margin-left: auto; margin-right: auto; width: 50%;margin-bottom:1rem;margin-top:1rem;border-radius:10px;"></img>
              
            <label class="label has-text-white">${language.lgenpub}</label>
            <div class="control">
              <input class="input is-primary" type="text" value="${keyPair.publicKey()}" readonly>
            </div>
          </div><div class="notification is-warning is-red">${language.wlinac} ${language.acinfo}</div><button class="button is-info is-inverted is-fullwidth" onclick="logout()">Another wallet</button>`
            var unclock = document.getElementById("unlocking")
            unclock.disabled = false;
            unclock.innerHTML = language.lsignin;


        })
    }
    /**
     * Login method calls renderLoggedInPage and adds signout button
     * 
     */


let login = (secure) => {
    if (secure === "login") {
        var secretSeed = document.getElementById('seed').value
        encryptls("enc", secretSeed)

        if (stellar.StrKey.isValidEd25519SecretSeed(secretSeed)) {


            window.location.reload();
            renderLoggedInPage(secretSeed)
            var unclock = document.getElementById("unlocking")
            unclock.disabled = true;
            unclock.innerHTML = "Unlocking...";
        } else {
            bulmaToast.toast({
                message: language.secerr,
                type: 'is-danger',
                animate: { in: 'fadeIn',
                    out: 'fadeOut'
                },
            })
        }

    }
    if (secure === "logg") {
        var secretSeed = encryptls("dcr", "ok");

        if (secretSeed !== "logout") {
            renderLoggedInPage(secretSeed)
            document.getElementById("unlocking").style.display = "none";
            document.getElementById("newacc").style.display = "none";
            document.getElementById("formsignin").style.display = "none";
            document.getElementById("titlexm").style.display = "none";
        }

    }




}

let newwallet = () => {
        const pair = StellarSdk.Keypair.random();

        const Http = new XMLHttpRequest();
        const url = 'https://horizon-testnet.stellar.org/friendbot?addr=' + pair.publicKey()
        Http.open("GET", url);
        Http.send();
        var objsn = { 'hash_version': '1.0.1-beta', 'public': pair.publicKey(), 'key2hash': 'MICRO' + utf8_to_b64(pair.secret()).replace('=', 'XYZ'), 'provider': 'microlumens.com' }
        var datajs = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(objsn, undefined, 2));
        document.getElementById('new').innerHTML = `<div class="notification is-white">${language.procwallet}</div>`
        document.getElementById("unlocking").disabled = true;
        document.getElementById("mainhome").style.display = "none";
        document.getElementById("loginwallet").style.display = "block";

        setTimeout(() => {
            document.getElementById('new').innerHTML = `<div class="notification is-white">
        </button>

        <strong>${language.lgenkey}</strong>        <div class="field is-horizontal is-small">
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input class="input is-static is-fullwidth is-small" type="text" value="` + pair.secret() + `" readonly>
            </p>
          </div>
        </div>
      </div><strong>${language.lgenpub}</strong> <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input is-static is-fullwidth is-small" type="text" value="` + pair.publicKey() + `" readonly>
          </p>
        </div>
      </div>
    </div> <article class="message is-warning">
   <!---- <div class="message-body">
    <p id="backup">${language.bwinfo} </p>
    </div> ----->
  </article>
  `;

            bulmaToast.toast({
                message: language.bwinfo,
                type: 'is-warning',
                animate: { in: 'fadeIn',
                    out: 'fadeOut'
                },
            })
            document.getElementById('isbackup').innerHTML = `<center>
            <a href="data:` + datajs + `" download="microlummens-wallet.json" style="color:hsl(348, 100%, 61%);text-decoration:none;background:white;margin-top:-15px;border-radius:4px;padding:8px;text-align:center;"><i class="bi bi-arrow-down-square-fill"></i> Backup wallet</a></center>
            <div class="field is-small mt-4">
            <input class="is-checkradio is-danger is-small" id="exampleCheckboxBlockDefault" type="checkbox" name="exampleCheckboxBlockDefault" onclick="enablelogin()">
            <label for="exampleCheckboxBlockDefault" style="color:white;">${language.svit}</label>
          </div>
          `
        }, 10000);


    }
    /**
     * Logout method
     * Show initial page
     * 
     */
let logout = () => {
    bulmaToast.toast({
        message: language.outsc,
        type: 'is-success',
        animate: { in: 'fadeIn',
            out: 'fadeOut'
        },
    })
    encryptls("enc", "logout")
    document.getElementById('app').innerHTML = loginPage
    document.getElementById('signout').innerHTML = ''
}

/**
 * Helper method
 * Generate keypair from secret seed
 * 
 * @param {any} secret 
 * @returns StellarSdk.Keypair
 */
let keypairFromSecret = (secret) => {
    return stellar.Keypair.fromSecret(secret)
}

/**
 * Method for transferring Lumens from one account to another
 * 
 * @param {any} keyPair 
 * 
 */

let addtrust = (keyPair) => {
    bulmaToast.toast({
        message: language.proctrx,
        type: 'is-success',
        animate: { in: 'fadeIn',
            out: 'fadeOut'
        },
    })
    let tassetCode = document.getElementById('tassetCode').value
    let tassetIssuerAddress = document.getElementById('tassetIssuerAddress').value
    server.loadAccount(keyPair.publicKey()).then(sourceAccount => {
        transaction = new stellar.TransactionBuilder(sourceAccount, {
                fee: stellar.BASE_FEE,
            }).addOperation(stellar.Operation.changeTrust({
                asset: new stellar.Asset(tassetCode, tassetIssuerAddress),
                source: keyPair.publicKey()
            }))
            .build()
        transaction.sign(keyPair)
        return server.submitTransaction(transaction)
    }).then(result => {
        bulmaToast.toast({
            message: language.suctr,
            type: 'is-success',
            animate: { in: 'fadeIn',
                out: 'fadeOut'
            },
        })
        getBalance(keyPair.publicKey())
        document.getElementById('addtrustline').disabled = false
        document.getElementById('trsshow').classList.remove('is-active')
        document.getElementById("tassetCode").value = "";
        document.getElementById("tassetIssuerAddress").value = "";
    }).catch(err => {
        bulmaToast.toast({
            message: language.errtr,
            type: 'is-warning',
            animate: { in: 'fadeIn',
                out: 'fadeOut'
            },
        })
        document.getElementById('addtrustline').disabled = false
    })
}



let sendXLM = (keyPair) => {
    bulmaToast.toast({
        message: language.proctrx,
        type: 'is-success',
        animate: { in: 'fadeIn',
            out: 'fadeOut'
        },
    })
    let transaction
    let amount = document.getElementById('amount').value
    let destinationAddress = document.getElementById('destination').value
    let memos = document.getElementById("inputmemo").value
    let assetid = document.getElementById('ascd').value
    let issuerassetx = assetid.substr(0, assetid.indexOf('|'));
    let issuercodx = assetid.substr(assetid.indexOf('|') + 1);
    let astpx
    if (assetid == "native") {

        astpx = stellar.Asset.native();
    } else {
        astpx = new stellar.Asset(issuercodx, issuerassetx);
    }
    server.loadAccount(keyPair.publicKey()).then(sourceAccount => {
        transaction = new stellar.TransactionBuilder(sourceAccount, {
                fee: stellar.BASE_FEE,
            }).addOperation(stellar.Operation.payment({
                destination: destinationAddress,
                asset: astpx,
                amount: amount
            })).addMemo(stellar.Memo.text(memos))
            .build()
        transaction.sign(keyPair)
        return server.submitTransaction(transaction)
    }).then(result => {
        console.log(result);
        if (result.successful == true) { var statustx2 = '<p class="status status-paid">Success</p>' } else { var statustx2 = '<p class="status status-unpaid">Waiting</p>' }
        var getDate2 = result.created_at.slice(0, 10).split('-'); //create an array
        let _time2 = result.created_at.match(/\d\d:\d\d/);
        var _date2 = getDate2[1] + '/' + getDate2[2] + '/' + getDate2[0] + ' - [' + _time2[0] + '] ';
        document.getElementById('payment-error').innerHTML = `<div class="notification is-success is-light">Transaction has been successful</div>`
        document.getElementById('transactions').innerHTML += `<tr><td><a style="color:#00D1B2;" href="${isExplorer}tx/${result.hash}" target="_blank"> ${_date2}</a></td><td> ${statustx2}</td></tr>`
        document.getElementById('payment-button').disabled = false
        getBalance(keyPair.publicKey())
    }).catch(err => {
        console.log(err);
        if (err.data.extras.result_codes.operations[0] == "op_no_destination") {
            document.getElementById('payment-error').innerHTML = `<div class="notification is-warning is-light">Failed to send XLM because the recipient's address has not been activated on this network [<a id="actt">Gift 1.5 XLM for Activation]</a></div>`
            document.getElementById("actt").addEventListener("click", function() {

                server.loadAccount(keyPair.publicKey()).then(sourceAccount => {
                    transaction = new stellar.TransactionBuilder(sourceAccount).addOperation(stellar.Operation.createAccount({
                        destination: destinationAddress,
                        startingBalance: '1.5'
                    })).build()
                    transaction.sign(keyPair)
                    return server.submitTransaction(transaction)
                }).then(result => {
                    if (result.successful == true) {
                        document.getElementById('payment-error').innerHTML = `<div class="notification is-info is-light">Succeed...  Wait 10 seconds and try again.</div>`
                        setTimeout(() => {
                            document.getElementById('payment-error').innerHTML = `<div class="notification is-success is-light">Try it now..</div>`
                            document.getElementById('payment-button').disabled = false
                        }, 10000)
                    }
                }).catch(function(error) {
                    document.getElementById('payment-error').innerHTML = `<div class="notification is-info is-light">Failed to send a gift.....</div>`
                });
            }, false);
        } else {
            document.getElementById('payment-error').innerHTML = `<div class="notification is-warning is-light">Something went wrong with payment. Please try again....</div>`
            document.getElementById('payment-button').disabled = false
        }
    })
}

let txmshow = (keyPair) => {
    let transaction
    document.getElementById('payment-error').innerText = "";
    let assetid = document.getElementById('ascd').value
    let issuerassetx = assetid.substr(0, assetid.indexOf('|'));
    let issuercodx = assetid.substr(assetid.indexOf('|') + 1);
    if (assetid == "native") {
        var setcode = stellar.Asset.native();
        var nmast = "XLM";
        document.getElementById('assetnx').innerText = "XLM";
    } else {
        var nmast = issuercodx;
        var setcode = new stellar.Asset(issuercodx, issuerassetx);
        document.getElementById('assetnx').innerText = issuercodx;
    }

    if (stellar.StrKey.isValidEd25519PublicKey(document.getElementById('destination').value)) {
        if (document.getElementById('amount').value < 1) {
            bulmaToast.toast({
                message: language.lamount + ' Error!',
                type: 'is-danger',
                animate: { in: 'fadeIn',
                    out: 'fadeOut'
                },
            })
        } else {
            document.getElementById("confshow").classList.add("is-active");
            let amount = document.getElementById('amount').value
            let destinationAddress = document.getElementById('destination').value
            let memos = document.getElementById("inputmemo").value

            document.getElementById('assetax').innerText = amount + " " + nmast;
            var resp = destinationAddress.substring(6, 49)
            var resp = destinationAddress.replace(resp, '***')
            document.getElementById('assetrx').innerHTML = "<a class='is-ghost' href='" + isExplorer + "account/" + destinationAddress + "'>" + resp + "</a>";
            document.getElementById('assetmx').innerText = memos;
            server.loadAccount(keyPair.publicKey()).then(sourceAccount => {
                transaction = new stellar.TransactionBuilder(sourceAccount, {
                        fee: stellar.BASE_FEE,
                    }).addOperation(stellar.Operation.payment({
                        destination: destinationAddress,
                        asset: setcode,
                        amount: amount
                    })).addMemo(stellar.Memo.text(memos))
                    .build()
                document.getElementById("xdrarea").value = transaction.toEnvelope().toXDR('base64');
            }).catch(err => {
                console.log(err);
            })

        }
    } else {
        bulmaToast.toast({
            message: language.lrec + ' Error!',
            type: 'is-danger',
            animate: { in: 'fadeIn',
                out: 'fadeOut'
            },
        })
    }

}


/** 
 * Basic setup
 * Render login page first and set server url
 * 
 */

document.getElementById('app').innerHTML = loginPage

let stellar = StellarSdk

//stellar.Network.usePublicNetwork()

var switchnet = document.getElementById("switchNetwork").addEventListener("change", slchain);

function slchain() {
    var chain = document.getElementById("switchNetwork").value;
    if (chain === 'testnet') {
        localStorage.setItem('chainrpc', "https://horizon-testnet.stellar.org/");

    } else {
        localStorage.setItem('chainrpc', "https://horizon.stellar.org/");

    }
    // alert('Connected to network : ' + localStorage.getItem('chainrpc'))

    document.getElementById("popup-info").innerHTML = `<div class="modal is-active"> <div class="modal-background"></div> <div class="modal-content"> <div class="card m-6"> <div class="card-content"> <div class="content "> <b>${language.connet}</b> ` + localStorage.getItem('chainrpc') + `</div> </div> </div> </div> </div>`
    console.log('Chain : ' + localStorage.getItem('chainrpc'))

    setTimeout(function() {

        location.reload()

    }, 1000);
}
if (localStorage.getItem('chainrpc') === "https://horizon-testnet.stellar.org/") {
    document.getElementById("switchNetwork").selectedIndex = "1"
    isServer = localStorage.getItem('chainrpc')
    isExplorer = "https://stellar.expert/explorer/testnet/"
    stellar.Network.useTestNetwork()
} else {
    isServer = "https://horizon.stellar.org"
    isExplorer = "https://stellar.expert/explorer/public/"
    stellar.Network.usePublicNetwork()
}
console.log(localStorage.getItem('chainrpc'))
let server = new stellar.Server(isServer)