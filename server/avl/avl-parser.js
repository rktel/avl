export function Parser(pdu) {
    if (pdu && (pdu.length == 15 || (pdu[0] === ">" && pdu[pdu.length - 1] === "<"))) {
        console.log("IS TAIP")
     }
}