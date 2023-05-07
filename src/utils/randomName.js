import crypto from "crypto";

function randomName(bytes) {
  return crypto.randomBytes(bytes).toString("hex");
}

export default randomName;
