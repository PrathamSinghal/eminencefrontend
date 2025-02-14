export class Common {
  public static stringconversion(value: any) {
    return value.toString();
  }
  public static hideSomeValue(text: any) {
    const stars = "****";
    const length = text.length;

    if (length > 10) {
      const firstPart = text.substring(0, 4);
      const lastPart = text.substring(length - 4);
      return firstPart + stars + lastPart;
    }
    return text;
  }
}
