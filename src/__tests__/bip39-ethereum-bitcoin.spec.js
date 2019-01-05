const bip39 = require("bip39");
const hdkey = require("hdkey");
const bitcore = require("bitcore-lib");
const bitcoreMessage = require("bitcore-message");
const ethUtil = require("ethereumjs-util");

const { sign, verify } = require("../index");

const { linkedData } = require("./__fixtures__");

describe("EcdsaKoblitzSignature2016", () => {
  it("supports bip39 / bitcoin / ethereum", async () => {
    // const  mnemonic = bip39.generateMnemonic();
    const mnemonic =
      "start fuel hybrid exit sell now gas salmon defense chest attend cycle";
    //   m / purpose' / coin_type' / account' / change / address_index
    const hdPath = "m/44'/60'/0'/0";
    const seed = bip39.mnemonicToSeed(mnemonic);
    const root = hdkey.fromMasterSeed(seed);
    const addrNode = root.derive(hdPath);

    const privateKey = addrNode._privateKey.toString("hex");

    const btcPrivateKey = new bitcore.PrivateKey(privateKey);
    const btcPublicKey = btcPrivateKey.toPublicKey();
    const btcAddress = btcPublicKey.toAddress(bitcore.Networks.livenet);

    const btcIdentity = {
      btcAddress: btcAddress.toString(),
      btcPublicKey: btcPublicKey.toString(),
      btcPrivateKey: btcPrivateKey.toWIF()
    };

    const ethPublicKey = ethUtil.privateToPublic(
      Buffer.from(privateKey, "hex")
    );
    const ethAddress = ethUtil.toChecksumAddress(
      ethUtil.pubToAddress(ethPublicKey).toString("hex")
    );

    const ethIdentity = {
      ethAddress,
      ethPublicKey: ethPublicKey.toString("hex"),
      ethPrivateKey: privateKey
    };

    const message = "hello world";

    const signedEthereum = await ethUtil.ecsign(
      ethUtil.sha256(message),
      Buffer.from(ethIdentity.ethPrivateKey, "hex")
    );

    const recoveredEthereum = await ethUtil.ecrecover(
      ethUtil.sha256(message),
      signedEthereum.v,
      signedEthereum.r,
      signedEthereum.s
    );

    expect(
      ethUtil.toChecksumAddress(
        ethUtil.pubToAddress(recoveredEthereum).toString("hex")
      )
    ).toBe(ethIdentity.ethAddress);

    const signedBitcoin = bitcoreMessage(
      ethUtil.sha256(message).toString("hex")
    ).sign(bitcore.PrivateKey.fromWIF(btcIdentity.btcPrivateKey));

    const verified = bitcoreMessage(
      ethUtil.sha256(message).toString("hex")
    ).verify(btcIdentity.btcAddress, signedBitcoin);

    expect(verified).toBe(true);

    let result = await sign({
      data: { ...linkedData },
      creator: `ecdsa-koblitz-pubkey:${btcIdentity.btcAddress}`,
      privateKeyWIF: btcIdentity.btcPrivateKey
    });
    expect(result.signature).toBeDefined();
    result = await verify({ data: result });
    expect(result.verified).toBe(true);
  });
});
