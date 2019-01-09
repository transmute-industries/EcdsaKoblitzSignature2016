const { sign, verify } = require("../index");

const { linkedData, btcIdentity } = require("./__fixtures__");

// https://gist.github.com/Exulansis/903ab4a77b4173c2268f7a0ef90521ac
describe("EcdsaKoblitzSignature2016", () => {
  it("supports custom creator (reference to a did public key)", async () => {
    const signed = await sign({
      data: linkedData,
      creator: `did:example:123#main-key`,
      privateKey: btcIdentity.privateKeyHex
    });
    expect(signed.signature).toBeDefined();
    const verified = await verify({
      data: signed,
      publicKey: `ecdsa-koblitz-pubkey:${btcIdentity.publicKey}`
    });
    expect(verified).toBe(true);
  });
});
