const identityv1 = require("../contexts/identity-v1.json");
const didv1 = require("../contexts/did-v1.json");
const didv1_1 = require("../contexts/did-v1_1.json");
const securityv1 = require("../contexts/security-v1.json");
const securityv2 = require("../contexts/security-v2.json");

const publicKeys = require("./publicKeys");

const getDoc = url => {
  switch (url) {
    case "did:example:123#kid=1b96181835f46197512e826e1e5c06d2ce45a3518ee9d975938aab899de4c933":
      return {
        "@context": "https://w3id.org/security/v2",
        id:
          "did:example:123#kid=1b96181835f46197512e826e1e5c06d2ce45a3518ee9d975938aab899de4c933",
        type: "CryptographicKey",
        owner: "https://example.com/i/alice",
        publicKeyWif: "16agVsYKpbHL4H4e6NSm4yDkpRN4w84E2Q"
      };
    case "ecdsa-koblitz-pubkey:02234be9bcdf041f7530979b8b88b7dc62dd505a75883c8211f3a8250534f96dc0":
      return {
        "@context": "https://w3id.org/security/v2",
        id:
          "ecdsa-koblitz-pubkey:02234be9bcdf041f7530979b8b88b7dc62dd505a75883c8211f3a8250534f96dc0",
        type: "CryptographicKey",
        owner: "https://example.com/i/alice",
        publicKeyWif: "16agVsYKpbHL4H4e6NSm4yDkpRN4w84E2Q"
      };
    case "ecdsa-koblitz-pubkey:16agVsYKpbHL4H4e6NSm4yDkpRN4w84E2Q":
      return {
        "@context": "https://w3id.org/security/v2",
        id: "ecdsa-koblitz-pubkey:16agVsYKpbHL4H4e6NSm4yDkpRN4w84E2Q",
        type: "CryptographicKey",
        owner: "https://example.com/i/alice",
        publicKeyWif: "16agVsYKpbHL4H4e6NSm4yDkpRN4w84E2Q"
      };
    case "ecdsa-koblitz-pubkey:1LGpGhGK8whX23ZNdxrgtjKrek9rP4xWER":
      return publicKeys.aliceBtc;
    case "https://example.com/i/alice":
      return publicKeys.alice;
    case "https://w3id.org/identity/v1":
      return identityv1;
    case "https://w3id.org/did/v1":
      return didv1;
    case "https://w3id.org/did/v0.11":
      return didv1_1;
    case "https://w3id.org/security/v1":
      return securityv1;
    case "https://w3id.org/security/v2":
      return securityv2;
    default:
      throw new Error("no document for url: " + url);
  }
};

module.exports = url => {
  return {
    contextUrl: null,
    document: getDoc(url),
    documentUrl: url
  };
};
