const jsigs = require("jsonld-signatures");

const {
  controllers,
  testLoader,
  btcIdentity
} = require("./__fixtures__");

const { EcdsaKoblitzSignature2016 } = jsigs.suites;
const { PublicKeyProofPurpose } = jsigs.purposes;

const version1Doc = {
  "@context": ["https://w3id.org/identity/v1", "https://w3id.org/security/v1"],
  givenName: "Alice",
  expires: "2019-01-05T02:41:07Z"
};

const version1_1Doc = {
  "@context": ["https://w3id.org/did/v0.11", "https://w3id.org/security/v2"],
  publicKey: []
};

describe("EcdsaKoblitzSignature2016", () => {
  const testSignAndVerify = async data => {
    const signed = await jsigs.sign(data, {
      documentLoader: testLoader,
      suite: new EcdsaKoblitzSignature2016({
        privateKeyWif: btcIdentity.privateKeyWif,
        creator: `ecdsa-koblitz-pubkey:${btcIdentity.publicKey}`
      }),
      purpose: new PublicKeyProofPurpose()
    });
    const result = await jsigs.verify(signed, {
      documentLoader: testLoader,
      suite: new EcdsaKoblitzSignature2016({
        creator: `ecdsa-koblitz-pubkey:${btcIdentity.publicKey}`,
        date: "2017-03-25T22:01:04Z"
      }),
      purpose: new PublicKeyProofPurpose({
        controller: controllers.alice
      })
    });
    expect(result.verified).toBe(true);
  };
  it("can sign and verify verion 1.0", async () => {
    await testSignAndVerify(version1Doc);
  });

  it("can sign and verify verion 1.1", async () => {
    await testSignAndVerify(version1_1Doc);
  });
});
