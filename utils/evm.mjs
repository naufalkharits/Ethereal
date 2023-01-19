import keccak from "keccak"

export default function isAddress(address) {
  const addresses = address.split(",")

  for (let x = 0; x < addresses.length; x++) {
    const element = addresses[x]
    if (!/^(0x)?[0-9a-fA-F]{40}$/.test(element)) return false
  }

  return toChecksumAddress(addresses)
}

function toChecksumAddress(addresses) {
  const modifiedAddresses = []
  for (let x = 0; x < addresses.length; x++) {
    const element = addresses[x]
    modifiedAddresses.push(element.toLowerCase().replace("0x", ""))
  }

  const hashes = []
  for (let x = 0; x < modifiedAddresses.length; x++) {
    const modifiedAddress = modifiedAddresses[x]
    hashes.push(keccak("keccak256").update(modifiedAddress).digest("hex"))
  }

  let newAddress = ""
  let newAddresses = []

  for (let x = 0; x < modifiedAddresses.length; x++) {
    const modifiedAddress = modifiedAddresses[x]
    newAddress = "0x"
    for (let y = 0; y < modifiedAddress.length; y++) {
      if (parseInt(hashes[y], 16) >= 8) {
        newAddress += modifiedAddress[y].toUpperCase()
      } else {
        newAddress += modifiedAddress[y]
      }
    }
    newAddresses.push(newAddress)
  }

  console.log(newAddresses)
  return newAddresses
}
