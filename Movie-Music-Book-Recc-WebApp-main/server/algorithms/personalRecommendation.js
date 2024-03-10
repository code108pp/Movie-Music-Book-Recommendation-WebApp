
function compare(a, b) {
    if( a.count > b.count ) return 1;
    if( a.count < b.count ) return -1;
    return 0;    
}

module.exports = function personalReccomendation (countArr) {
    
    const countList = countArr.slice(0).sort( compare ).reverse();

    const topThreeGenre = [];
    
    for (let i = 0; i < 3; i++) {
        topThreeGenre[i] = countList[i].genreId;
    }
    
    return topThreeGenre;
}

// module.exports = personalReccomendation;