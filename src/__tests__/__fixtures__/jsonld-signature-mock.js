const jsigs = require("jsonld-signatures");
const identityv1 = require("./identity-v1.json");

const publicKeys = {};

publicKeys.alice = {
  "@context": jsigs.SECURITY_CONTEXT_URL,
  id: "https://example.com/i/alice/keys/1",
  type: ["RsaVerificationKey2018"],
  owner: "https://example.com/i/alice",
  publicKeyPem:
    "-----BEGIN PUBLIC KEY-----\n" +
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4R1AmYYyE47FMZgo708NhFU+t\n" +
    "+VWn133PYGt/WYmD5BnKj679YiUmyrC3hX6oZfo4eVpOkycxZvGgXCLQGuDp45Xf\n" +
    "Zkdsjqs3o62En4YjlHWxgeGmkiRqGfZ3sJ3u5WZ2xwapdZY3/2T/oOV5ri8SktTv\n" +
    "mVGCyhwFuJC/NbJMEwIDAQAB\n" +
    "-----END PUBLIC KEY-----"
};

publicKeys.aliceBtc = {
  "@context": jsigs.SECURITY_CONTEXT_URL,
  id: "ecdsa-koblitz-pubkey:1LGpGhGK8whX23ZNdxrgtjKrek9rP4xWER",
  type: "CryptographicKey",
  owner: "https://example.com/i/alice",
  publicKeyWif: "1LGpGhGK8whX23ZNdxrgtjKrek9rP4xWER"
};

// specify the public key controller object
const controller = {
  "@context": jsigs.SECURITY_CONTEXT_URL,
  id: "https://example.com/i/alice",
  publicKey: [publicKeys.aliceBtc],
  // this authorizes this key to be used for making assertions
  assertionMethod: [publicKeys.aliceBtc.id]
};

const privateKeys = {};

privateKeys.aliceBtc = {
  privateKeyWif: "L4mEi7eEdTNNFQEWaa7JhUKAbtHdVvByGAqvpJKC53mfiqunjBjw"
};



const testLoader = url => {
  if (url === "ecdsa-koblitz-pubkey:1LGpGhGK8whX23ZNdxrgtjKrek9rP4xWER") {
    return {
      contextUrl: null,
      document: publicKeys.aliceBtc,
      documentUrl: url
    };
  }
  if (url === "https://example.com/i/alice") {
    return {
      contextUrl: null,
      document: publicKeys.alice,
      documentUrl: url
    };
  }
  if (url === "https://w3id.org/identity/v1") {
    return {
      contextUrl: null,
      document: identityv1,
      documentUrl: url
    };
  }
};

module.exports = {
  testLoader,
  publicKeys,
  controller
};
