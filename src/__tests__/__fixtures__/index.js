const linkedData = require("./LinkedDataExample.json");
const signedLinkedData1 = require("./SignedLinkedDataExample1.json");
const didDocument = require("./didDocument.json");
const didDocumentWithSignature = require("./didDocumentWithSignature.json");
const didDocumentWithSignature2 = require("./didDocumentWithSignature2.json");
const didDocumentWithProof = require("./didDocumentWithProof.json");

const keypair = {
  publicKey:
    "045b767b4fcf8664e3e4c32dd41d5b4c3b88680c10946e063e4100d3c7484a563b99576ba1de98cb77366ecafd47730ed5830a6c3e7faed48010b49532d0b01585",
  privateKey: "43541f3508552e5b55e4cc259d571665925dd2a8525c4efe28190879e70dcf33"
};

const creator = "http://example.com:1337/user/did:example:123#main-key";

const bitcoinKeypair = {
  address: "1LGpGhGK8whX23ZNdxrgtjKrek9rP4xWER",
  privateKey: "L4mEi7eEdTNNFQEWaa7JhUKAbtHdVvByGAqvpJKC53mfiqunjBjw"
};

const btcIdentity = {
  address: "16agVsYKpbHL4H4e6NSm4yDkpRN4w84E2Q",
  publicKey:
    "02234be9bcdf041f7530979b8b88b7dc62dd505a75883c8211f3a8250534f96dc0",
  privateKeyWif: "KzVDttSotdDwhfBBiaU4vPKK3yeUmvfLcWbBPHdWy2k3wNYs2oPE",
  privateKeyHex:
    "617e062ea82d0cc631bc6b315b444f2efb55319ea8e0b64f6f8a807ef7588e41"
};

const jsonldSignaturesMocks = require("./jsonld-signatures");

module.exports = {
  bitcoinKeypair,
  linkedData,
  signedLinkedData1,
  keypair,
  creator,
  btcIdentity,
  didDocument,
  didDocumentWithSignature,
  didDocumentWithSignature2,
  didDocumentWithProof,
  ...jsonldSignaturesMocks
};
