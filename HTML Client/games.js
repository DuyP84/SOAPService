const URL = "https://bsite.net/duyphan8401/GameService.asmx"; 
const config = { headers: { 'Content-Type': 'text/xml' } };

//page load
function page_Load() {
getAll();
}
//Su kien click
function lnkID_Click(ID) {
    getDetails(ID);
   
}

//ham search
function btnSearch_Click() {
var keyword = document.getElementById("txtKeyword").value.trim(); 
if (keyword.length > 0) {
search (keyword); } 
else {
    getAll();
    }
}

//ham add
function btnAdd_click(){
    var newGame = {
        ID: document.getElementById("txtID").value,
        Name: document.getElementById("txtName").value,
        Genre: document.getElementById("txtGenre").value,
        Producer: document.getElementById("txtProducer").value,
        Price: document.getElementById("txtPrice").value
    };
    addNew(newGame);
}

//ham update
function btnUpdate_Click(){
    var newGame = {
        ID: document.getElementById("txtID").value,
        Name: document.getElementById("txtName").value,
        Genre: document.getElementById("txtGenre").value,
        Producer: document.getElementById("txtProducer").value,
        Price: document.getElementById("txtPrice").value
    };
    update(newGame);
}

//ham delete
function btnDeletee_Click(){
    if(confirm("Are you sure???"))
    {
        var ID = document.getElementById("txtID").value;
        deletee(ID);
    }
}

//soap method 
function getAll() {
    var body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <GetAll xmlns="http://duybua.org/" />
      </soap:Body>
    </soap:Envelope> `;
     
    axios.post (URL + "?op=GetAll", body, config).then((response) => {
    var xmlData = response.data; 
    //alert (xmlData); // for DEBUG 
    var jsonData = new X2JS().xml_str2json(xmlData); 
    //alert (JSON.stringify (jsonData)); // for DEBUG 
    var data = jsonData.Envelope.Body.GetAllResponse.GetAllResult.Game;
    //alert (JSON.stringify(data)); // for DEBUG 
    var games = []; 
    if (Array.isArray(data)) games = data; // JSON array 
    else if (typeof(data) == "object") games.push(data); // JSON object 
    //alert (JSON.stringify(games)); // for DEBUG 
    renderGameList(games); 
});
}

function getDetails(ID) {
    var body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <GetDetails xmlns="http://duybua.org/">
          <ID>${ID}</ID>
        </GetDetails>
      </soap:Body>
    </soap:Envelope>`;
     
    axios.post(URL + "?op=GetDetails", body, config).then((response) => {
        var xmlData = response.data; 
        var jsonData = new X2JS().xml_str2json(xmlData); 
        var data = jsonData.Envelope.Body.GetDetailsResponse.GetDetailsResult; 
    var game = data;
    renderGameDetails(game); 
});
}

function search(keyword){
    var body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Search xmlns="http://duybua.org/">
          <keyword>${keyword}</keyword>
        </Search>
      </soap:Body>
    </soap:Envelope>`;
    axios.post (URL + "?op=Search", body, config).then((response) => {
        var xmlData = response.data; 
        var jsonData = new X2JS().xml_str2json(xmlData); 
        var data = jsonData.Envelope.Body.SearchResponse.SearchResult.Game;
        var games = []; 
        if (Array.isArray(data)) games = data; // JSON array 
        else if (typeof(data) == "object") games.push(data); // JSON object 
        renderGameList(games);
    });

}

function addNew(newGame){
    var body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <AddNew xmlns="http://duybua.org/">
          <newGame>
          <ID>${newGame.ID}</ID>
          <Name>${newGame.Name}</Name>
          <Genre>${newGame.Genre}</Genre>
          <Producer>${newGame.Producer}</Producer>
          <Price>${newGame.Price}</Price>
          </newGame>
        </AddNew>
      </soap:Body>
    </soap:Envelope>`;
    axios.post (URL + "?op=AddNew", body, config).then((response) => {
        var xmlData = response.data; 
        var jsonData = new X2JS().xml_str2json(xmlData); 
        var data = jsonData.Envelope.Body.AddNewResponse.AddNewResult;
        var result = JSON.parse(data); // string to boolen
        if (result)
        {
            getAll();
            clearTextboxes();
        } else {alert('Hong be oi');}
    });
}

function update(newGame){
    var body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Update xmlns="http://duybua.org/">
          <newGame>
            <ID>${newGame.ID}</ID>
            <Name>${newGame.Name}</Name>
            <Genre>${newGame.Genre}</Genre>
            <Producer>${newGame.Producer}</Producer>
            <Price>${newGame.Price}</Price>
          </newGame>
        </Update>
      </soap:Body>
    </soap:Envelope>`;
    axios.post (URL + "?op=Update", body, config).then((response) => {
        var xmlData = response.data; 
        var jsonData = new X2JS().xml_str2json(xmlData); 
        var data = jsonData.Envelope.Body.UpdateResponse.UpdateResult;
        var result = JSON.parse(data); // string to boolen
        if (result)
        {
            getAll();
            clearTextboxes();
        } else {alert('Hong be oi');}
    });
}

function deletee(ID){
    var body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Delete xmlns="http://duybua.org/">
          <ID>${ID}</ID>
        </Delete>
      </soap:Body>
    </soap:Envelope>`;
    axios.post (URL + "?op=Delete", body, config).then((response) => {
        var xmlData = response.data; 
        var jsonData = new X2JS().xml_str2json(xmlData); 
        var data = jsonData.Envelope.Body.DeleteResponse.DeleteResult;
        var result = JSON.parse(data); // string to boolen
        if (result)
        {
            getAll();
            clearTextboxes();
        } else {alert('Hong be oi');}
    });
}
//cac ham ho tro
function renderGameList(games) {
    var rows = ""; 
    for (var game of games) 
    { 
    rows += "<tr onclick='lnkID_Click(" + game.ID + ")' style='cursor:pointer'>"; 
    rows += "<td>" + game.ID + "</td>";
    rows += "<td>" + game.Name + "</td>"; 
    rows += "<td>" + game.Genre + "</td>";
    rows += "<td>" + game.Producer + "</td>";
    rows += "<td>" + game.Price + "</td>"; 
    rows += "</tr>";
    }
    var header = "<tr><th>ID</th><th>Name</th><th>Genre</th><th>Producer</th><th>Price</th></tr>";
    document.getElementById("lstGames").innerHTML = header + rows;
}

function renderGameDetails(game){
    document.getElementById("txtID").value = game.ID;
    document.getElementById("txtName").value = game.Name;
    document.getElementById("txtGenre").value = game.Genre;
    document.getElementById("txtProducer").value = game.Producer;
    document.getElementById("txtPrice").value = game.Price;
}
function clearTextboxes(){
    document.getElementById("txtID").value = '';
    document.getElementById("txtName").value = '';
    document.getElementById("txtGenre").value = '';
    document.getElementById("txtProducer").value = '';
    document.getElementById("txtPrice").value = '';
}