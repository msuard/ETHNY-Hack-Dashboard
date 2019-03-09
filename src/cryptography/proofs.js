const JSBN =  require('jsbn');
const BigInt = JSBN.BigInteger;
const Utils = require('../utils/utils');
const SHA3 = require('../utils/sha3');

exports.generatePOKOfEphemeralKey = async function (kBigInt, gBigInt, c1BigInt, pBigInt){
  return new Promise(async (resolve, reject) => {
    try{

      const rBigInt = await Utils.getRandomNbitBigIntAsync(2048);

      const aBigInt = gBigInt.modPow(rBigInt, pBigInt); // COMMITMENT a

      const stringToHash = aBigInt.toString(16) + c1BigInt.toString(16);

      const eBigInt = new BigInt(SHA3.sha3(stringToHash), 16).remainder(pBigInt); // CHALLENGE e // USE e mod p TO ALLOW FOR FASTER COMPUTATION ?

      const zBigInt = rBigInt.add(eBigInt.multiply(kBigInt)); // RESPONSE z

      // console.log("POK of k =", { aBigInt: aBigInt.toString(10), eBigInt: eBigInt.toString(10), zBigInt: zBigInt.toString(10) }, "\n");

      resolve({ aBigInt, eBigInt, zBigInt })

    } catch(e) { reject(e) }
  })
};

exports.generateDisjunctiveZKProofOfPlaintext = async function (kBigInt, m, choicesList, gBigInt, ABigInt, c2BigInt, pBigInt){
  return new Promise(async (resolve, reject) => {
    try{

      const mBigInt  = new BigInt(m.toString(), 10);

      let validPlainTextsBigInt = [];
      choicesList.forEach((choice) => {
        validPlainTextsBigInt.push(new BigInt(choice.toString(), 10))
      });


      let voteIndex;
      let i = 0;
      validPlainTextsBigInt.forEach((plainTextBigInt) => {
        if(plainTextBigInt.equals(mBigInt)) {
          voteIndex = i;
        }
        i += 1;
      });

      let randomChallenges = await Utils.generateRandomNbitBigIntListWithRandomTailLengthAsync(2048, 10, validPlainTextsBigInt.length, 0, []);

      let randomResponses = await Utils.generateRandomNbitBigIntListWithRandomTailLengthAsync(4097, 20, validPlainTextsBigInt.length, 0, []); // RANDOM RESPONSES NEED TO BE UNDISTINGUISHABLE FROM REAL RESPONSE

      let rBigInt = await Utils.getRandomNbitBigIntAsync(2048);

      let commitments = [];
      let challenges = [];
      let responses = [];

      let simulatedProofsIndex = 0;

      for (i=0; i < validPlainTextsBigInt.length; i++ ){

        let commitment;
        let challenge;
        let response;

        if(i !== voteIndex){

          /*** SIMULATE PROOF FOR mi != mv ***/

          challenge = randomChallenges[simulatedProofsIndex].abs();
          response = randomResponses[simulatedProofsIndex].abs();
          simulatedProofsIndex += 1;

          commitment = c2BigInt.multiply(validPlainTextsBigInt[i].modInverse(pBigInt)).modPow(challenge, pBigInt).modInverse(pBigInt).multiply(ABigInt.modPow(response, pBigInt)).remainder(pBigInt);

          commitments.push(commitment);
          challenges.push(challenge);
          responses.push(response);

        } else {

          /*** GENERATE PROOF COMMITMENT FOR mi = mv ***/

          commitment = ABigInt.modPow(rBigInt, pBigInt);

          commitments.push(commitment);
          challenges.push(null);
          responses.push(null);

        }

      }

      /*** GENERATE PROOF CHALLENGE FOR mi = mv ***/

      let stringToHash = "";
      commitments.forEach((commitment) => {
        stringToHash += commitment.toString(10);
      });

      let eDBigInt = new BigInt(SHA3.sha3(stringToHash), 16).remainder(pBigInt); // CHALLENGE e // USE e mod p TO ALLOW FOR FASTER COMPUTATION ?

      let eBigInt = eDBigInt;
      for (i=0; i < challenges.length; i++ ){
        if(i !== voteIndex){
          eBigInt = eBigInt.subtract(challenges[i]);
        }
      }

      challenges[voteIndex] = eBigInt;

      /*** GENERATE PROOF RESPONSE FOR mi = mv ***/

      const zBigInt = rBigInt.add(eBigInt.abs().multiply(kBigInt));

      responses[voteIndex] = zBigInt;

      let commitmentsString = [];
      let challengesString = [];
      let responsesString = [];

      for(i=0; i < commitments.length; i++){
        commitmentsString.push(commitments[i].toString(10));
        challengesString.push(challenges[i].toString(10));
        responsesString.push(responses[i].toString(10));
      }

      // console.log("DISJUNCTIVE ZKP OF PLAINTEXT:\n", "\nCOMMITMENTS:\n", commitmentsString, "\nCHALLENGES:\n", challengesString, "\nRESPONSES:\n", responsesString, "\n");

      resolve({ commitments, challenges, responses })

    } catch(e) { reject(e) }
  })
};
