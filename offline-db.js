const DB = {

save(table,data){

let rows =
JSON.parse(
localStorage.getItem(table)
) || [];

rows.push(data);

localStorage.setItem(
table,
JSON.stringify(rows)
);

},

get(table){

return JSON.parse(
localStorage.getItem(table)
) || [];

},

clear(table){

localStorage.removeItem(table);

}

};
