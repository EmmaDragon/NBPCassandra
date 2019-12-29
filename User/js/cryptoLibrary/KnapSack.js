function encrypt(clearText, publicKey)
{
        var ciphered = [];

        for(var i = 0; i < clearText.length; i++) {
            var c = clearText.charCodeAt(i);
            var o = 0;

            for(var j = 7; j >= 0; j--) {
                o += ((c >> j) & 1) * publicKey.w[7 - j];
            }

            ciphered.push(o);
        }

        return ciphered.join(",");
    
}
function modInverse(a,b)
{
        var b0 = b, t, q;
        var x0 = 0, x1 = 1;
        if (b == 1) return 1;
        while (a > 1) {
            q = Math.floor(a / b);
            t = b;
            b = a % b;
            a = t;
            t = x0;
            x0 = x1 - q * x0;
            x1 = t;
        }
        if (x1 < 0) x1 += b0;
        return x1;
 
}
function knapMax(val, arr)
{
        for(var i = 1; i <= arr.length; i++) {
            if(arr[arr.length - i] <= val) {
                return arr.length - i;
            }
        }

        return null;
}
    
 function decrypt(cipherText, privateKey)
 {
        var cipherArr = cipherText.split(",");
        var deciphered = [];

        var x = modInverse(privateKey.r, privateKey.q);
        for(var i = 0; i < cipherArr.length; i++) {
            var c = cipherArr[i];
            var composed = ((c * x) % privateKey.q);

            var decipheredCharacter = 0;
            while(composed > 0) {
                var index = knapMax(composed, privateKey.w);
                composed -= privateKey.w[index];
                decipheredCharacter |= (1 << (7 - index));
            }

            deciphered.push(decipheredCharacter);
        }
        console.log(deciphered);
        return deciphered.map(function(elem){
            return String.fromCharCode(elem);
        }).join("");
     
 }
 function generateKeyPair(privateKey)
 {
        /*var privateKey = {
            w: [Math.round((Math.random() + 1) * 100)],
            wSum: 0,
            q: 0,
            r: 0
        };*/

        var publicKey = {
        
            w: []
        };

       /* privateKey.wSum = privateKey.w[0];

        for(var i = 1; i < 8; i++) {
            //privateKey.w[i] = privateKey.wSum + Math.round((Math.random() + 1) * 100);
            privateKey.wSum += privateKey.w[i];
        }

        privateKey.q = privateKey.wSum + Math.round((Math.random() + 1) * 100);
        privateKey.r = findCoprime(privateKey.q);
        */
        for(var i = 0; i < privateKey.w.length; i++) {
            publicKey.w[i] = (privateKey.w[i] * privateKey.r) % privateKey.q;
        }

        return [privateKey, publicKey];

     
 }

function gcd(a, b) {
        var t;
        while(b != 0){
            t = a;
            a = b;
            b = t % b;
        }
        return a;
}

function findCoprime(n) {
        var r = 2;
        while(gcd(r, n) != 1) 
            r++;
        return r;
    

}
