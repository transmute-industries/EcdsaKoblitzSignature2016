const jsigs = require("jsonld-signatures");
const identityv1 = require('./contexts/identity-v1.json');
const didv1 = require('./contexts/did-v1.json');

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
  publicKey: [
    publicKeys.aliceBtc,
    {
      "@context": jsigs.SECURITY_CONTEXT_URL,
      id:
        "ecdsa-koblitz-pubkey:02234be9bcdf041f7530979b8b88b7dc62dd505a75883c8211f3a8250534f96dc0",
      type: "CryptographicKey",
      owner: "https://example.com/i/alice",
      publicKeyWif: "16agVsYKpbHL4H4e6NSm4yDkpRN4w84E2Q"
    },
    {
      "@context": jsigs.SECURITY_CONTEXT_URL,
      id: "ecdsa-koblitz-pubkey:16agVsYKpbHL4H4e6NSm4yDkpRN4w84E2Q",
      type: "CryptographicKey",
      owner: "https://example.com/i/alice",
      publicKeyWif: "16agVsYKpbHL4H4e6NSm4yDkpRN4w84E2Q"
    },
    {
      "@context": jsigs.SECURITY_CONTEXT_URL,
      id:
        "did:example:123#kid=1b96181835f46197512e826e1e5c06d2ce45a3518ee9d975938aab899de4c933",
      type: "CryptographicKey",
      owner: "https://example.com/i/alice",
      publicKeyWif: "16agVsYKpbHL4H4e6NSm4yDkpRN4w84E2Q"
    }
  ],
  // this authorizes this key to be used for making assertions
  assertionMethod: [
    publicKeys.aliceBtc.id,
    "ecdsa-koblitz-pubkey:16agVsYKpbHL4H4e6NSm4yDkpRN4w84E2Q",
    "ecdsa-koblitz-pubkey:02234be9bcdf041f7530979b8b88b7dc62dd505a75883c8211f3a8250534f96dc0"
  ]
};

const privateKeys = {};

privateKeys.aliceBtc = {
  privateKeyWif: "L4mEi7eEdTNNFQEWaa7JhUKAbtHdVvByGAqvpJKC53mfiqunjBjw"
};

const testLoader = url => {
  // console.log(url);

  if (
    url ===
    "did:example:123#kid=1b96181835f46197512e826e1e5c06d2ce45a3518ee9d975938aab899de4c933"
  ) {
    return {
      contextUrl: null,
      document: {
        "@context": jsigs.SECURITY_CONTEXT_URL,
        id:
          "did:example:123#kid=1b96181835f46197512e826e1e5c06d2ce45a3518ee9d975938aab899de4c933",
        type: "CryptographicKey",
        owner: "https://example.com/i/alice",
        publicKeyWif: "16agVsYKpbHL4H4e6NSm4yDkpRN4w84E2Q"
      },
      documentUrl: url
    };
  }

  if (
    url ===
    "ecdsa-koblitz-pubkey:02234be9bcdf041f7530979b8b88b7dc62dd505a75883c8211f3a8250534f96dc0"
  ) {
    return {
      contextUrl: null,
      document: {
        "@context": jsigs.SECURITY_CONTEXT_URL,
        id:
          "ecdsa-koblitz-pubkey:02234be9bcdf041f7530979b8b88b7dc62dd505a75883c8211f3a8250534f96dc0",
        type: "CryptographicKey",
        owner: "https://example.com/i/alice",
        publicKeyWif: "16agVsYKpbHL4H4e6NSm4yDkpRN4w84E2Q"
      },
      documentUrl: url
    };
  }

  if (url === "ecdsa-koblitz-pubkey:16agVsYKpbHL4H4e6NSm4yDkpRN4w84E2Q") {
    return {
      contextUrl: null,
      document: {
        "@context": jsigs.SECURITY_CONTEXT_URL,
        id: "ecdsa-koblitz-pubkey:16agVsYKpbHL4H4e6NSm4yDkpRN4w84E2Q",
        type: "CryptographicKey",
        owner: "https://example.com/i/alice",
        publicKeyWif: "16agVsYKpbHL4H4e6NSm4yDkpRN4w84E2Q"
      },
      documentUrl: url
    };
  }

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

  if (url === "https://w3id.org/did/v1") {
    return {
      contextUrl: null,
      document: didv1,
      documentUrl: url
    };
  }

  
};

module.exports = {
  testLoader,
  publicKeys,
  controller
};
