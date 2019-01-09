const { sign, verify } = require("../index");

const { linkedData, btcIdentity } = require("./__fixtures__");

// https://json-ld.org/playground/
describe("EcdsaKoblitzSignature2016", () => {
  it("supports ecdsa-koblitz-pubkey (with a real public key in hex)", async () => {
    const signed = await sign({
      data: linkedData,
      creator: `ecdsa-koblitz-pubkey:${btcIdentity.publicKey}`,
      privateKeyWIF: btcIdentity.privateKeyWif
    });

    expect(signed.signature).toBeDefined();
    const verified = await verify({
      data: signed,
      publicKey: `ecdsa-koblitz-pubkey:${btcIdentity.publicKey}`
    });
    expect(verified).toBe(true);
  });

  it("supports hex encoded private key", async () => {
    const signed = await sign({
      data: linkedData,
      creator: `ecdsa-koblitz-pubkey:${btcIdentity.publicKey}`,
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
