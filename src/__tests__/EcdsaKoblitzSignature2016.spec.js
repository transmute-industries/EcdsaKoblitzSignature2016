const { linkedData, bitcoinKeypair } = require("./__fixtures__");

const { sign, verify } = require("../index");

describe("EcdsaKoblitzSignature2016", () => {
  it("can sign and verify", async () => {
    const signed = await sign({
      data: linkedData,
      creator: `ecdsa-koblitz-pubkey:${bitcoinKeypair.address}`,
      privateKeyWIF: bitcoinKeypair.privateKey
    });
    expect(signed.signature).toBeDefined();
    const verified = await verify({ data: signed });
    expect(verified).toBe(true);
  });
});
