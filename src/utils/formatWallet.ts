const formatAddress = (address: string) => {
  const initialLength = 4;
  const finalLength = 4;

  const start = address.substring(0, initialLength + 2);
  const end = address.substring(address.length - finalLength);

  return `${start}...${end}`;
};

export default formatAddress;
