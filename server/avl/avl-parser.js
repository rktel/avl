export function Parser(pdu) {
    if (pdu && (pdu.length == 15 || (pdu[0] === ">" && pdu[pdu.length - 1] === "<"))) {
        TAIP(pdu)
    }
}

function TAIP(pdu) {
    let mobileID = ''
    mobileID = pdu.length == 15 ? pdu : pdu.substring(pdu.indexOf(SYRUS_INIT_MOBILEID) + 3, pdu.indexOf(SYRUS_END_MOBILEID))
    console.log(mobileID.trim());
    
}