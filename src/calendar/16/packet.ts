export default class Packet {
  public version: number;
  public typeID: number;
  public decimalValue: number | undefined;
  public children: Packet[] = [];

  constructor(bits: string[]) {
    this.version = parseInt(bits.splice(0, 3).join(''), 2);
    this.typeID = parseInt(bits.splice(0, 3).join(''), 2);

    // Packets with type ID 4 represent a literal value. Literal value packets encode a single binary number.
    // Every other type of packet (any packet with a type ID other than 4) represent an operator that performs
    // some calculation on one or more sub-packets contained within.
    if (this.typeID === 4) {
      this.constructValue(bits);
    } else {
      this.constructOperator(bits);
    }
  }

  private constructValue(bits: string[]): void {
    const packetValues: string[] = [];

    let packet = bits.splice(0, 5).join('');
    while (packet.length === 5) {
      packetValues.push(packet.slice(1, 5));
      packet = bits.splice(0, 5).join('');
    }

    this.decimalValue = parseInt(packetValues.join(''), 2);
  }

  private constructOperator(bits: string[]): void {
    const lengthTypeID = Number(bits.splice(0, 1)[0]);

    // If the length type ID is 0, then the next 15 bits are a number that represents
    // the total length in bits of the sub-packets contained by this packet.
    // If the length type ID is 1, then the next 11 bits are a number that represents
    // the number of sub-packets immediately contained by this packet.

    if (lengthTypeID === 0) {
      const subPacketLength: number = parseInt(bits.splice(0, 15).join(''), 2);
      const childPacketBits: string[] = bits.splice(0, subPacketLength);

      // Keep reading 11-bit packets
      for (let i = 0; i < Math.floor(subPacketLength / 22); i++) {
        this.children.push(new Packet(childPacketBits.splice(0, 11)));
      }
      // Create packet with the leftovers
      this.children.push(new Packet(childPacketBits));
    } else if (lengthTypeID === 1) {
    }

    //   // 15-bit field
    //   if (lengthTypeID === 0) {
    //     const subPacketLength = parseInt(bin.splice(0, 15).join(''), 2);
    //     const a = bin.splice(0, 11).join('');
    //     const packet1 = parseInt(a, 2);
    //     const packet2 = parseInt(bin.splice(0, 16).join(''), 2);
    //     console.info('a');
    //     // TODO: this value should be parsed as a new packet...

    //     // 11-bit field
    //   } else {
    //   }
  }
}
