const jsonld = require("jsonld");
const jsigs = require("jsonld-signatures");

const {
  linkedData,
  bitcoinKeypair,
  publicKeys,
  controller,
  testLoader
} = require("./__fixtures__");

const { EcdsaKoblitzSignature2016 } = jsigs.suites;
const { PublicKeyProofPurpose } = jsigs.purposes;

// https://github.com/digitalbazaar/jsonld-signatures/issues/46
describe("EcdsaKoblitzSignature2016", () => {
  it("can expand and compact contexts", async () => {
    const expanded = await jsonld.expand(linkedData);
    // console.log(expanded);
    const compacted = await jsonld.compact(
      expanded,
      "https://w3id.org/identity/v1"
    );
    // console.log(compacted);
    expect(compacted).toEqual(linkedData);
  });
  it("can sign and verify with jsonld-signatures", async () => {
    const signed = await jsigs.sign(linkedData, {
      documentLoader: testLoader,
      suite: new EcdsaKoblitzSignature2016({
        privateKeyWif: bitcoinKeypair.privateKey,
        creator: publicKeys.aliceBtc.id
      }),
      purpose: new PublicKeyProofPurpose()
    });
    // console.log(JSON.stringify(signed, null, 2));
    const result = await jsigs.verify(signed, {
      documentLoader: testLoader,
      suite: new EcdsaKoblitzSignature2016({
        creator: publicKeys.aliceBtc.id,
        date: "2017-03-25T22:01:04Z"
      }),
      purpose: new PublicKeyProofPurpose({
        controller
      })
    });
    expect(result.verified).toBe(true);
  });
});
