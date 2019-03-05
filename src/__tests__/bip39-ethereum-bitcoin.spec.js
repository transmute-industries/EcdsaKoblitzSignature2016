const bip39 = require("bip39");
const hdkey = require("hdkey");
const ethUtil = require("ethereumjs-util");
const bitcore = require("bitcore-lib");
const bitcoreMessage = require("bitcore-message");

const { sign, verify } = require("../index");

const { ethereumKeypair, linkedData } = require("./__fixtures__");

describe("EcdsaKoblitzSignature2016", () => {
  it("supports native ethereum keys", async () => {
    const { publicKey, privateKey } = ethereumKeypair;

    const signed = await sign({
      data: linkedData,
      creator: `ecdsa-koblitz-pubkey:${publicKey}`,
      privateKey,
    });
    expect(signed.signature).toBeDefined();
    const verified = await verify({ data: signed });
    expect(verified).toBe(true);
  });

  it("supports converting Ethereum keys into Bitcoin keys", async () => {
    const { publicKey, privateKey } = ethereumKeypair;
    // Both a Bitcoin and an Ethereum public key are a point of the SECP256K1 curve
    // However the format this point will be represented in is a bit different:
    // Let P(x, y) be a point on the curve, and x, y 32 bytes hex encoded strings
    // The corresponding Ethereum public key is the concatenation of x and y (64 bytes)
    // The corresponding Bitcoin public key is the concatenation of a 1 byte prefix and x (35 bytes)
    // where the prefix is 0x02 if y is even, or 0x03 is y is odd (we need this information
    // because there will always be 2 points on the curve with the same x coordinate)
    // Therefore we can convert an Ethereum public key to a Bitcoin private key the following way:
    const bufferPublicKey = Buffer.from(publicKey, 'hex');
    const x = bufferPublicKey.slice(0, 32);
    const y = bufferPublicKey.slice(32, 64);
    const isYEven = y[31] % 2 === 0;
    const prefix = isYEven ? '02' : '03';
    const btcPublicKey = `${prefix}${x.toString('hex')}`;
    // Make sure that the btcPublicKey we computed is the same one returned by the bitcore-lib:
    const btcPrivateKey = new bitcore.PrivateKey(privateKey);
    expect(btcPublicKey).toBe(btcPrivateKey.toPublicKey().toString());

    const signed = await sign({
      data: linkedData,
      creator: `ecdsa-koblitz-pubkey:${btcPublicKey}`,
      privateKey,
    });
    expect(signed.signature).toBeDefined();
    const verified = await verify({ data: signed });
    expect(verified).toBe(true);
  })

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

    const verifiedBitcoin = bitcoreMessage(
      ethUtil.sha256(message).toString("hex")
    ).verify(btcIdentity.btcAddress, signedBitcoin);

    expect(verifiedBitcoin).toBe(true);

    const signed = await sign({
      data: linkedData,
      creator: `ecdsa-koblitz-pubkey:${btcIdentity.btcAddress}`,
      privateKeyWIF: btcIdentity.btcPrivateKey
    });
    expect(signed.signature).toBeDefined();
    const verified = await verify({ data: signed });
    expect(verified).toBe(true);
  });
});
