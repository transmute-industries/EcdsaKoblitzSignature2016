const jsonld = require("jsonld");
const bitcoreMessage = require("bitcore-message");
const bitcore = require("bitcore-lib");
const forge = require("node-forge");

const canonize = async data => {
  return jsonld.canonize(data, {
    algorithm: "URDNA2015",
    format: "application/n-quads"
  });
};

// See https://github.com/digitalbazaar/jsonld-signatures/blob/master/lib/suites/LinkedDataSignature2015.js#L90
const createVerifyData = async ({ document, proof }) => {
  const c14n = await canonize(document);

  let verifyData = "";
  const headers = {
    "http://purl.org/dc/elements/1.1/created": proof.created,
    "https://w3id.org/security#domain": proof.domain,
    "https://w3id.org/security#nonce": proof.nonce
  };
  // add headers in lexicographical order
  const keys = Object.keys(headers).sort();
  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];
    const value = headers[key];
    if (!(value === null || value === undefined)) {
      verifyData += key + ": " + value + "\n";
    }
  }
  verifyData += c14n;
  const buffer = new forge.util.ByteBuffer(verifyData, "utf8");
  return forge.util.binary.raw.decode(buffer.getBytes());
};

const verify = async ({ data, publicKey }) => {
  let publicKeyWif;

  // support publicKey validation as used with jsig
  // https://github.com/json-ld/json-ld.org/pull/524/files#diff-6818b28212f86523d616ee70a27c0b44R868
  if (publicKey) {
    if (publicKey.indexOf("ecdsa-koblitz-pubkey:") == -1) {
      publicKeyWif = new bitcore.PublicKey(publicKey).toAddress(
        bitcore.Networks.livenet
      );
    } else {
      publicKeyWif = new bitcore.PublicKey(
        publicKey.split("ecdsa-koblitz-pubkey:")[1]
      ).toAddress(bitcore.Networks.livenet);
    }
  } else {
    publicKeyWif = data.signature.creator.split("ecdsa-koblitz-pubkey:")[1];
  }

  const signaturePayload = Object.assign({}, data);
  delete signaturePayload["signature"];
  const verifyData = await createVerifyData({
    document: signaturePayload,
    proof: data.signature
  });
  const message = bitcoreMessage(
    forge.util.binary.raw.encode(Buffer.from(verifyData))
  );
  const verified = message.verify(publicKeyWif, data.signature.signatureValue);
  return verified;
};

const sign = async ({
  data,
  privateKeyWIF,
  privateKey,
  creator,
  nonce,
  domain,
  created
}) => {
  const proof = {
    "@context": "https://w3id.org/security/v2",
    type: "EcdsaKoblitzSignature2016",
    created: created || new Date().toISOString(),
    creator,
    nonce,
    domain
  };

  if (proof.nonce === undefined) {
    delete proof["nonce"];
  }
  if (proof.domain === undefined) {
    delete proof["domain"];
  }

  const verifyData = await createVerifyData({
    document: { ...data },
    proof
  });

  if (privateKey) {
    bitcorePrivateKey = new bitcore.PrivateKey(privateKey);
  } else {
    bitcorePrivateKey = bitcore.PrivateKey.fromWIF(privateKeyWIF);
  }

  const message = bitcoreMessage(
    forge.util.binary.raw.encode(Buffer.from(verifyData))
  );
  proof.signatureValue = message.sign(bitcorePrivateKey);
  const signedData = { ...data };
  signedData.signature = proof;

  delete signedData.signature["@context"];
  return signedData;
};

module.exports = {
  verify,
  sign
};
