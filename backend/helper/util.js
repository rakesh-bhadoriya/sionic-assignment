module.exports = {
    sort: sortByUsername
}

function sortByUsername(data){

    if(!Array.isArray(data)){
        return data;
    }

    return data.sort(function(a, b){
        if(a.username > b.username) return 1;
        else if(a.username < b.username) return -1;
        else return 0;
    });

}