window.onload = () => {
  /*  let nome = "Salima";
  let eta = "22";
  let myObj = { nome, eta }; // crea un oggetto del tipo {nome: "Salima", età: "22"}
  setTimeout(() => {
    console.log("Verrò stampato tra 5 secondi");
  }, 5000);
  console.log(myObj); */
};

//https://jsonplaceholder.typicode.com/
/* 
API = Application program interface
Ciò che un'applicazione espone ad un'altra

REST/RESTFUL API e LIBRARY API

REST = REpresentational State Transfer => Uno stile guida di architettura software 

-Client-Server => Un client che fa richieste al server che a sua volta da info/dati al client
-Stateless => Non c'è nel server uno stato o una sessione vale a dire che tutte le richieste del client devono
              contenere tutte le informazioni necessarie.
-Utilizza solo un protocollo che è quello HTTP.
-Le operazioni CRUD => CREATE,READ,UPDATE e DELETE devono essere fatte utilizzando i verbi HTTP => POST,GET,PUT/PATCH e DELETE
-Tutte le risorse devono univocamente accessibili tramite URL che vengono detti end-point dell'API.


Il nostro obiettivo è quello di riuscire a maneggiare lato FRONT END le API

fetch() API


*/
//#region Promises
/* 

Promises servono per gestire e consumare async code.
Un promise può avere 3 stati => Resolve, Reject, Pending

let promise = new Promise(function(resolve, reject) {
  //CODICE CHE VOGLIO ESEGUIRE
});
*/
//#endregion
/* const name = "Salim";
let promise = new Promise((resolve, reject) => {
  if (name === "Salima") {
    resolve(name);
  } else {
    reject(error);
  }
})
  .then(nome => {                               
    console.log(nome);
  })
  .catch(() => {
    console.log("C'è stato un errore");
  }); */

//FETCH API
//Se non viene specificato il metodo HTTP di default usa GET
//GET è un metodo sicuro che serve per leggere dati da un'API
//404 not found
//200-300 ok 200 ok per i GET/DELETE 201 ok per i POST 203 ok Per i put
//403 forbidden
//401 Unauthorized
//500 Internal Error

/* var data;
fetch("https://jsonplaceholder.typicode.com/posts/101")
  .then(response => response.json()) //ritorna una promise
  .then(dati => {
    data = dati;
  })
  .catch(error => {
    console.log(error);
  });

const nuovoPost = { title: "foo", body: "bar", userId: 1 };
//POST serve per creare nuove risorse
fetch("https://jsonplaceholder.typicode.com/posts/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(nuovoPost)
})
  .then(response => response.json())
  .then(dati => console.log(dati))
  .catch(err => console.log(err));

//PUT/PATCH
//Put modifica tutta la risorsa per esempio un oggetto viene modificato tutto
//patch modifica una parte della risorsa
*/
/* const modifiedPost = {
  id: 1,
  title: "foo",
  body: "bar",
  userId: 1
};
//PUT
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(modifiedPost)
})
  .then(response => response.json())
  .then(dati => console.log(dati))
  .catch(err => console.log(new Error("Errore nella fetch")));

//Patch
const patchPost = {
  title: "foo"
};
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(patchPost)
})
  .then(response => response.json())
  .then(dati => console.log(dati))
  .catch(err => console.log(new Error("Errore nella fetch")));

//DELETE

fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "DELETE"
})
  .then(response => response.json())
  .then(dati => console.log(dati))
  .catch(err => console.log(new Error("Errore nella fetch"))); */

//CON THEN CATCH

/* const fetchData = () => {
  const nuovoPost = { title: "foo", body: "bar", userId: 1 };
  //POST serve per creare nuove risorse
  fetch("https://jsonplaceholder.typicode.com/posts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nuovoPost)
  })
    .then(response => response.json())
    .then(dati => console.log(dati))
    .catch(err => console.log(err));
};
fetchData();

const fetchDataAsync = async () => {
  const nuovoPost = { title: "foo", body: "bar", userId: 1 };
  //POST serve per creare nuove risorse
  try {
    let response = await fetch("https://jsonplacholder.typicode.com/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuovoPost)
    });
    if (response.ok) {
      let json = await response.json();
    }
  } catch (err) {
    console.log("errore nella fetch");
  }
  console.log(json);
};
fetchDataAsync(); */

//Fai una funzione che presi gli ordini se sono presenti tra gli avaible product
//ritornali altrimenti ritorna un errore, partendo dalle promise qui sotto.

const availableProducts = Promise.resolve({
  products: {
    warehouse_1: [
      {
        id: 1928,
        name: "Bluetooth speaker",
        price: 500
      },
      {
        id: 584,
        name: "Powerbank",
        price: 20
      }
    ]
  }
});

const orders = true
  ? Promise.resolve({
      data: [
        {
          id: 44848229,
          productId: 345345,
          quantity: 1
        },
        {
          id: 52384,
          productId: 584,
          quantity: 4
        }
      ]
    })
  : Promise.reject(new Error("Something went really bad on the backend"));

const orderList = async () => {
  return new Promise(async (resolve, reject) => {
    //dobbiamo estrarre gli ordini e i prodotti disponibili OK
    let ordersArray, availableProductsArray;
    try {
      let ordersData = await orders;
      ordersArray = ordersData.data;
    } catch (err) {
      return reject(new Error("Failed to fetch orders"));
    }
    try {
      let availableProductsData = await availableProducts;
      availableProductsArray = availableProductsData.products.warehouse_1;
    } catch (err) {
      return reject(new Error("Failed to fetch products"));
    }
    //confrontare il productId degli ordini con i prodotti disponibili
    //voglio estrarre tutti gli Id dai prodotti
    let availableProductsIds = availableProductsArray.map(
      product => product.id
    );
    //vedere se dentro gli ordini siano presenti gli Id dei product
    //includes controlla se nell'array sul quale è applicato è presente l'elemento che gli passi includes(elemento)
    //se è presente ritorna true altrimenti false
    let orderListArray = ordersArray.filter(order =>
      availableProductsIds.includes(order.productId)
    );
    //se l'array orderListArray non è vuoto manda il resolve altrimenti il reject
    if (orderListArray.length === 0) {
      return reject(new Error("No orders found"));
    } else {
      return resolve(orderListArray);
    }
  });
};

const showResult = async () => {
  try {
    let response = await orderList();
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};
showResult();
