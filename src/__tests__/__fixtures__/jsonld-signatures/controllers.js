const publicKeys = require("./publicKeys");

module.exports = {
  alice: {
    "@context": "https://w3id.org/security/v2",
    id: "https://example.com/i/alice",
    publicKey: [
      publicKeys.aliceBtc,
      {
        "@context": "https://w3id.org/security/v2",
        id:
          "ecdsa-koblitz-pubkey:02234be9bcdf041f7530979b8b88b7dc62dd505a75883c8211f3a8250534f96dc0",
        type: "CryptographicKey",
        owner: "https://example.com/i/alice",
        publicKeyWif: "16agVsYKpbHL4H4e6NSm4yDkpRN4w84E2Q"
      },
      {
        "@context": "https://w3id.org/security/v2",
        id: "ecdsa-koblitz-pubkey:16agVsYKpbHL4H4e6NSm4yDkpRN4w84E2Q",
        type: "CryptographicKey",
        owner: "https://example.com/i/alice",
        publicKeyWif: "16agVsYKpbHL4H4e6NSm4yDkpRN4w84E2Q"
      },
      {
        "@context": "https://w3id.org/security/v2",
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
  }
};
