const DataRestaurant = [{
        Restaurant_Image: 'img/KFC.jpg',
        Restaurant_Name: 'KFC Mễ Trì',
        Restaurant_Type: 'Fast Food',
        Restaurant_Address: 'Me Tri, Ha Noi',
        Price: 10,
        Service_Rate: 4,
        Clean_Rate: 4,
        Food_Rate: 4,
        Date: "10/10/2020",
        Notes: "note KFC...",
    },
    {
        Restaurant_Image: 'img/CongCF.jpg',
        Restaurant_Name: 'Cộng Cafe',
        Restaurant_Type: 'Cafe',
        Restaurant_Address: 'Co Nhue, Ha Noi',
        Price: 5,
        Service_Rate: 4,
        Clean_Rate: 5,
        Food_Rate: 5,
        Date: "10/10/2020",
        Notes: "note CF 1...",
    },
    {
        Restaurant_Image: 'img/PizzaHut.jpg',
        Restaurant_Name: 'Pizza Hut',
        Restaurant_Type: 'Fast Food',
        Restaurant_Address: 'Me Tri, Ha Noi',
        Price: 7,
        Service_Rate: 3,
        Clean_Rate: 4,
        Food_Rate: 3,
        Date: "10/10/2020",
        Notes: "Pizza hut something",
    },
    {
        Restaurant_Image: 'img/KingBBQ.jpg',
        Restaurant_Name: 'King BBQ',
        Restaurant_Type: 'BBQ',
        Restaurant_Address: 'Dong A, Nam Dinh',
        Price: 100,
        Service_Rate: 5,
        Clean_Rate: 5,
        Food_Rate: 4,
        Date: "10/10/2020",
        Notes: "A Restaurant of King BBQ in Nam Dinh City",
    }
]

var database;
var request = window.indexedDB.open("Restaurant-Rate", 1);
request.onupgradeneeded = function(event) {
    var database = event.target.result;
    var objectStore = database.createObjectStore("I-RateRes", { keyPath: "id", autoIncrement: true });
    for (var i in DataRestaurant) {
        objectStore.add(DataRestaurant[i])
    }
}
request.onsuccess = function(event) {
    database = request.result;
    console.log("success: " + database);
};

function GetRes(collectionName) {
    const transaction = database.transaction([collectionName], "readonly")
    const objectStore = transaction.objectStore(collectionName)
    request = objectStore.getAll();
    return request
}
async function AddRes(collectionName, data) {
    const Newdata = await database.transaction([collectionName], "readwrite").objectStore(collectionName).add(data)
    Newdata.onsuccess = () => {
        $('#rate-form').each(function() {
            this.reset()
        })
        navigator.notification.beep(1);
        navigator.vibrate(100)
        alert("You Rated Successfully")
        $('#listrest').empty()
        home()
    }
    Newdata.onerror = () => {
        alert('Error Rate')
    }
}

function DeleteRes(data) {
    data = Number(data)
    return database.transaction(["I-RateRes"], "readwrite").objectStore("I-RateRes").delete(data)
}

function GetDetailsRes(data) {
    const dataGet = database.transaction(["I-RateRes"], "readonly").objectStore("I-RateRes").get(Number(data))
    dataGet.onerror = function() {
        alert("Error getting")
    }
    return dataGet
}
