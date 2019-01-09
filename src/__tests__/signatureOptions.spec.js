const { linkedData, bitcoinKeypair } = require("./__fixtures__");

const { sign, verify } = require("../index");

describe("EcdsaKoblitzSignature2016", () => {
  describe("nonce", () => {
    it("can sign and verify with nonce", async () => {
      const nonce = "235187631";
      const signed = await sign({
        data: { ...linkedData },
        nonce,
        privateKeyWIF: bitcoinKeypair.privateKey,
        creator: `ecdsa-koblitz-pubkey:${bitcoinKeypair.address}`
      });
      const verified = await verify({
        data: signed
      });
      expect(verified).toBe(true);
      expect(signed.signature.nonce).toBe(nonce);
    });
  });

  describe("domain", () => {
    it("can sign and verify with domain", async () => {
      const domain = "example.com";
      const signed = await sign({
        data: { ...linkedData },
        domain,
        privateKeyWIF: bitcoinKeypair.privateKey,
        creator: `ecdsa-koblitz-pubkey:${bitcoinKeypair.address}`
      });
      const verified = await verify({
        data: signed
      });
      expect(verified).toBe(true);
      expect(signed.signature.domain).toBe(domain);
    });
  });

  describe("created", () => {
    it("can sign and verify with created", async () => {
      const created = new Date().toISOString();
      const signed = await sign({
        data: { ...linkedData },
        created,
        privateKeyWIF: bitcoinKeypair.privateKey,
        creator: `ecdsa-koblitz-pubkey:${bitcoinKeypair.address}`
      });
      const verified = await verify({
        data: signed
      });
      expect(verified).toBe(true);
      expect(signed.signature.created).toBe(created);
    });
  });
});
