var language;

function getLanguage() {
    (localStorage.getItem('language') == null) ? setLanguage('en-US'): false;
    $.ajax({
        url: './lang/' + localStorage.getItem('language') + '.json?gets=10',
        dataType: 'json',
        async: false,
        dataType: 'json',
        success: function(lang) { language = lang }
    });
}

function setLanguage(lang) {
    localStorage.setItem('language', lang);
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

function enablelogin() {
    document.getElementById("unlocking").disabled = false;
}

function showtrade() {
    document.getElementById("tradeshow").classList.add("is-active");
}

function tradeclose() {
    document.getElementById("tradeshow").classList.remove("is-active");
}

function txmshow() {
    document.getElementById('payment-error').innerText = "";
    let assetid = document.getElementById('ascd').value
    let issuerassetx = assetid.substr(0, assetid.indexOf('|'));
    let issuercodx = assetid.substr(assetid.indexOf('|') + 1);
    if (assetid == "native") {

        document.getElementById('assetnx').innerText = "XLM";
    } else {
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

            document.getElementById('assetax').innerText = amount;
            var resp = destinationAddress.substring(6, 49)
            var resp = destinationAddress.replace(resp, '***')
            document.getElementById('assetrx').innerHTML = "<a class='is-ghost' href='" + isExplorer + "account/" + destinationAddress + "'>" + resp + "</a>";
            document.getElementById('assetmx').innerText = memos;
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
        <div class="column container box is-two-fifths" style="background-image: linear-gradient(to right bottom, #177899, #008da9, #00a3b4, #00b8b9, #12cdba);">
            <h1 class="subtitle has-text-info-light">
            ${language.ltitlelogin}
            </h1>
            <div class="columns">
                <div class="column ">
                    <div class="field">
                        <label class="label has-text-info-light">${language.lsecret}</label>
                        <div class="control">
                            <input id="seed" class="input is-primary" type="text" placeholder="Example: SCHKBJ............ZLJ7">
                        </div>
                    </div>
                    <div id="new" style="margin-bottom: 25px;"></div>
                    <div div class="field" id="isbackup"></div>
                    <div class="field">
                        <div class="control">
                            <button onclick="login();" class="button is-light" id="unlocking">${language.lsignin}</button>
                            <button onclick="newwallet()" class="button is-light">${language.lcreate}</button>
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
        <div class="column container box is-half">
        <div style="border-radius:7px;padding:1rem;background-image: linear-gradient(to right bottom, #177899, #008da9, #00a3b4, #00b8b9, #12cdba);">
        <h3 class="title" style="color:white;">
        ${language.lbalance}
            </h3>
            <h3 id="balance" class="subtitle" style="color:white;">
            </h3>
            <h4 class="title" style="color:white;margin-top:1px;">
            ${language.lpublic}
            </h4>
            <h4 class="subtitle" style="color:white;">
                ${key.publicKey()}
            </h4>
            <div class="control">
            <button class="button is-light is-small" onclick="document.getElementById('trsshow').classList.add('is-active');"><i class="fa fa-shield" aria-hidden="true"></i>&nbsp;Trustline</button>
           
            <button class="button is-dark is-small" onclick="showtrade()"><i class="fa fa-line-chart" aria-hidden="true"></i>&nbsp;Get Micro</button>
           
            </div>
            </div>
            <br>
            <div class="column">
                <h2 class="subtitle">
                ${language.lntransaction}
                </h2>
                <div class="columns">
                    <div class="column is-full">

                    <div class="field">
                    <label class="label">${language.lasset}</label>
                    <div class="control">
  <div class="select is-primary" >
    <select style="width:100%;" id="ascd">
    <option id="myassets" disabled>${language.lasset}</option>
      
    </select>
  </div>
</div>
</div>
                        <div class="field">
                            <label class="label">${language.lrec}</label>
                            <div class="control">
                                <input id="destination" class="input is-primary" type="text" placeholder="Example: SCHKBJ............ZLJ7" required>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">${language.lamount}</label>
                            <div class="control">
                                <input id="amount" class="input is-primary" type="number" placeholder="0.0000" required>
                                </div>
                        </div>     
                        <div class="field">
                        <label class="label">Memo</label>
                        <div class="control">
                            <input id="inputmemo" class="input is-primary" type="text" placeholder="${language.dem}" required>
                            </div>
                    </div>      
                                      
                        <div class="field">
                            <div class="control">
                                <button class="button is-primary" onclick="txmshow()" >${language.lsend}</button>
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
        <div class="column container box is-half is-centered mb-5" >
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

            <a class="button is-danger is-light is-small" href="${isExplorer}account/${key.publicKey()}" target="_blank">${language.mexp}</a>
            
        </div>
    </section>  
    <div id="confshow" class="modal"> <div class="modal-background"></div> <div class="modal-content"> <div class="card m-6"> <div class="card-content"> <div class="content "><h4 class="mb-5">${language.txconf}</h4><article class="message is-info">
    
    <div class="message-body">
    <strong>${language.lasset} :</strong><br> <label id="assetnx"></label><br>
    <strong>${language.lrec} :</strong><br> <label id="assetrx"></label><br>
    <strong>${language.lamount} :</strong><br> <label id="assetax"></label><br>
    <strong>Memo :</strong><br> <label id="assetmx"></label><br>
    </div>
  </article>
  <div class="buttons">
  <button class="button is-danger"  onclick="document.getElementById('confshow').classList.remove('is-active');">${language.cancel}</button>
  <button id="payment-button" class="button is-success" onclick="document.getElementById('confshow').classList.remove('is-active');">${language.confirm}</button>
</div>
  </div> </div> </div> </div> </div> 


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
                document.getElementById('myassets').insertAdjacentHTML("afterend", `<option value="native">XLM ~ ${balance.balance.substring(0, balance.balance.length - 8)}</option>`)
                document.getElementById('balance').innerHTML = `${balance.balance.substring(0, balance.balance.length - 5)} XLM`
                    //  console.log(`${balance.balance} XLM`)
            }
            if (balance.asset_type !== 'native') {
                document.getElementById('myassets').insertAdjacentHTML("afterend", `<option value="${balance.asset_issuer}|${balance.asset_code}">${balance.asset_code} ~ ${balance.balance}</option>`)
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
                //   console.log(balance.balance + ` ` + balance.asset_code)
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
            document.getElementById('signout').innerHTML = `<a class="button bd-tw-button" href="" onclick="logout()">
            <span class="icon">
        <i class="fa fa-sign-out"></i>
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

        }).then(log => {
            getBalance(keyPair.publicKey())
        }).catch(err => {
            document.getElementById('new').innerHTML = `<div class="notification is-warning is-red">${language.wlinac} ${language.acinfo}</div>`
            var unclock = document.getElementById("unlocking")
            unclock.disabled = false;
            unclock.innerHTML = language.lsignin;


        })
    }
    /**
     * Login method calls renderLoggedInPage and adds signout button
     * 
     */
let login = () => {
    if (stellar.StrKey.isValidEd25519SecretSeed(document.getElementById('seed').value)) {

        let secretSeed = document.getElementById('seed').value
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

let newwallet = () => {
        const pair = StellarSdk.Keypair.random();

        const Http = new XMLHttpRequest();
        const url = 'https://horizon-testnet.stellar.org/friendbot?addr=' + pair.publicKey()
        Http.open("GET", url);
        Http.send();
        var objsn = `{ 'pubkey': '` + pair.publicKey() + `', 'seckey': '` + pair.secret() + `' }`
        var datajs = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(objsn));
        document.getElementById('new').innerHTML = `<div class="notification is-prymary is-light">${language.procwallet}</div>`
        document.getElementById("unlocking").disabled = true;
        setTimeout(() => {
            document.getElementById('new').innerHTML = `<div class="notification is-light">
        </button>

        <strong>${language.lgenkey}</strong>        <div class="field is-horizontal">
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input class="input is-static" type="email" value="` + pair.secret() + `" readonly>
            </p>
          </div>
        </div>
      </div><strong>${language.lgenpub}</strong> <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input is-static" type="email" value="` + pair.publicKey() + `" readonly>
          </p>
        </div>
      </div>
    </div> <article class="message is-warning">
    <div class="message-body">
    <p id="backup">${language.bwinfo} </p>
    </div>
  </article>
 <a href="data:` + datajs + `" download="microlummens-wallet.json" style="color:hsl(348, 100%, 61%);"><i class="fa fa-download" aria-hidden="true"></i> Backup Wallet</a></p><br><p style="color:orange;">
  `;
            document.getElementById('isbackup').innerHTML = `<label class="checkbox has-text-info-light" style="display:block;" onclick="enablelogin()"><input type="checkbox"> ${language.svit}</label>`
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
