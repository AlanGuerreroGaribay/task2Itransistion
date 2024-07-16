import { randomBytes, createHmac } from "crypto";

export class Encoder {
  message = null;
  constructor(message) {
    this.message = message;
  }

  getHMAC() {
    const secret = randomBytes(32).toString("hex");
    const hash = createHmac("sha3-256", secret)
      .update(this.message)
      .digest("base64");
    return hash;
  }
}
