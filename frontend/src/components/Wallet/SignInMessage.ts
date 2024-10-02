// import bs58 from "bs58";
import { base58_to_binary } from "base58-js";
import nacl from "tweetnacl";
type SignMessage = {
    domain: string;
    publicKey: string;
    nonce: string;
    statement: string;
};

export class SigninMessage {
    domain: any;
    publicKey: any;
    nonce: any;
    statement: any;

    constructor({ domain, publicKey, nonce, statement }: SignMessage) {
        this.domain = domain;
        this.publicKey = publicKey;
        this.nonce = nonce;
        this.statement = statement;
    }

    prepare() {
        return `${this.statement}${this.nonce}`;
    }

    async validate(signature: string) {
        const msg = this.prepare();
        const signatureUint8 = base58_to_binary(signature);
        const msgUint8 = new TextEncoder().encode(msg);
        const pubKeyUint8 = base58_to_binary(this.publicKey);

        return nacl.sign.detached.verify(msgUint8, signatureUint8, pubKeyUint8);
    }
}