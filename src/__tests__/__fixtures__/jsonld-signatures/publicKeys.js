module.exports = {
  alice: {
    "@context": "https://w3id.org/security/v2",
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
  },
  aliceBtc: {
    "@context": "https://w3id.org/security/v2",
    id: "ecdsa-koblitz-pubkey:1LGpGhGK8whX23ZNdxrgtjKrek9rP4xWER",
    type: "CryptographicKey",
    owner: "https://example.com/i/alice",
    publicKeyWif: "1LGpGhGK8whX23ZNdxrgtjKrek9rP4xWER"
  }
};
