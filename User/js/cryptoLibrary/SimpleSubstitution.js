
String.prototype.replaceAt=function(index, character) {
	return this.substr(0, index) + character + this.substr(index+character.length);
}
//generate a random arrangement of the alphabet
//base code from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
//called in functions: @geneticSubstitutionCrack
//dodati i nasa slova
function shuffle() {
	var newArr= ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
		var currentIndex = newArr.length, temporaryValue, randomIndex;
		while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = newArr[currentIndex];
		newArr[currentIndex] = newArr[randomIndex];
		newArr[randomIndex] = temporaryValue;
  }
  console.log(newArr);
  return newArr;
}
var refArr= ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];


// ------------------------------------- CIPHER FUNCTIONS ------------------------------------- //

function enSubstitute(str,key){
	result=str.split('');
	for (var i = 0; i < result.length; i++) {
		if (result[i].match(/^[a-z]*$/g) !== null) {
			result[i]=key[refArr.indexOf(result[i])];
		}
		else if (result[i].match(/^[A-Z]*$/g) !== null) {
			result[i]=key[refArr.indexOf(result[i].toLowerCase())].toUpperCase();
		}
	};
	return result.join('');
}

function deSubstitute(str,key){
	result=str.split('');
	for (var i = 0; i < result.length; i++) {
		if (result[i].match(/^[a-z]*$/g) !== null) 
                {
			result[i]=refArr[key.indexOf(result[i])];
		}
		else if (result[i].match(/^[A-Z]*$/g) !== null)
                {
			result[i]=refArr[key.indexOf(result[i].toLowerCase())].toUpperCase();
		}
	};
	return result.join('');
}

