const bip39 = require("bip39");
const hdkey = require("hdkey");
const secp256k1 = require("secp256k1");
const jsigs = require("jsonld-signatures");

const { sign, verify } = require("../index");

const identityContext = require("./__fixtures__/contexts/identity-v1.json");

const testDoc = {
  "@context": ["https://w3id.org/identity/v1"],
  givenName: "Alice",
  expires: "2019-01-05T02:41:07Z"
};

const testLoader = url => {
  // console.log(url);
  let doc;
  if (url === "https://w3id.org/identity/v1") {
    doc = identityContext;
  }

  if (
    url ===
    "ecdsa-koblitz-pubkey:02234be9bcdf041f7530979b8b88b7dc62dd505a75883c8211f3a8250534f96dc0"
  ) {
    doc = {
      "@context": "https://w3id.org/security/v2",
      id:
        "ecdsa-koblitz-pubkey:02234be9bcdf041f7530979b8b88b7dc62dd505a75883c8211f3a8250534f96dc0",
      type: "CryptographicKey",
      owner: "https://example.com/i/alice",
      publicKeyWif: "16agVsYKpbHL4H4e6NSm4yDkpRN4w84E2Q"
    };
  }
  return {
    contextUrl: null,
    document: doc,
    documentUrl: url
  };
};

describe("compressed", () => {
  const testDBLib = async ({ privateKey, publicKey }) => {
    const signed = await jsigs.sign(
      { ...testDoc },
      {
        documentLoader: testLoader,
        suite: new jsigs.suites.EcdsaKoblitzSignature2016({
          privateKeyWif: privateKey,
          creator: `ecdsa-koblitz-pubkey:${publicKey}`
        }),
        purpose: new jsigs.purposes.PublicKeyProofPurpose()
      }
    );
    const result = await jsigs.verify(signed, {
      documentLoader: testLoader,
      suite: new jsigs.suites.EcdsaKoblitzSignature2016({
        creator: `ecdsa-koblitz-pubkey:${publicKey}`,
        date: "2017-03-25T22:01:04Z"
      }),
      purpose: new jsigs.purposes.PublicKeyProofPurpose({
        controller: {
          "@context": "https://w3id.org/security/v2",
          id: "https://example.com/i/alice",
          publicKey: [
            {
              "@context": "https://w3id.org/security/v2",
              id:
                "ecdsa-koblitz-pubkey:02234be9bcdf041f7530979b8b88b7dc62dd505a75883c8211f3a8250534f96dc0",
              type: "CryptographicKey",
              owner: "https://example.com/i/alice",
              publicKeyWif: "16agVsYKpbHL4H4e6NSm4yDkpRN4w84E2Q"
            }
          ],
          // this authorizes this key to be used for making assertions
          assertionMethod: [
            "ecdsa-koblitz-pubkey:02234be9bcdf041f7530979b8b88b7dc62dd505a75883c8211f3a8250534f96dc0"
          ]
        }
      })
    });
    expect(result.verified).toBe(true);
  };

  const testTransmuteLib = async ({ privateKey, publicKey }) => {
    let signed = await sign({
      data: testDoc,
      creator: `ecdsa-koblitz-pubkey:${publicKey}`,
      privateKey
    });

    expect(signed.signature).toBeDefined();
    let verified = await verify({
      data: signed,
      publicKey: publicKey
    });

    expect(verified).toBe(true);

    signed = await sign({
      data: testDoc,
      creator: `did:test:123#key-0`,
      privateKey
    });

    expect(signed.signature).toBeDefined();
    verified = await verify({
      data: signed,
      publicKey: publicKey
    });

    expect(verified).toBe(true);
  };

  it("show that bip39 compressed and uncompressed keys work", async () => {
    const mnemonic =
      "start fuel hybrid exit sell now gas salmon defense chest attend cycle";
    //   m / purpose' / coin_type' / account' / change / address_index
    const hdPath = "m/44'/60'/0'/0";
    const seed = bip39.mnemonicToSeed(mnemonic);
    const root = hdkey.fromMasterSeed(seed);
    const addrNode = root.derive(hdPath);

    const privateKey = addrNode._privateKey.toString("hex");
    const publicKey = secp256k1
      .publicKeyCreate(Buffer.from(privateKey, "hex"))
      .toString("hex");

    await testDBLib({
      privateKey,
      publicKey
    });

    await testTransmuteLib({
      privateKey: privateKey,
      publicKey: publicKey
    });
  });
});
