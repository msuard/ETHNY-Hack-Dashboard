import * as JSBN from 'jsbn'
import * as Utils from '../utils/utils'
import * as Sha3 from '../utils/sha3'

const BigInt = JSBN.BigInteger;

export async function generatePOKOfEphemeralKey(kBigInt, gBigInt, c1BigInt, pBigInt) {
    return new Promise(async (resolve, reject) => {
      try {

        const rBigInt = await Utils.getRandomNbitBigIntAsync(2048);

        const aBigInt = gBigInt.modPow(rBigInt, pBigInt); // COMMITMENT a

        const stringToHash = aBigInt.toString(16) + c1BigInt.toString(16);

        const eBigInt = new BigInt(this.Sha3.sha3(stringToHash), 16).remainder(pBigInt); // CHALLENGE e // USE e mod p TO ALLOW FOR FASTER COMPUTATION ?

        const zBigInt = rBigInt.add(eBigInt.multiply(kBigInt)); // RESPONSE z

        // console.log("POK of k =", { aBigInt: aBigInt.toString(10), eBigInt: eBigInt.toString(10), zBigInt: zBigInt.toString(10) }, "\n");

        resolve({aBigInt, eBigInt, zBigInt})

      } catch (e) {
        reject(e)
      }
    })
  }

export async function  generateDisjunctiveZKProofOfPlaintext(k, m, choicesList, g, A, c2, p) {
    return new Promise(async (resolve, reject) => {
      try {

        console.log(k)
        console.log(m)
        console.log(choicesList)
        console.log(g)
        console.log(A)
        console.log(c2)
        console.log(p)

        const kBigInt = new BigInt(k, 10);
        const ABigInt = new BigInt(A, 10);
        const c2BigInt = new BigInt(c2, 10);
        const gBigInt = new BigInt(g, 10);
        const pBigInt = new BigInt(p, 10);

        const mBigInt = new BigInt(m, 10);

        let validPlainTextsBigInt = [];
        choicesList.forEach((choice) => {
          let choiceString = choice.toString();
          validPlainTextsBigInt.push(new BigInt(choiceString, 10))
        });


        let voteIndex;
        let i = 0;
        validPlainTextsBigInt.forEach((plainTextBigInt) => {
          if (plainTextBigInt.equals(mBigInt)) {
            voteIndex = i;
          }
          i += 1;
        });

        console.log("GENERATING RANDOM CHALLENGES AND RESPONSES")
        // let randomChallenges = await Utils.generateRandomNbitBigIntListWithRandomTailLengthAsync(32, 10, validPlainTextsBigInt.length, 0, []);
        let randomChallenges = await Utils.generateRandomNbitBigIntListAsync(32, validPlainTextsBigInt.length, 0, []);
        // let randomResponses = await Utils.generateRandomNbitBigIntListWithRandomTailLengthAsync(32, 20, validPlainTextsBigInt.length, 0, []); // RANDOM RESPONSES NEED TO BE UNDISTINGUISHABLE FROM REAL RESPONSE
        let randomResponses = await Utils.generateRandomNbitBigIntListAsync(32, validPlainTextsBigInt.length, 0, []);

        let rBigInt = await Utils.getRandomNbitBigIntAsync(32);

        let commitments = [];
        let challenges = [];
        let responses = [];

        let simulatedProofsIndex = 0;

        console.log("SIMULATING PROOFS");

        for (i = 0; i < validPlainTextsBigInt.length; i++) {

          let commitment;
          let challenge;
          let response;

          if (i !== voteIndex) {

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

        console.log("GENERATING REAL PROOF")


        /*** GENERATE PROOF CHALLENGE FOR mi = mv ***/

        let stringToHash = "";
        commitments.forEach((commitment) => {
          stringToHash += commitment.toString(10);
        });

        let eDBigInt = new BigInt(Sha3.sha3(stringToHash), 16);//.remainder(pBigInt); // CHALLENGE e // USE e mod p TO ALLOW FOR FASTER COMPUTATION ?

        let eBigInt = eDBigInt;
        for (i = 0; i < challenges.length; i++) {
          if (i !== voteIndex) {
            eBigInt = eBigInt.subtract(challenges[i]);
          }
        }

        challenges[voteIndex] = eBigInt; //////

        /*** GENERATE PROOF RESPONSE FOR mi = mv ***/

        const zBigInt = rBigInt.add(eBigInt.multiply(kBigInt));

        responses[voteIndex] = zBigInt;

        let commitmentsString = [];
        let challengesString = [];
        let responsesString = [];

        for (i = 0; i < commitments.length; i++) {
          commitmentsString.push(commitments[i].toString(10));
          challengesString.push(challenges[i].toString(10));
          responsesString.push(responses[i].toString(10));
        }

        console.log("DISJUNCTIVE ZKP OF PLAINTEXT:\n", "\nCOMMITMENTS:\n", commitmentsString, "\nCHALLENGES:\n", challengesString, "\nRESPONSES:\n", responsesString, "\n");

        resolve({commitmentsString, challengesString, responsesString})

      } catch (e) {
        reject(e)
      }
    })
  }


export function verifyNonInteractiveDisjunctiveZKProofOfEncryptionOfPlaintextElGamal (p, A, validPlainTexts, c2, commitments, challenges, responses){

  console.log(p);
  console.log(A);
  console.log(validPlainTexts);
  console.log(c2);
  console.log(commitments);
  console.log(challenges);
  console.log(responses);


  const pBigInt = new BigInt(p, 10);
  const ABigInt = new BigInt(A, 10);
  const c2BigInt = new BigInt(c2, 10);

  let validPlainTextsBigInt = [];
  validPlainTexts.forEach((plaintext) => {
    validPlainTextsBigInt.push(new BigInt(plaintext.toString(), 10))
  });

  console.log(validPlainTextsBigInt);

  let commitmentsBigInt = [];
  let challengesBigInt = [];
  let responsesBigInt = [];
  for(let i = 0; i < commitments.length; i++){
    commitmentsBigInt.push(new BigInt(commitments[i], 10));
    challengesBigInt.push(new BigInt(challenges[i], 10));
    responsesBigInt.push(new BigInt(responses[i], 10));
  }


  /*** VERIFY INDIVIDUAL PROOFS ***/

  let result1 = true;
  for(let i =0; i < validPlainTextsBigInt.length; i++){

    let leftBigInt = ABigInt.modPow(responsesBigInt[i], pBigInt).remainder(pBigInt);

    let rightBigInt = commitmentsBigInt[i].multiply(c2BigInt.multiply(validPlainTextsBigInt[i].modInverse(pBigInt)).modPow(challengesBigInt[i], pBigInt)).remainder(pBigInt);

    let result = leftBigInt.equals(rightBigInt);

    console.log(leftBigInt.toString())
    console.log(rightBigInt.toString())

    if(!result){
      result1 = false;
    }

  }

  /*** COMPUTE EXPECTED CHALLENGE ***/

  let stringToHash = "";
  commitmentsBigInt.forEach((commitmentBigInt) => {
    stringToHash += commitmentBigInt.toString(10);
  });

  const eEBigInt = new BigInt(Sha3.sha3(stringToHash), 16); //.remainder(pBigInt);
  //const eEBigInt = new BigInt(SHA3.sha3(stringToHash), 16).modPow(new BigInt(SHA3.sha3(stringToHash), 16), pBigInt);//.remainder(pBigInt); // CHALLENGE e

  let sumChallenges = challengesBigInt[0];
  for(let i = 1; i < challengesBigInt.length; i++){
    sumChallenges = sumChallenges.add(challengesBigInt[i]);
  }

  /*** VERIFY CHALLENGES ***/

  let result2 = eEBigInt.equals(sumChallenges); //.remainder(pBigInt));

  if(result1 && result2){
    console.log("SUCCESSFULLY VERIFIED NON INTERACTIVE DISJUNCTIVE ZKP OF ENCRYPTION OF PLAINTEXT\n");
  } else {
    console.log("NON INTERACTIVE DISJUNCTIVE ZKP OF ENCRYPTION OF PLAINTEXT VERIFICATION FAILED !!!");
    console.log(result1, result2);
  }

  return(result1 && result2)
};

  