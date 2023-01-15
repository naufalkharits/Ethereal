import keccak from "keccak"

export function isAddress(address) {
  if (!/^(0x)?[0-9a-fA-F]{40}$/.test(address)) return false

  return toChecksumAddress(address)
}

function toChecksumAddress(address) {
  address = address.toLowerCase().replace("0x", "")
  var hash = keccak("keccak256").update(address).digest("hex")
  var ret = "0x"

  for (var i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      ret += address[i].toUpperCase()
    } else {
      ret += address[i]
    }
  }

  return ret
}
