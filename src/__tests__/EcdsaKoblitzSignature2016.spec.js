const { linkedData, bitcoinKeypair } = require("./__fixtures__");

const { sign, verify } = require("../index");

describe("EcdsaKoblitzSignature2016", () => {
  it("can sign and verify", async () => {
    let result = await sign({
      data: { ...linkedData },
      creator: `ecdsa-koblitz-pubkey:${bitcoinKeypair.address}`,
      privateKeyWIF: bitcoinKeypair.privateKey
    });
    expect(result.signature).toBeDefined();
    result = await verify({ data: result });
    expect(result.verified).toBe(true);
  });
});
