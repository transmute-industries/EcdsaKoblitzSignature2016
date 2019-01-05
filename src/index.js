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

const createVerifyData = async ({
  document,
  proof
  // documentLoader,
  // expansionMap
}) => {
  // console.log("my createVerifyData proof", proof)
  const c14n = await canonize(document, {
    // documentLoader,
    // expansionMap
  });

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

const verify = async ({ data }) => {
  const publicKeyWif = data.signature.creator.split("ecdsa-koblitz-pubkey:")[1];
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
  return {
    verified
  };
};

const sign = async ({ data, privateKeyWIF, creator }) => {
  const proof = {
    "@context": "https://w3id.org/security/v2",
    type: "EcdsaKoblitzSignature2016",
    created: '2019-01-05T18:39:39Z',
    creator
  };

  const verifyData = await createVerifyData({
    document: data,
    proof
  });

  const privateKey = bitcore.PrivateKey.fromWIF(privateKeyWIF);
  const message = bitcoreMessage(
    forge.util.binary.raw.encode(Buffer.from(verifyData))
  );
  proof.signatureValue = message.sign(privateKey);
  data.signature = proof;
  // return data;
  delete data.signature['@context']
  data.signature.type = 'sec:EcdsaKoblitzSignature2016'
  return data
};

module.exports = {
  verify,
  sign
};
